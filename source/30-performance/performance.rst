Performance Essentials
========================

In this section, we discuss various aspects of performance of data-parallel C++ code, including how we can measure time performance in terms of elapsed "wall clock" time, and how we can achieve and observe a speedup when leveraging data parallelism.

Measuring time performance
--------------------------

We can use the ``chrono`` section of the C++ Standard Library for measuring performance at various points during program execution.

.. code-block:: cpp
  :linenos:
  :lineno-start: 7

   void mark_time(
     ts_vector & timestamps,
     const std::string_view label)
   {
     timestamps.push_back(std::pair(label.data(),
       std::chrono::steady_clock::now()));
   }

Every time we want to add a timestamp, we invoke ``mark_time`` with a suitable string label for each phase whose performance we are measuring:

- memory allocation
- queue creation
- core computation (e.g., integration)
- remainder of execution (e.g., displaying the results)
- total wall clock execution time

At the end, we use the ``print_timestamps`` function to print the collected measurements in comma-separated-values (CSV) format, as shown in the sample runs below.


How to achieve speedup
----------------------

As discussed in the previous chapter, at the core of data parallelism lies the ability to perform many operations on similar data in parallel at the hardware level.
Beyond Amdah's law, there is a tradeoff between the speedup gained through parallelization and the additional overhead of shipping data back and forth between the host computer and the accelerator.
To understand this tradeoff, we are separately measuring the various phases of program execution as shown above.

For the following experiments, we are going to make our integrand (function to be integrated) even more inefficient than before.
In this way, the actual effort becomes significantly greater than the overhead from setup, so we are likely to observe a greater benefit from parallelization.

Concretely, we're going make the integrand `f` 1000 times more inefficient by redoing the (already inefficient) computation as many times:

.. code-block:: cpp
		
   double f(const double x) {
       auto result = 1.0;
       for (auto n = 0; n < 1000; n++) {
	   result *= cos(x) * cos(x) + sin(x) * sin(x);
       }
       return result;
   }

We will now compare wall clock execution times on a node available to us through Intel's Developer Cloud, a cloud-based infrastructure of systems with different types of accelerators.

Sequential execution
^^^^^^^^^^^^^^^^^^^^

We start with strictly sequential execution on the node's CPU using the `-s` option of our integration example.

.. code-block:: text

   u204386@s001-n141:~/Work/unoapi-dpcpp-examples$ ./build/bin/integration -s -n 10000000
   [2023-10-05 13:08:59.649] [info] integrating function from 0 to 1 using 10000000 trapezoid(s), dx = 1e-07
   [2023-10-05 13:08:59.695] [info] starting sequential integration
   [2023-10-05 13:12:33.593] [info] result should be available now
   result = 0.99999999975017
   [2023-10-05 13:12:33.597] [info] all done for now
   TIME,DELTA,UNIT,DEVICE,PHASE
   1387106620763,0,ns,sequential,Start
   1387152751270,46130507,ns,sequential,Memory allocation
   1601050897104,213898145834,ns,sequential,Integration
   1601054456984,3559880,ns,sequential,DONE
   1601054456984,213947836221,ns,sequential,TOTAL
		
The total wall time for this sequential run was about 214 seconds.


Parallel execution on an accelerator
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Next, we allow our integration code to select and utilize the available accelerator.

.. code-block:: text

   u204386@s001-n141:~/Work/unoapi-dpcpp-examples$ ./build/bin/integration -n 10000000
   [2023-10-05 13:07:20.616] [info] integrating function from 0 to 1 using 10000000 trapezoid(s), dx = 1e-07
   [2023-10-05 13:07:20.616] [info] preparing for vectorized integration
   [2023-10-05 13:07:20.670] [info] Device: Intel(R) UHD Graphics P630 [0x3e96]
   [2023-10-05 13:07:21.475] [info] done submitting to queue...waiting for results
   [2023-10-05 13:07:23.805] [info] result should be available now
   result = 1.0000000000000266
   [2023-10-05 13:07:23.806] [info] all done for now
   TIME,DELTA,UNIT,DEVICE,PHASE
   1288073741984,0,ns,Intel(R) UHD Graphics P630 [0x3e96],Start
   1288073757723,15739,ns,Intel(R) UHD Graphics P630 [0x3e96],Memory allocation
   1288127582056,53824333,ns,Intel(R) UHD Graphics P630 [0x3e96],Queue creation
   1291261937903,3134355847,ns,Intel(R) UHD Graphics P630 [0x3e96],Integration
   1291263543190,1605287,ns,Intel(R) UHD Graphics P630 [0x3e96],DONE
   1291263543190,3189801206,ns,Intel(R) UHD Graphics P630 [0x3e96],TOTAL
		
The total wall time for this run was about 3.2 seconds, including the overhead for preparing the task queue and shipping any required data back and forth.
This corresponds to a speedup of about 67 compared to sequential execution.

These measurements lead to various insights on what is going “under the hood” during program execution, to name a few:

- Initial allocation of a SYCL buffer takes very little time compared to allocating a standard vector.
- Queue creation introduces a certain overhead, comparable to allocation a vector on the host CPU.

Parallel execution on a multicore CPU
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Our examples also support a `-c` option for executing data-parallel code on the host CPU itself.
This is reasonable when the CPU already has multiple cores.

.. code-block:: text

   u204386@s001-n141:~/Work/unoapi-dpcpp-examples$ ./build/bin/integration -c -n 10000000
   [2023-10-05 13:06:20.645] [info] integrating function from 0 to 1 using 10000000 trapezoid(s), dx = 1e-07
   [2023-10-05 13:06:20.645] [info] preparing for vectorized integration
   [2023-10-05 13:06:20.754] [info] Device: Intel(R) Xeon(R) E-2176G CPU @ 3.70GHz
   [2023-10-05 13:06:21.009] [info] done submitting to queue...waiting for results
   [2023-10-05 13:06:21.306] [info] result should be available now
   result = 1.0000000000001883
   [2023-10-05 13:06:21.309] [info] all done for now
   TIME,DELTA,UNIT,DEVICE,PHASE
   1228102597488,0,ns,Intel(R) Xeon(R) E-2176G CPU @ 3.70GHz,Start
   1228102606002,8514,ns,Intel(R) Xeon(R) E-2176G CPU @ 3.70GHz,Memory allocation
   1228211703518,109097516,ns,Intel(R) Xeon(R) E-2176G CPU @ 3.70GHz,Queue creation
   1228763275054,551571536,ns,Intel(R) Xeon(R) E-2176G CPU @ 3.70GHz,Integration
   1228766647826,3372772,ns,Intel(R) Xeon(R) E-2176G CPU @ 3.70GHz,DONE
   1228766647826,664050338,ns,Intel(R) Xeon(R) E-2176G CPU @ 3.70GHz,TOTAL

The total wall time for this run was about 0.66 seconds, including the overhead for preparing the task queue on the host CPU.
This corresponds to a speedup of about 320 compared to sequential execution or a speedup of about 5 compared to execution on the GPU, possibly because of the better support for 64-bit floating point arithmetic on the CPU.


Observed scaling
----------------

In this section, we'll share our high-level observations of scaling in terms of the total workload (number of trapezoids) n and the grain size (number of inner, always sequential trapezoids) g, for our three execution modes:

- sequential execution
- parallel execution on a single NVIDIA RTX A6000 GPU
- parallel execution on a dual AMD EPYC 9354 32-Core Processor

Each chart shows a scatter plot with several color-coded series corresponding to total workload.
The x-axis shows grain size, and the y-axis shows wall time in seconds.
Axis ranges and series colors are consistent across charts, thereby allowing a direct comparison of measurements for a given workload and grain size.

.. .. figure:: ../images/walltime-seq.svg

As expected, for sequential execution, wall time is proportional to total workload and independent of grain size.
(We discontinued the experiment for the highest workload only to save some time.)

.. .. figure:: ../images/walltime-gpu.svg

For parallel execution on the GPU, we are achieving a speedup of about 10 (one full order of magnitude).
Otherwise, wall time is still proportional to total workload and mostly independent of grain size; excessive grain size, however, appears to overload GPU cores and can even result in a slowdown relative to sequential execution.
In this and the next chart, the missing data points for smaller grain sizes are caused by the resulting range of the ``parallel_for`` becoming larger than ``INT_MAX``.

.. .. figure:: ../images/walltime-cpu.svg

For parallel execution on the CPU, we are achieving of almost three orders of magnitude relative to sequential execution, and almost two orders of magnitude relative to parallel execution on the GPU.
Otherwise, wall time proportional (slightly sublinear) to total workload and mostly independent of grain size, except for a certain overhead for small grain sizes that put an insufficient load on each processor core.

In addition, our raw performance data are `available in this spreadsheet <https://docs.google.com/spreadsheets/d/1NUD_yqfwgUr9XYucRgMykKDrgUAETmvC4mzOMVDxDZY>`_.


.. TODO chapter conclusion

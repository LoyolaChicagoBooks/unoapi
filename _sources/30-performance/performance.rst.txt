Performance Essentials
========================

.. todo:: Basically, you can reference the notion of scaling. Specifically, in showing the results, vary the problem size, e.g. by 10x or your favorite multiplier but 10x increements usually makes sense. And we want a nice plot.  

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

At the end, we use the ``print_timestamps`` function to print the collected measurements in comma-separated-values (CSV) format.
(For readability, we have replaced the actual device name, “Intel(R) UHD Graphics P630 [0x3e96]”, with “gen9.”)

.. code-block:: text

   TIME,DELTA,UNIT,DEVICE,PHASE
   68719429381281,0,ns,gen9,Start 68719429386913,5632,ns,gen9,Memory allocation
   68719466567445,37180532,ns,gen9,Queue creation
   68719769668012,303100567,ns,gen9,Integration
   68719773241994,3573982,ns,gen9,DONE
   68719773241994,343860713,ns,gen9,TOTAL

These measurements lead to various insights on what is going “under the hood” during program execution, to name a few:

Initial allocation of a SYCL buffer takes very little time compared to allocating an standard vector. Queue creation introduces significant overhead. To achieve an overall speedup in light of this overhead, a high degree of parallelism is required (between about 10 and 20 million trapezoids on an Intel DevCloud gen9 node). Compared to the sequential version, there is an overall speedup even when using SYCL on the host CPU rather than the accelerator.


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

   u204386@s001-n063:~/Work/unoapi-dpcpp-examples$ ./build/bin/integration -s -n 1000000
   [2023-10-03 12:53:18.577] [info] integrating function from 0 to 1 using 1000000 trapezoid(s), dx = 1e-06
   [2023-10-03 12:53:18.584] [info] starting sequential integration
   [2023-10-03 12:53:45.562] [info] result should be available now
   result = 1.000000000007918
   [2023-10-03 12:53:45.562] [info] all done for now
   TIME,DELTA,UNIT,DEVICE,PHASE
   26056679523006414,0,ns,sequential,Start
   26056679528971854,5965440,ns,sequential,Memory allocation
   26056706507242628,26978270774,ns,sequential,Integration
   26056706507743085,500457,ns,sequential,DONE
   26056706507743085,26984736671,ns,sequential,TOTAL

The total wall time for this run was about 27 seconds.


Parallel execution on an accelerator
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Next, we allow our integration code to select and utilize the available accelerator.

.. code-block:: text
	  
   u204386@s001-n063:~/Work/unoapi-dpcpp-examples$ ./build/bin/integration -n 1000000
   [2023-10-03 12:53:05.759] [info] integrating function from 0 to 1 using 1000000 trapezoid(s), dx = 1e-06
   [2023-10-03 12:53:05.759] [info] preparing for vectorized integration
   [2023-10-03 12:53:05.847] [info] Device: Intel(R) Xeon(R) Gold 6128 CPU @ 3.40GHz
   [2023-10-03 12:53:06.168] [info] done submitting to queue...waiting for results
   [2023-10-03 12:53:06.198] [info] result should be available now
   result = 0.9999999999999984
   [2023-10-03 12:53:06.199] [info] all done for now
   TIME,DELTA,UNIT,DEVICE,PHASE
   26056666704838678,0,ns,Intel(R) Xeon(R) Gold 6128 CPU @ 3.40GHz,Start
   26056666704857606,18928,ns,Intel(R) Xeon(R) Gold 6128 CPU @ 3.40GHz,Memory allocation
   26056666792383780,87526174,ns,Intel(R) Xeon(R) Gold 6128 CPU @ 3.40GHz,Queue creation
   26056667143619359,351235579,ns,Intel(R) Xeon(R) Gold 6128 CPU @ 3.40GHz,Integration
   26056667144791438,1172079,ns,Intel(R) Xeon(R) Gold 6128 CPU @ 3.40GHz,DONE
   26056667144791438,439952760,ns,Intel(R) Xeon(R) Gold 6128 CPU @ 3.40GHz,TOTAL

The total wall time for this run was about 0.44 seconds, including the overhead for preparing the task queue and shipping any required data back and forth.
This corresponds to a speedup of about 60 compared to sequential execution.

.. todo:: Figure out which nodes actually have GPUs. This error comes up on most of them: ` No device of requested type 'info::device_type::gpu' available`
	  

Parallel execution on a multicore CPU
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Our examples also support a `-c` option for executing data-parallel code on the host CPU.
This is reasonable when the CPU already has multiple cores.

.. code-block:: text
   
   u204386@s001-n063:~/Work/unoapi-dpcpp-examples$ ./build/bin/integration -c -n 1000000
   [2023-10-03 12:53:13.632] [info] integrating function from 0 to 1 using 1000000 trapezoid(s), dx = 1e-06
   [2023-10-03 12:53:13.632] [info] preparing for vectorized integration
   [2023-10-03 12:53:13.714] [info] Device: Intel(R) Xeon(R) Gold 6128 CPU @ 3.40GHz
   [2023-10-03 12:53:14.019] [info] done submitting to queue...waiting for results
   [2023-10-03 12:53:14.033] [info] result should be available now
   result = 0.9999999999999984
   [2023-10-03 12:53:14.033] [info] all done for now
   TIME,DELTA,UNIT,DEVICE,PHASE
   26056674577074730,0,ns,Intel(R) Xeon(R) Gold 6128 CPU @ 3.40GHz,Start
   26056674577089540,14810,ns,Intel(R) Xeon(R) Gold 6128 CPU @ 3.40GHz,Memory allocation
   26056674659674721,82585181,ns,Intel(R) Xeon(R) Gold 6128 CPU @ 3.40GHz,Queue creation
   26056674977998101,318323380,ns,Intel(R) Xeon(R) Gold 6128 CPU @ 3.40GHz,Integration
   26056674978681734,683633,ns,Intel(R) Xeon(R) Gold 6128 CPU @ 3.40GHz,DONE
   26056674978681734,401607004,ns,Intel(R) Xeon(R) Gold 6128 CPU @ 3.40GHz,TOTAL

.. todo:: chapter conclusion

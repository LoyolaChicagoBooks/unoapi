Data-Parallel C++ with oneAPI/SYCL
===================================

A growing challenge for the HPC community has been `performance portability <https://performanceportability.org>`_ , i.e., the ability to maintain consistent application performance in the context of increasing complexity and heterogeneity of hardware, as well as the additional need to maintain developer productivity and computational precision.
The intersection of performance, portability, and productivity goals (P3) has also been the focus of an annual workshop at the Supercomputing Conference (SC) for several years.

One of the key frameworks to emerge in response to the P3 challenge is oneAPI, which promises to be a single application programming interface (API) that can be used to program all available architectures.
Programming is done using a modern dialect of C/C++, known as Data-Parallel C++ and SYCL, a standard for higher-level abstractions for parallelism and concurrency.
While oneAPI is not the only alternative, the ability to write largely device-independent programs is a promising direction with great potential to exploit parallelism as the world moves toward more “on chip” heterogeneity and clusters thereof.


Running Example: Trapezoidal Integration
----------------------------------------

Sometimes, a program needs to integrate a function (i.e., calculate the area under a curve).
We might be able to use a formula for the integral, but this isn’t always possible.
An easy alternative approach, suitable for numeric integration, is to approximate the curve with straight line segments and calculate an estimate of the area from them.

.. figure:: ../images/trapezoidal.png  
 
Concretely, to find the area under the curve from a to b, we approximate the function by dividing the domain from a to b into g equally sized segments.
Each segment is (b – a) / g long. Let the boundaries of these segments be x0 = a, x1, x2, ... , xg = b.
The polyline approximating the curve will have coordinates (x0, f(x0)), (x1, f(x1)), (x2, f(x2)), ..., (xg, f(xg)).
This allows us to approximate the area under the curve as the sum of g trapezoids.

For the interested reader, you can see the code to produce this figure using Python's remarkable matplotlib package!

.. literalinclude:: ../scripts/plot-trapezoidal.py
   :language: python


Data-Parallel C++ Implementation
--------------------------------

Our `trapezoidal integration exemplar <https://github.com/LoyolaChicagoCode/unoapi-dpcpp-examples/tree/main/integration>`_ example demonstrates various key aspects of data-parallel C++ programming using Intel’s `oneAPI platform <https://www.intel.com/content/www/us/en/developer/tools/oneapi/overview.html>`_, which is based on the `SYCL <https://www.khronos.org/sycl>`_ cross-platform standard for heterogeneous accelerator-based computing.
Although the example is embarrassingly parallel, it nevertheless exhibits various non-trivial challenges that we will discuss in detail.

The exemplar’s sequential version illustrates the underlying fused-loop map-reduce algorithm, which maps each adjacent pair of function values to a trapezoid area and, in the same loop body, reduces (adds) the area to the cumulative result.

.. literalinclude:: ../snippets/snip-UnoAPI-main-sequential-option.tex
  :language: cpp
  :linenos: 
  :lineno-start: 65
  :lines: 3-15

We’ll see shortly how to write the data-parallel version of this algorithm in DPC++.


The Platform: Intel oneAPI/Khronos SYCL
---------------------------------------

The `SYCL standard <https://www.khronos.org/sycl>`_ defines high-level abstractions for parallel computing using modern C++, in an effort by Khronos to influence the ISO C standard to support heterogeneous computing.
`Data-Parallel C++ (DPC++) <https://spec.oneapi.io/versions/1.1-rev-1/elements/dpcpp/source/index.html>`_, a part of Intel’s oneAPI standard, is an implementation of SYCL.
Intel provides remote access to various types of accelerator hardware, including GPUs and FPGAs, through its `DevCloud program <https://www.intel.com/content/www/us/en/developer/tools/Dev\-Cloud/overview.html>`_.


Device Selection and Task Queues
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A typical DPC++ program starts with the selection of one or more accelerator devices based on criteria of varying specificity.
 In our exemplar, the user can choose between running the code on the host CPU and an available accelerator:

.. literalinclude:: ../snippets/snip-UnoAPI-main-parallel-devices.tex
  :language: cpp
  :linenos: 
  :lineno-start: 99
  :lines: 3-9

The interface between the programmer and the chosen device is a *queue*, to which we can later submit *commands* for execution on the device.

.. literalinclude:: ../snippets/snip-UnoAPI-main-parallel-inorder-q.tex
  :language: cpp
  :linenos: 
  :lineno-start: 110
  :lines: 3-9

If we do not explicitly specify a device when creating our queue, the queue will automatically select the most suitable available device on the current hardware.
Also, we can choose between a simple in-order queue, as we have done here, or we can have the queue figure out the best order for executing the submitted commands without deadlocking.


Buffers Shared Between Host and Device
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Data-parallel computing typically involves some form of data sharing between the host and the device.
SYCL allows several choices for this with varying degrees of control where the data should reside and how it is shared between host and device.
E.g., we could allocate a standard vector on the host and use universal shared memory (USM) to share it with the device executing the data-parallel instructions.
This might require copying substantial amounts of data between host and device and thereby impair performance.

Instead, a *buffer* is a higher-level data container that allows SYCL to determine where best to allocate the corresponding memory; a *range* represents a 1, 2, or 3-dimensional index range for a buffer.
By not explicitly backing a buffer by a host-allocated standard vector, the data can remain on the device for faster access during kernel execution—until we may need to access it on the host later.

.. literalinclude:: ../snippets/snip-UnoAPI-main-parallel-buffers.tex
  :language: cpp
  :linenos: 
  :lineno-start: 92
  :lines: 3-4


parallel_for() Construct
^^^^^^^^^^^^^^^^^^^^^^^^

At the heart of SYCL’s support for data parallelism lies the ``parallel_for()`` construct, which allows us to express the instructions that should execute in parallel.
While also providing varying degrees of control over splitting up the workload and assigning it to the accelerator device, SYCL is able to come up with a suitable assignment that maximizes parallelism based on the capabilities of the device.

.. literalinclude:: ../snippets/snip-UnoAPI-main-parallel-submit-parallel-for.tex
  :language: cpp
  :linenos: 
  :lineno-start: 116
  :lines: 3-8

In this example, ``f()`` represents the computation we perform in parallel on each data item.
As shown below, separating ``f`` into its own compilation unit enables us to unit-test it, as well as choose a specific implementation of ``f`` at build time.

To combine the trapezoids' areas into a single result, while allowing SYCL to maximize parallelism, we can use ``parallel_for()`` along with a suitable reduction operation, i.e., ``sycl::plus<>()``.

.. literalinclude:: ../snippets/snip-UnoAPI-main-parallel-submit-reduce.tex
  :language: cpp
  :linenos: 
  :lineno-start: 126
  :lines: 3-15



Separate Compilation and External Functions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Separate compilation of source files helps us decompose a software system into smaller modules.
This has multiple benefits, including separation of concerns, unit testing, easier collaborative development, and the ability to defer certain decisions (e.g., what we’re integrating) until build time.

In our exemplar, we’ll want to unit-test the function to be integrated and defer choosing a specific implementation of that function until build time.
To be able to separately compile the function and call it inside a DPC++ kernel, we declare it in this SYCL-specific way:

.. literalinclude:: ../snippets/snip-UnoAPI-sycl-external-interface.tex
  :language: c
  :linenos: 
  :lineno-start: 6
  :lines: 3-5

To observe a speedup when using ``parallel_for``, we define ``f`` as an intentionally inefficient way to compute the unit value:

.. literalinclude:: ../snippets/snip-UnoAPI-f-implementation.tex
  :language: cpp
  :linenos: 
  :lineno-start: 4
  :lines: 3-5

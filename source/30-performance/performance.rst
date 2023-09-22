Performance
===========

.. todo:: add a proper overview paragraph

We can use the ``chrono`` section of the C++ Standard Library for measuring performance in terms of elapsed wall clock time.

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

Every time we want to add a timestamp, we invoke ``mark_time`` with a suitable string label for the phase whose performance we are measuring.
At the end, we use the ``print_timestamps`` function to print the collected measurements in comma-separated-values (CSV) format.
(For readability, we have replaced the actual device name, “Intel(R) UHD Graphics P630 [0x3e96]”, with “gen9.”)

.. code-block:: text

   TIME,DELTA,UNIT,DEVICE,PHASE
   68719429381281,0,ns,gen9,Start 68719429386913,5632,ns,gen9,Memory
   allocation 68719466567445,37180532,ns,gen9,Queue creation
   68719769668012,303100567,ns,gen9,Integration
   68719773241994,3573982,ns,gen9,DONE
   68719773241994,343860713,ns,gen9,TOTAL

These measurements lead to various insights on what is going “under the hood” during program execution, to name a few:

Initial allocation of a SYCL buffer takes very little time compared to allocating an standard vector. Queue creation introduces significant overhead. To achieve an overall speedup in light of this overhead, a high degree of parallelism is required (between about 10 and 20 million trapezoids on an Intel DevCloud gen9 node). Compared to the sequential version, there is an overall speedup even when using SYCL on the host CPU rather than the accelerator.

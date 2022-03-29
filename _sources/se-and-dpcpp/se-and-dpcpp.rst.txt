SE and DPC++
=========================

CMake
------

- Brings to the world of C/C++ what Java and other modern language developers have been enjoying for years.

- Helps with retargeting code in different environments.

- Support for source-based dependency management using `FetchContent`.

- Support of viewpathed builds out of box. The latter is really important to supercomputing/HPC, especially in shared environments similar to Argonne and other major supercomputing sites.

- Minimal configuration and maximal convention. `add_executable()` and `add_library()` are the stuff of software engineering!

Viewpath build
---------------

.. code-block:: shell
   
   cmake -S . -B build/platform/{Release,Debug}

This concept may seem trivial but is key to living a sane life.


Release vs. Debug
------------------






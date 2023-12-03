About the Book
================

One of the key goals in high-performance and distributed software engineering is to leverage the specific capabilities of the target hardware to the extent possible. Today’s systems are typically heterogeneous, where one or more architectures may be present within a single system, such as conventional CPU cores combined with accelerators such as GPUs and FPGAs. Although parallel computing itself has reached a high level of maturity, as we move toward exascale computing and beyond, challenges similar to those that plagued the earliest days of parallel and distributed computing are beginning to resurface: Leveraging heterogeneity while balancing performance, software portability, and developer productivity (P3).

This tutorial--delivered as a Python Sphinx book that rebuilds on all changes to the text and underlying source code--provides hands-on experience in developing high-performance and embedded software for heterogeneous architectures using Intel’s oneAPI reference implementation of the Khronos SYCL standard in conjunction with state-of-the-art software engineering methods. By raising the abstraction level via its unified application programming interface (API), oneAPI makes it easier to develop portable high-performance software for systems with embedded hardware accelerators, such as GPUs and FPGAs.

Build Status
--------------

.. only:: html

      .. image:: https://github.com/LoyolaChicagoBooks/unoapi/actions/workflows/main.yml/badge.svg
         :target: https://github.com/LoyolaChicagoBooks/unoapi/actions/workflows/main.yml
         :alt: GitHub Pages and Release PDF


      See https://github.com/LoyolaChicagoBooks/unoapi/actions


Distribution
-------------

Web Version
   See https://unoapi.org/

Book Version
   See https://github.com/LoyolaChicagoBooks/unoapi/releases/latest/download/UnoAPI.pdf.

Example Source Code

- `UnoAPI Data-Parallel C++ Examples <https://github.com/LoyolaChicagoCode/unoapi-dpcpp-examples>`__
- `UnoAPI Parallel FORTRAN Examples <https://github.com/LoyolaChicagoCode/unoapi-fortran-examples>`__
- `Modern C++ Examples <https://github.com/LoyolaChicagoCode/modern-cpp-examples>`__

Other Systems Code Examples - C/C++

- `COMP 310 Systems Code Examples in C <https://github.com/SoftwareSystemsLaboratory/systems-code-examples>`__
- `Process Tree in C++ <https://github.com/LoyolaChicagoCode/processtree-cpp>`__

Citation
---------

Cite [completely optional but appreciated]
   Konstantin Läufer and George K. Thiruvathukal, *UnoAPI: Balancing Performance, Portability, and Productivity (P3) in HPC Education*, 2022 IEEE/ACM International Workshop on Education for High Performance Computing (EduHPC), Dallas, TX, USA, 2022, pp. 1-10, doi: 10.1109/EduHPC56719.2022.00006.

IEEE Xplore [if you have IEEE/ACM digital library subscription]
   https://ieeexplore.ieee.org/document/10027537

Figshare [if you cannot access the IEEE/ACM version for *any* reason]
   https://doi.org/10.6084/m9.figshare.21200464.

If you find our work useful, please consider citing the above paper.
If you don't find our work useful, please consider citing the above paper.
Please do not hesitate to contact us with any questions, regardless of whether you find us useful or not.

Motivation for Our Work
-------------------------

This is not all-inclusive.

Tenets:

- Who are the next generation of research software engineers **and** want to consider HPC careers?
- Most graduates drawn to modern web development, data science, and machine learning jobs. All require HPC knowledge, too.
- Most graduates learning about *cool* languages that offer higher-order thinking, e.g. Scala, Go, Rust, and numerous scripting languages. This is a first step toward bringing them back to C++.

In addition:

- HPC itself is still cool with *heterogeneous computing* and "novel architectures* having a renaissance.
- The most modern languages still *punt to C* to provide acceleration; C++ raises the level of abstraction without compromising performance.
- Research software engineers want to balance performance, portability, and productivity.


Contributors
--------------

.. note:: We welcome folks who wish to contribute. Please reach out to either George or Konstantin. We will be happy to add a placeholder chapter for you. We have not yet established contribution guidelines but plan to do so soon as we have been approached by others. You can start by forking our repository and working from pull requests. Once we accept a pull request, we include you as an additional contributor.

- `George K. Thiruvathukal (project lead) <https://gkt.sh>`__
- `Konstantin Läufer <https://laufer.cs.luc.edu>`__

AI Disclosure
---------------

.. note:: This text contains a mix of original writing and programming with strategic use of Chat-GPT4 via intelligent/clever prompting. All examples will be available in our repository with an appropriate **cmake** build file and tests. We will also make our prompts and analysis available, similar to what we have done for our recent ongoing study of Chat-GPT4 and Systems Programming. See https://doi.org/10.6084/m9.figshare.22257274.


Acknowledgements
-----------------

Thanks to Intel Corporation for their support of our work (George Silva, Omar Toral, Ben Odom).

Topics
-----------

These are the planned chapters:

- Parallel Programming Principles
- Development Environment [minimum friction approaches]
- Software Engineering
- Modern C++ as a Better C/C++
- Data Parallel C++
- Multicore Programming
- Working with Devices
- Going Distributed
- Performance Evalution

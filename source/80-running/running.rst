Compiling and Running oneAPI programs
=======================================

Our examples are CMake-based \CPP projects along with unit tests in source form.
They are publicly available as a GitHub repository under the Apache 2.0 open-source license at `github.com/LoyolaChicagoCode/unoapi-dpcpp-examples <https://github.com/LoyolaChicagoCode/unoapi-dpcpp-examples>`__.

The examples include a README file with instructions for building and running on Debian-based Linux systems (including Ubuntu), as well as the scripts needed to run the experiments described in this paper.

The full documentation of the LLVM-based oneAPI DPC++ compilation toolchain is available at `intel.github.io/llvm-docs <https://intel.github.io/llvm-docs>`_.


Running the examples on GitHub as a fork of the original repo (browser-based)
-----------------------------------------------------------------------------

The repository is configured with continuous integration (CI) using the following GitHub Actions workflow:

.. literalinclude:: ../../examples/unoapi-dpcpp-examples/.github/workflows/oneapi-cmake.yml
  :language: bash
  :start-after: UnoAPI:github-workflow-specific:begin
  :end-before: UnoAPI:github-workflow-specific:end  
  :dedent:

It relies on this prerequisite installation script, which one can also invoke manually on a local workstation:

.. literalinclude:: ../../examples/unoapi-dpcpp-examples/install-dpcpp.sh
  :language: bash

Every commit or pull request to the repository triggers a build and results in an indication of successful or unsuccessful completion of the build, including execution of the unit test suite.
This option is subject to limitations in devices available through the actual CI container (i.e., not usually accelerators).

These are the steps to copy, build, and run the artifact in a web browser without involving a local build environment.

-   Visit `github.com/LoyolaChicagoCode/unoapi-dpcpp-examples <https://github.com/LoyolaChicagoCode/unoapi-dpcpp-examples>`__.
-   Near the top right corner, look for the Fork button, click on the dropdown, and select “Create a new fork.” 
-   Create the new fork in your GitHub account or organization.
-   Visit the Actions tab, where you will see the message “Workflows aren’t being run on this forked repository.”
-   Click on the green button labeled “I understand my workflows, go ahead and enable them.”
-   Use the web interface to create a file, say “dummy.txt”, to trigger a workflow run. This will create an entry under the GitHub actions tab for this workflow run. To observe execution in real time or after completion, one can drill into this entry until the step-by-step execution log appears.

    
Running the examples locally
----------------------------

This option requires a physical or virtual Debian-based system on Intel hardware, which may include an accelerator, such as a GPU.
The specific steps are documented in the top-level README file in the GitHub repository.
The artifact’s main executable is self-documenting using the ``-h`` or ``–help`` CLI option.

The Intel oneAPI DPC++ toolchain is currently supported on Linux and Windows (64-bit).
It is possible to develop DPC++ applications on Intel-based MacOS computers by doing so within a Linux virtual machine.


Running the examples on the Intel DevCloud
------------------------------------------

This option requires a (free) account on Intel’s DevCloud for working with oneAPI and provides access to various types of accelerators, such as GPUs based on the gen9 architecture we’ve used for the sample runs shown above; it thereby provides a highe degree of reproducibility.
Once access to DevCloud has been established, the specific steps are documented in the top-level README file in the GitHub repository.

Concretely, on a DevCloud compute node, one can use OpenCL's ``clinfo`` command to discover the available accelerators:

.. code-block:: text

  u204386@s001-n140:~$ clinfo -l
  Platform #0: Intel(R) OpenCL
  `-- Device #0: Intel(R) Xeon(R) E-2176G CPU @ 3.70GHz
  Platform #1: Intel(R) OpenCL HD Graphics
  `-- Device #0: Intel(R) UHD Graphics P630 [0x3e96]


Better yet, after running the oneAPI setvars.sh script, one can use SYCL's ``sycl-ls`` command to do the same thing:

.. code-block:: text

  u204386@s001-n140:~/Work/unoapi-dpcpp-examples$ sycl-ls
  [opencl:cpu:0] Intel(R) OpenCL, Intel(R) Xeon(R) E-2176G CPU @ 3.70GHz 3.0 [2023.16.7.0.21_160000]
  [opencl:gpu:1] Intel(R) OpenCL HD Graphics, Intel(R) UHD Graphics P630 [0x3e96] 3.0 [22.28.23726.1]
  [ext_oneapi_level_zero:gpu:0] Intel(R) Level-Zero, Intel(R) UHD Graphics P630 [0x3e96] 1.3 [1.3.23726]

At the time of this writing, DevCloud provides well over 200 compute nodes with various types of accelerators, including field-programmable gate arrays (FPGAs).
Some accelerators, however, don't support certain types of data, e.g., 64-bit floating point numbers.

Running on Polaris Supercomputer
----------------------------------

"Polaris is a supercomputer developed in collaboration with Hewlett Packard Enterprise (HPE), Polaris is a leading-edge system that will give scientists and application developers a platform to test and optimize codes for Aurora, Argonne's upcoming Intel-HPE exascale supercomputer."

.. note:: The above description is verbatim from the `Polaris <https://www.alcf.anl.gov/polaris/>`__ web page at Argonne National Laboratory and is intended to provide basic background about this computer. You are encouraged to consult the Polaris documentation for additional details. These are preliminary notes and have not been through-drafted or edited.

The Polaris system makes use of the **modules** system to support additional packages that are not readily available in the default package manager.
Modules are provided for many things that are of a fast-changing nature and often need to be built from source.
At the time of writing, the open source compilers for SYCL (and based on LLVM) are compiled from source on Polaris and distributed as module.

In addition, many of the things we require for this book (e.g. ``cmake`` support) are also distributed as modules.

To install the needed modules, do the following:

.. code-block:: text

   module use /soft/modulefiles
   module load oneapi/upstream
   module load nvhpc-mixed
   module load craype-accel-nvidia80
   module unload nvhpc-mixed
   module load spack-pe-base cmake

If you are planning to use MPI and SYCL together (we do not in this book yet) then you need to install the following additional modules and set an environment variable to enable GPGPU support within MPI.
If you don't need MPI, the following is not needed (i.e. is optional).

.. code-block:: text

   module load mpiwrappers/cray-mpich-oneapi-upstream
   export MPICH_GPU_SUPPORT_ENABLED=1


In addition, you will need to set the following variables to allow for building our examples using the NVIDIA support on Polaris (via the above modules):

.. code-block:: text

   EXTRA_FLAGS="-sycl-std=2020 -O3 -fsycl -fsycl-targets=nvptx64-nvidia-cuda -Xsycl-target-backend --cuda-gpu-arch=sm_80"
   export CFLAGS="-ffp-model=precise"
   export CXXFLAGS="-ffp-model=precise -fsycl $EXTRA_FLAGS"
   export CC=clang
   export CXX=clang++

Once you do this, you can build our exaxmples using our ``cmake`` based build process.

Then it is a matter of using PBS to schedule your job for execution.  Here is an example of how to schedule a one node job on the debug queue.

.. code-block:: text

   qsub -q debug -A YourAllocationHere -l select=1:system=polaris -l walltime=00:59:00 -l filesystems=home -I

The following explains the ``qsub`` command shown here. For additional details, you will need to read the Polaris documentation.

- ``-q debug`` selects the debug queue (one GPGPU node only)
- ``-A YourAllocationHere`` is required, meaning you must have an allocation via an approved project in ALCF. You cannot run jobs without one.
- ``-l select=1:system=polaris`` is used to specify the selection of nodes (one node on Polaris)
- ``-l walltime=00:59:00`` is the amount of time you wish to request
- ``-l filesystems=home`` is to make your home directory available on each node allocated
- ``-I`` interactive execution (opens a shell once you get a node; plan to wait a while!)


.. note:: We will be providing a job script shortly. We still testing. I also plan to make a video as working with production clusters like Polaris is always tricky when it comes to these rapidly-evolving platforms with so many moving parts.



Running on cloud-based virtual machines
---------------------------------------

We can actually run data-parallel code on an Intel-based virtual machine, e.g., Microsoft Azure; in some cases, installing the OpenCL headers might be required in addition to the DPC++ compiler toolchain:

.. code-block:: text

  sudo apt install opencl-clhpp-headers

After running the oneAPI setvars.sh script, ``sycl-ls`` reports the available accelerators.

.. code-block:: text

  comp141@ML-RefVm-775968:~/Work/unoapi-dpcpp-examples$ sycl-ls
  [opencl:acc:0] Intel(R) FPGA Emulation Platform for OpenCL(TM), Intel(R) FPGA Emulation Device 1.2 [2023.16.7.0.21_160000]
  [opencl:cpu:1] Intel(R) OpenCL, Intel(R) Xeon(R) Platinum 8171M CPU @ 2.60GHz 3.0 [2023.16.7.0.21_160000]


On Gitpod, the installation and compilation steps work as intended, and sequential execution is supported.
this environment doesn't support the execution of data-parallel code, not even using the CPU itself as an accelerator, possibly because of kernel configuration settings.

.. code-block:: text

  Machine:
    Type: Docker Mobo: Google model: Google Compute Engine serial: <superuser required> BIOS: Google v: Google date: 08/04/2023
    CPU:
      Info: 8-core model: AMD EPYC 7B13 bits: 64 type: MT MCP cache: L2: 4 MiB

Accordingly, ``sycl-ls`` doesn't return anything.


.. _running_on_nvidia:

Running on hardware with NVIDIA GPUs
------------------------------------

The oneAPI plugin for NVIDIA GPUs is currently in beta testing.
Detailed instructions are `available from Codeplay <https://developer.codeplay.com/products/oneapi/nvidia/2023.2.1/guides/get-started-guide-nvidia>`_.

In particular, the plugin uses the LLVM-based oneAPI DPC++ toolchain. 
To build our example in a separate build directory targeting the NVIDIA GPU, which is not binary-compatible with the default one targeting the host CPU, we can perform the following steps:

.. code-block:: text

  $ . ./setvars.sh
  $ CXXFLAGS="$CXXFLAGS -fsycl-targets=nvptx64-nvidia-cuda" cmake -DCMAKE_BUILD_TYPE=Release -S . -B build-nvidia
  $ CXXFLAGS="$CXXFLAGS -fsycl-targets=nvptx64-nvidia-cuda" cmake --build build-nvidia
  $ ONEAPI_DEVICE_SELECTOR=cuda:\* ./build-nvidia/bin/integration -n 10000000 -w 1000
  [2023-10-08 01:48:10.176] [info] integrating function from 0 to 1 using 10000000 trapezoid(s), dx = 1e-07
  [2023-10-08 01:48:10.176] [info] preparing for vectorized integration
  [2023-10-08 01:48:10.696] [info] Device: NVIDIA RTX A6000
  [2023-10-08 01:48:10.697] [info] done submitting to queue...waiting for results
  [2023-10-08 01:48:15.505] [info] result should be available now
  result = 1.0000000000000013
  [2023-10-08 01:48:15.506] [info] all done for now

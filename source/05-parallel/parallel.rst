
   single: Parallel Computing; Introduction
   single: Parallel Programming; Concepts
   single: Performance Evaluation; Parallel Computing
   single: Computing Systems; History
   single: Programming Techniques; Parallel


Introduction to Parallel Programming
======================================

We introduce parallel computing.
We begin with a discussion of parallel computing history, including a discussion of computing systems and programming techniques.  We then cover key parallel programming concepts, specifically how to categorize parallel computing approaches and evaluate performance.
Knowing this foundational material remains of timeless importance when it comes to achieving desired results.

.. index::
   single: Parallel Computing; History
   single: Atanasoff-Berry Computer (ABC)
   single: Colossus
   single: ENIAC
   single: ILLIAC I
   single: ILLIAC II
   single: ILLIAC III
   single: ILLIAC IV
   single: Convex C1
   single: Cray X-MP
   single: Thinking Machines CM-5
   single: IBM SP
   single: On-chip Parallelism


Notable Early Parallel Computing Systems
--------------------------------------------

The history of parallel computing systems dates nearly to the beginning of modern electronic computing history itself, which featured notable systems such as `Atanasoff-Berry Computer (ABC) <https://www.britannica.com/technology/Atanasoff-Berry-Computer>`__ (1939), `Colossus <https://www.britannica.com/technology/Colossus-computer>`__ (1943), and `ENIAC https://www.britannica.com/technology/ENIAC <https://www.britannica.com/technology/ENIAC>`__ (1945).

Here is a timeline of key developments in parallel computing, focusing on computers designed for parallel and scientific computing, with an emphasis on on-chip parallelism.

- In 1945, ENIAC, the first general-purpose electronic computer, laid the foundation for computing capabilities, though not specifically designed for parallelism. ILLIAC I (1952) and ILLIAC II (1957) were early examples of computers tailored for scientific and engineering calculations, with ILLIAC II introducing parallel computing capabilities.
- In 1962, ILLIAC III emerged as a highly parallel computer, accommodating up to 256 processors for large-scale parallel computations. ILLIAC IV (1966) continued the trend with a highly parallel supercomputer featuring 64 independent processing nodes.
- Convex C1 (1985) marked the advent of the first commercial parallel computer, utilizing custom-designed parallel processing architecture for scientific and engineering applications.
- Cray X-MP (1985) employed vector processing and parallelism to achieve remarkable performance.
- In 1991, the Thinking Machines CM-5 supercomputer utilized vector processors and a custom interconnect network to deliver high performance across diverse scientific and engineering applications.
- The IBM SP (1993) featured a distributed-memory architecture and high-speed interconnect network for impressive scientific computing performance. Beyond 1993, parallel computing became more ubiquitous, evolving into a commodity. Clusters, accelerators, and other specialized parallel hardware emerged, which we cover separately in the subsequent section.

.. index::
   single: Cluster Computing
   single: High-performance Computing (HPC)
   single: Top 500 List; Supercomputers
   single: CDC 6600
   single: Beowulf Project
   single: Networking Technologies; Cluster Computing


Cluster Computing
^^^^^^^^^^^^^^^^^^

Cluster computing, also known as high-performance computing (HPC), has its origins in the early days of computing when it became clear that solving complex computational problems required more processing power than a single machine could provide.
The concept of connecting multiple computers together to work in parallel emerged as a solution and is the basis for modern supercomputers such as those found on the `Top 500 List <https://www.top500.org/>`__.

- In the 1960s and 1970s, research institutions and government agencies began experimenting with cluster-like architectures, such as the Control Data Corporation's CDC 6600 system, which employed multiple processors to tackle scientific calculations.
- In the 1990s, cluster computing gained widespread recognition with the advent of inexpensive, commodity hardware, and the development of networking technologies that allowed computers to communicate efficiently.
- The Beowulf project, initiated by NASA in the mid-1990s, played a crucial role in popularizing cluster computing by demonstrating that a cluster of interconnected off-the-shelf computers could deliver impressive computing power at a fraction of the cost of traditional supercomputers.

Since then, cluster computing has evolved significantly, becoming a dominant paradigm for high-performance computing, enabling breakthroughs in fields such as weather modeling, drug discovery, and data analysis.


.. index::
   single: Cluster Computing
   single: High-performance Computing (HPC)
   single: Top 500 List; Supercomputers
   single: CDC 6600
   single: Beowulf Project
   single: Networking Technologies; Cluster Computing


Accelerators
^^^^^^^^^^^^^

Accelerators and co-processors play a crucial role in enhancing the computational capabilities of central processing units (CPUs). These specialized hardware components are designed to offload specific tasks or types of computations from the CPU, thereby accelerating the overall performance of a system. By leveraging parallel processing techniques and tailored architectures, accelerators such as graphics processing units (GPUs), field-programmable gate arrays (FPGAs), and application-specific integrated circuits (ASICs) excel at performing repetitive and data-intensive operations.

GPUs, originally developed for rendering graphics, have found widespread use in areas such as scientific simulations, machine learning, and cryptocurrency mining. FPGAs offer reconfigurability and low power consumption, making them suitable for prototyping and custom logic implementation. ASICs, on the other hand, are highly optimized for specific applications and deliver exceptional performance and efficiency. Incorporating accelerators and co-processors alongside CPUs enables a heterogeneous computing environment, allowing for more efficient and specialized processing tailored to the demands of modern workloads.

Among the most common accelerators are the following:

1. Graphics Processing Units (GPUs): Originally designed for rendering graphics, GPUs have become immensely popular for their parallel computing capabilities. They excel in tasks such as scientific computing, deep learning, data analytics, and image processing.

2. Tensor Processing Units (TPUs): Developed by Google, TPUs are specialized hardware accelerators designed specifically for machine learning workloads. They offer high-speed matrix operations and optimized support for neural networks, making them ideal for AI-related tasks.

3. Field-Programmable Gate Arrays (FPGAs): FPGAs provide customizable hardware acceleration, allowing users to design and implement custom logic circuits to accelerate specific workloads. They are used in various domains, including high-frequency trading, network processing, and real-time data analysis.

4. Application-Specific Integrated Circuits (ASICs): ASICs are custom-built chips tailored for specific applications. They deliver exceptional performance and power efficiency by optimizing hardware for a particular task. Examples include Bitmain's ASICs for cryptocurrency mining and Google's custom ASICs for artificial intelligence.

5. Intel Xeon Phi: The Intel Xeon Phi, based on the Many Integrated Core (MIC) architecture, is designed for highly parallel workloads. It provides a large number of cores and high memory bandwidth, making it suitable for scientific simulations, molecular dynamics, and other computationally intensive tasks.

6. Dataflow Processing Units (DPUs): DPUs are emerging accelerators focused on accelerating data-intensive workloads such as networking, security, and storage. They offload tasks related to packet processing, encryption, and compression, improving overall system performance and efficiency.

It's worth noting that the field of accelerators is rapidly evolving, and new innovations and technologies continue to emerge, catering to specific application domains and computing needs.

The first historical examples of accelerators can be traced back to the early days of computing when specialized hardware components were developed to enhance the performance of computer systems. Here are a few notable examples:

1. Floating-Point Units (FPUs): In the 1970s, separate floating-point units were introduced as co-processors to CPUs. These dedicated units were designed to handle floating-point arithmetic operations more efficiently, improving the computational capabilities of the system. They played a significant role in scientific and engineering applications that required extensive floating-point calculations.

2. Math Co-processors: In the 1980s, math co-processors emerged as additional chips that could be added to the CPU to offload mathematical computations. Intel's 8087 math co-processor, for example, provided hardware acceleration for floating-point arithmetic, enabling faster and more precise mathematical calculations on compatible systems.

3. Graphics Co-processors: The development of graphics co-processors in the 1980s marked a milestone in accelerating graphical computations. Companies like IBM and Texas Instruments introduced graphics co-processors that worked alongside CPUs to offload the processing required for displaying graphics, resulting in smoother and faster graphical user interfaces.

4. Sound Blaster Cards: Sound Blaster cards, introduced by Creative Labs in the late 1980s and early 1990s, acted as accelerators for audio processing in personal computers. They provided dedicated hardware for sound synthesis, audio playback, and enhanced sound effects, freeing up the CPU from intensive audio processing tasks.

These early accelerators paved the way for the development of more specialized and powerful hardware accelerators that emerged later, such as GPUs, FPGAs, and ASICs, to address the growing demands of specific computational tasks and domains.

.. index::
   single: Vector Processing
   single: Cray Supercomputers
   single: Seymour Cray
   single: Cray-1
   single: Cray X-MP
   single: Cray Y-MP


Vector machines (Cray)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Cray, a renowned supercomputer company founded by Seymour Cray, played a pivotal role in advancing the field of vector processing. Vector processing is a technique that allows a single instruction to operate on multiple data elements simultaneously, enabling efficient execution of computationally intensive tasks. Cray supercomputers, starting with the Cray-1 in the 1970s, were among the first to incorporate vector processing architecture. By leveraging specialized vector registers and instructions, Cray systems achieved remarkable performance gains in scientific simulations, weather forecasting, and other applications that required large-scale numerical computations. The Cray-1, with its distinctive "C" shape design and liquid cooling system, became an iconic symbol of supercomputing prowess. Subsequent generations of Cray systems, including the Cray-2, Cray X-MP, and Cray Y-MP, continued to refine and enhance vector processing capabilities, pushing the boundaries of computational performance. Even though modern supercomputers have evolved beyond pure vector processing, Cray's contributions to this field were instrumental in establishing the foundation for high-performance computing and shaping the development of future supercomputer architectures.

.. index::
   single: Connection Machine
   single: Thinking Machines Corporation
   single: Parallel Processing; Connection Machine
   single: Massively Parallel Processing
   single: Nodes; Connection Machine
   single: Artificial Intelligence; Connection Machine
   single: Pattern Recognition; Connection Machine
   single: Scientific Simulations; Connection Machine


Connection Machine (Thinking Machines)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Connection Machine, developed by Danny Hillis and his team at Thinking Machines Corporation in the 1980s, was a highly influential supercomputer known for its parallel processing capabilities. The name "Connection Machine" derived from its unique architectural design, inspired by the concept of massively parallel processing. Instead of relying on a small number of powerful processors, the Connection Machine employed a large number of simpler processors called "nodes" that communicated and coordinated their activities through a high-speed network. Each node had its own local memory, and computations were performed in parallel across multiple nodes, enabling the machine to tackle complex problems through distributed processing. The Connection Machine gained attention for its ability to handle massive amounts of data and execute tasks in parallel, making it suitable for applications like artificial intelligence, pattern recognition, and scientific simulations. This innovative approach to parallel computing made the Connection Machine a groundbreaking contribution to the field of supercomputing.

.. index::
   single: Systolic Array Architectures
   single: Parallel Computing; Systolic Arrays
   single: SIMD (Single Instruction, Multiple Data)
   single: MIMD (Multiple Instruction, Multiple Data)
   single: TPUs; Systolic Arrays
   single: FPGAs; Systolic Arrays


Systolic architectures
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Systolic array architectures are a type of parallel computing design inspired by the human heart's rhythmic pumping action. In systolic arrays, data flows through a network of specialized processing elements arranged in a regular grid-like pattern. Each processing element performs a simple computation and passes the results to its neighboring elements. This design facilitates the efficient execution of iterative computations and allows for a high degree of parallelism. However, despite their promising potential, systolic array architectures did not experience widespread adoption. Several factors contributed to this. Firstly, systolic arrays require highly regular data access patterns, making them less suitable for irregular or unpredictable computations. Secondly, the complexity of designing and programming systolic arrays posed significant challenges for developers. Lastly, the advent of other parallel computing architectures, such as SIMD (Single Instruction, Multiple Data) and MIMD (Multiple Instruction, Multiple Data), provided more flexibility and better suited the diverse range of applications. However, it's worth noting that the spirit of systolic arrays lives on in various forms. Modern incarnations include specialized hardware accelerators, such as TPUs and FPGAs, which employ array-like structures and dataflow architectures to achieve high-performance computing for specific workloads. Additionally, some parallel programming frameworks and languages incorporate systolic-like concepts to optimize data movement and parallel execution in distributed systems.

.. index::
   single: Systolic Array Architectures
   single: Parallel Computing; Systolic Arrays
   single: SIMD (Single Instruction, Multiple Data)
   single: MIMD (Multiple Instruction, Multiple Data)
   single: TPUs; Systolic Arrays
   single: FPGAs; Systolic Arrays


Loop parallelism in FORTRAN
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Loop parallelism techniques, including the use of compiler directives like OpenMP, began to appear in the late 1990s and early 2000s. OpenMP, for example, was first introduced in 1997 as an application programming interface (API) specification for shared-memory parallel programming. The initial versions of OpenMP were primarily targeted at Fortran and C/C++ languages. Over the years, OpenMP has evolved and gained wider adoption, becoming a popular choice for parallel programming in scientific and high-performance computing domains. However, it's important to note that specific implementations and support for loop parallelism may have varied among different compilers and versions during that time.

In early versions of Fortran, loop parallelism was typically achieved through manual techniques and compiler directives. Here's an example that demonstrates the computation of the area under a curve and the vector dot product using loop parallelism in Fortran:


.. note:: These examples can be found in the `LoyolaChicagoCode/unoapi-fortran-exmaples <https://github.com/LoyolaChicagoCode/unoapi-fortran-exmaples>`__ repository. These examples exist to show the relative merts of using OpenMPI/SYCL vs. lower level methods. This book is not about FORTRAN; however, this history will help to understand the sigificance of  modern C++ efforts.`


.. literalinclude:: ../../examples/unoapi-fortran-examples/aoc.f90
   :language: fortran


This is another example of how to compute the vector dot product in F90.

.. literalinclude:: ../../examples/unoapi-fortran-examples/vdp.f90
   :language: fortran


Similar to our C++ code, you can create a ``CMakeLists.txt1`` for building FORTRAN programs:


.. literalinclude:: ../../examples/unoapi-fortran-examples/CMakeLists.txt
   :language: cmake


C* and Data-Parallel C efforts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note:: We're still working on this section.

- Language Spec: http://people.csail.mit.edu/bradley/cm5docs/CStarProgrammingGuide.pdf

- Data-Parallel on MIMD Computers: P. J. Hatcher, M. J. Quinn, A. J. Lapadula, B. K. Seevers, R. J. Anderson and R. R. Jones, "Data-parallel programming on MIMD computers," in IEEE Transactions on Parallel and Distributed Systems, vol. 2, no. 3, pp. 377-383, July 1991, doi: 10.1109/71.86112, https://ieeexplore.ieee.org/document/86112

.. _cuda:

.. index::
   single: CUDA
   single: parallel computing; CUDA
   single: GPU acceleration; CUDA
   single: performance improvement; CUDA
   single: scientific simulations; CUDA
   single: data analysis; CUDA
   single: machine learning; CUDA
   single: NVIDIA; CUDA

CUDA
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

CUDA (Compute Unified Device Architecture) is a parallel computing platform and programming model developed by NVIDIA. It allows developers to harness the power of NVIDIA GPUs (Graphics Processing Units) to accelerate computationally intensive tasks. By utilizing CUDA, developers can write code that offloads parallel computations to the GPU, enabling significant speedups and performance improvements in a wide range of applications, such as scientific simulations, data analysis, machine learning, and more.

.. index::
   single: market share; NVIDIA GPUs
   single: performance acceleration; CUDA
   single: parallel architecture; GPUs
   single: developer-friendly; CUDA
   single: programming model; CUDA
   single: tools and libraries; CUDA
   single: documentation; CUDA
   single: application domains; CUDA
   single: industry adoption; CUDA
   single: research; CUDA
   single: GPU hardware; NVIDIA

CUDA became popular due to several key factors. First, NVIDIA GPUs had already gained a significant market share in graphics rendering, providing a large user base to leverage for parallel computing. Second, CUDA offered substantial performance acceleration by harnessing the massive parallel architecture of GPUs, allowing developers to offload computationally intensive tasks and achieve significant speedups. Third, CUDA provided a developer-friendly programming model, extending the C language with directives and APIs that made it easier to express parallelism and utilize GPU resources. Fourth, NVIDIA's support ecosystem was comprehensive, offering tools, libraries, and documentation to aid CUDA development. The diverse range of application domains, including scientific simulations, data analytics, machine learning, and image processing, further contributed to CUDA's popularity. Lastly, the availability of NVIDIA's powerful GPU hardware across various price points enabled wider accessibility and adoption of CUDA in different industries and research fields.

Here's the CUDA code example for computing the vector dot product in reStructuredText format:

.. code-block:: cuda

   #include <stdio.h>

   #define SIZE 10000

   // CUDA kernel for dot product computation
   __global__ void dotProduct(float* vector1, float* vector2, float* result, int size) {
       int tid = blockIdx.x * blockDim.x + threadIdx.x;
       if (tid < size) {
           result[tid] = vector1[tid] * vector2[tid];
       }
   }

   int main() {
       float vector1[SIZE];
       float vector2[SIZE];
       float result[SIZE];

       // Initialize the vectors (example values)
       for (int i = 0; i < SIZE; i++) {
           vector1[i] = 1.0;
           vector2[i] = 2.0;
       }

       float* d_vector1;
       float* d_vector2;
       float* d_result;

       // Allocate device memory
       cudaMalloc((void**)&d_vector1, SIZE * sizeof(float));
       cudaMalloc((void**)&d_vector2, SIZE * sizeof(float));
       cudaMalloc((void**)&d_result, SIZE * sizeof(float));

       // Copy input vectors from host to device
       cudaMemcpy(d_vector1, vector1, SIZE * sizeof(float), cudaMemcpyHostToDevice);
       cudaMemcpy(d_vector2, vector2, SIZE * sizeof(float), cudaMemcpyHostToDevice);

       // Launch the dot product kernel
       int blockSize = 256;
       int gridSize = (SIZE + blockSize - 1) / blockSize;
       dotProduct<<<gridSize, blockSize>>>(d_vector1, d_vector2, d_result, SIZE);

       // Copy result from device to host
       cudaMemcpy(result, d_result, SIZE * sizeof(float), cudaMemcpyDeviceToHost);

       // Compute the dot product result on the host
       float dotProductResult = 0.0;
       for (int i = 0; i < SIZE; i++) {
           dotProductResult += result[i];
       }

       printf("The dot product is: %f\n", dotProductResult);

       // Free device memory
       cudaFree(d_vector1);
       cudaFree(d_vector2);
       cudaFree(d_result);

       return 0;
   }


.. index::
    single: CUDA; example; dot product
    single: GPU parallelism; CUDA
    single: memory; device; CUDA
    single: memory; host; CUDA
    single: cudaMalloc
    single: cudaMemcpy
    single: kernel; CUDA
    single: parallel processing; GPU
    single: performance; CUDA

The above CUDA example demonstrates the computation of the dot product of two vectors using GPU parallelism. The code begins by initializing the input vectors with example values on the host. Then, device memory is allocated using ``cudaMalloc``, and the input vectors are copied from the host to the device memory using ``cudaMemcpy``. The dot product computation is performed by launching a CUDA kernel, ``dotProduct``, which runs in parallel on the GPU. Each thread calculates the product of corresponding elements from the input vectors. After the kernel execution, the results are copied back to the host memory using ``cudaMemcpy``, and the dot product is computed on the host. Finally, the dot product result is printed to the console. The example showcases how CUDA leverages the parallel processing capabilities of GPUs to accelerate computations, leading to improved performance compared to traditional CPU-based implementations.

OpenMP
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

OpenMP (Open Multi-Processing) is a portable API (Application Programming Interface) for shared-memory parallel programming in C, C++, and Fortran. It was developed in the late 1990s by various hardware and software vendors, aiming to create a standardized and user-friendly programming model for shared-memory parallelism. The initial release, OpenMP 1.0, came out in 1997, offering basic parallelism constructs. Subsequent versions, including OpenMP 2.0 (1998) and OpenMP 3.0 (2008), introduced additional features such as task parallelism and nested parallelism. OpenMP gained widespread adoption in high-performance computing due to its simplicity, portability, and compatibility with existing codebases. OpenMP 5.0, released in 2018, brought advanced features like improved accelerator offloading, enhanced tasking capabilities, and SIMD programming support. It remains actively developed and maintained by a consortium of vendors, researchers, and users. OpenMP enables developers to leverage multi-core processors and parallel architectures for enhanced performance and scalability in their applications.

C, C++, and Fortran, are the primary languages directly supported by OpenMP. OpenMP offers language extensions, compiler directives, and runtime libraries specific to each language to facilitate parallel programming and exploit shared-memory parallelism:

1. C: OpenMP directives and runtime library routines can be used directly within C programs to express parallelism and control the execution of parallel regions.

2. C++: OpenMP can be utilized within C++ programs, providing directives and library routines to enable shared-memory parallel programming.

3. Fortran: OpenMP is natively supported in Fortran, allowing Fortran programmers to express parallelism through directives and runtime routines for efficient parallel execution.

Here is an example of an OpenMP program that computes the dot product of two vectors.

.. code-block:: c

   #include <stdio.h>
   #include <stdlib.h>
   #include <omp.h>

   #define SIZE 10000

   int main() {
      float vector1[SIZE];
      float vector2[SIZE];
      float dotProduct = 0.0;
      int i;

      // Initialize the vectors with random numbers
      #pragma omp parallel for
      for (i = 0; i < SIZE; i++) {
         vector1[i] = (float)rand() / RAND_MAX;
         vector2[i] = (float)rand() / RAND_MAX;
      }

      // Compute the dot product using OpenMP parallelism
      #pragma omp parallel for reduction(+:dotProduct)
      for (i = 0; i < SIZE; i++) {
         dotProduct += vector1[i] * vector2[i];
      }

      printf("The dot product is: %f\n", dotProduct);

      return 0;
   }

Here is how it would look in C++ with ``std::vector``:

.. code-block:: cpp

   #include <iostream>
   #include <vector>
   #include <cstdlib>
   #include <omp.h>

   #define SIZE 10000

   int main() {
      std::vector<float> vector1(SIZE);
      std::vector<float> vector2(SIZE);
      float dotProduct = 0.0;

      // Initialize the vectors with random numbers
      #pragma omp parallel for
      for (int i = 0; i < SIZE; i++) {
         vector1[i] = static_cast<float>(rand()) / RAND_MAX;
         vector2[i] = static_cast<float>(rand()) / RAND_MAX;
      }

      // Compute the dot product using OpenMP parallelism
      #pragma omp parallel for reduction(+:dotProduct)
      for (int i = 0; i < SIZE; i++) {
         dotProduct += vector1[i] * vector2[i];
      }

      std::cout << "The dot product is: " << dotProduct << std::endl;

      return 0;
   }

And here is a FORTRAN version:

.. code-block:: fortran

   program dot_product
      use omp_lib
      implicit none

      integer, parameter :: SIZE = 10000
      real :: vector1(SIZE), vector2(SIZE), dotProduct
      integer :: i

      ! Initialize the vectors with random numbers
      !$OMP PARALLEL DO DEFAULT(NONE) PRIVATE(i) SHARED(vector1, vector2)
      do i = 1, SIZE
         vector1(i) = real(rand()) / real(RAND())
         vector2(i) = real(rand()) / real(RAND())
      end do
      !$OMP END PARALLEL DO

      dotProduct = 0.0

      ! Compute the dot product using OpenMP parallelism
      !$OMP PARALLEL DO DEFAULT(NONE) PRIVATE(i) SHARED(vector1, vector2) REDUCTION(+:dotProduct)
      do i = 1, SIZE
         dotProduct = dotProduct + vector1(i) * vector2(i)
      end do
      !$OMP END PARALLEL DO

      write(*, "(A, F6.2)") "The dot product is:", dotProduct

   end program dot_product

As you can see, a strength of OpenMP is the ability to write similar code to express parallelism in all three of the languages.
This legacy is important to frameworks such as oneAPI/SYCL, which aim to provide a similar framework without relying on compiler pramgas.
In particular, we will discuss oneAPI in more detail :doc:`in the section on data-parallel C++ </18-dpcpp/dpcpp>` below.


Parallel Concepts for Humans
------------------------------

In this section, we'll discuss some of the key concepts and principles underlying parallel computing. 
The track for this material was laid in the book `High Performance Java Platform Computing <https://ecommons.luc.edu/cs_facpubs/3/>`_.

https://ecommons.luc.edu/cs_facpubs/3/


https://figshare.com/articles/dataset/hpjpc/962958


von Neumann machines and their limits
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A discussion of parallel computing must begin with a discussion of sequential computing and the von Neumann machine—our sequential computer. The von Neumann machine is one of the computer designs of John von Neumann. A processor fetches instructions and data from a memory, operates on the data, and writes the results back into memory. Computation is accomplished by making small incremental changes in the global memory.

The problem with the von Neumann machine is that the design relies on making a sequence of small changes, a highly sequential process. Note that current programming languages are designed assuming that the von Neumann machine will be used. The assignment statement fetches data from memory on the right hand side, performs computations, and writes results back into the memory for the left-hand-side variable. The statements are executed sequentially, with control accomplished by branches. In the language, the branches are given the syntactic sugar of if statements, while statements, and so on.

There is a problem in trying to speed up von Neumann machines. They are inherently sequential in principle. Attempts may be made to execute several instructions at once (super-scalar execution), but that gives only a few times the speedup. Similarly, it is difficult to gain high speedup from a program written in a von Neumann language without doing an extensive rewrite of the program.



Flynn's taxonomy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Flynn produced a taxonomy of parallel machines that is widely used. He classified computers with respect to how many different instruction streams they are fetching and executing at the same time, and by how many data sets (data streams) they are fetching and processing. His taxonomy is as follows:

- SISD—single instruction stream–single data stream: the familiar von Neumann machine. Fetching one sequence of instructions and fetching the data and the instructions address from one memory.

- MIMD—(pronounced “mim-dee”) multiple instruction–multiple data stream: a multiprocessor or multicomputer (and the subject of this book). Here, several processors are fetching their own instructions and operating on the data those instructions specify. To gain speedup on individual programs, these processors must synchronize and communicate with each other.

- SIMD—(pronounced “sim-dee”) single instruction stream–multiple data stream: These machines typically are used to process arrays. A single processor fetches instructions and broadcasts those instructions to a number of data units. Those data units fetch data and perform operations on them. The appropriate programming language for such machines has a single flow of control (like a Von Neumann language), but has operations that can operate on entire arrays, rather than on individual array elements. The hardware needs ways in which data units will not execute some operations based on tests of their own data (e.g., so that some units can turn off for the then and others for the else parts of if-then-else statements), and it needs to let the control unit read the and or the or of the results of data tests at the data units (e.g. to know when all units have finished executing a while loop).

- MISD—multiple instruction stream–single data stream: It’s not totally clear what machines fit into this category. One kind of MISD machine would be designed for fail-safe operation; several processors perform the same operations on the same data and check each other to be sure that any failure will be caught. (An early system that worked in this manner was the `Tandem <https://en.wikipedia.org/wiki/Tandem_Computers>`__).

  Another proposed MISD machine is a systolic array processor. Streams of data are fetched from memory and passed through arrays of processors. The individual processors perform their own operations on the streams of data passing through them, but they have no control over where to fetch data from.

MIMD machines are divided into two varieties: shared memory and distributed memory.

Shared-memory machines have several processors accessing a common memory. Unless the machine is for a special purpose, the processors will be accessing the shared memory through some sort of address-mapping hardware. To be used for parallel processing, the software must let the processors actually share that memory in their address spaces.

Shared-memory machines have significant advantages for programming. All of the processors working on a common problem can share the large data structures (e.g., large arrays) and cooperate by working on parts of the data structure, while other processors work on other parts.

The problems with programming shared-memory machines have to do with synchronizing the processors. Since the processors work by fetching and storing small data elements, a processor updating a large data structure cannot read or write it in one instant. This means that if one processor is reading and another writing the same data structure at the same time, the reader may be getting some old components and some new ones. The state will not be consistent, and the computation will therefore become confused (“confused,” meaning there is an inconsistent state.) Similarly, if two processors are trying to write the same structure at the same time, parts of the two writes will be confused. Therefore, the software for shared-memory parallel machines must provide facilities for coordinating processors. The problem with programming is to make sure the coordination is done correctly.

There is another problem with shared-memory machines: It’s hard to build them to be large. The switch between the processors and memory becomes a bottleneck, limiting the traffic between processors and memory, or it tends to become expensive or slow. This is particularly the problem with UMA machines (Uniform Memory Access). UMA machines take the same amount of time to get to all memory locations. As the UMA machines get larger, physical packaging alone dictates that some memory will get further from some processors than it will for smaller versions. When the problems of switching more processors to more memory chips are added, UMAs can be expected to get slower still.

An alternative to UMA is NUMA (nonuniform memory access) machines. Typically, NUMA machines have some memory attached to each processor, which the processor can access quickly. To get to the memory attached to another processor, the processor must go through some sort of switch, which slows down the access. By careful placement and rep-lication of some data and subroutines, NUMA machines can have many of the programming conveniences of UMA machines, but with cheaper hardware, larger numbers of processors, and reasonable speed. However, programmers tend to discover that they can gain even better performance by copying entire data structures into local memory, operating on them locally, and writing them back to local memory. At this point, their code becomes more complex and less portable.Distributed-memory MIMD machines (MIMD-DM) are much easier to build, but much harder to program. The MIMD-DM machine is basically a collection of computers, called nodes, connected through a high-performance network. The major programming problem is that the individual machines must coordinate and communicate data by message passing; it often requires entire redesigns of programs to port them to MIMD-DM machines. The only way to access data on another node is to have that node send it to you. For that to happen, the other node must know that you need the data—or you must send it a request message, and it must be programmed to reply.

It is arguable that the change from shared-memory to distributed-memory machines is a radical shift (but one becoming more common); it goes to the root of how one thinks about computations. On the von Neumann machine, the most important entity is the process, the program in execution. The process fetches instructions and manipulates data, thereby embodying both control and data. On a shared-memory machine, the process is still the most important entity, although there are now multiple threads of execution within the data space. But at the global level, on a distributed-memory machine, messages convey data across the machine and the arrival of messages enables computations. At the global level of distributed-memory machines, it is the messages that embody control and data. Hence, the messages are more important than the processes that are running on the nodes.

Control-memory taxonomy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Flynn’s taxonomy is usually applied to machines with von Neumann processors. Further insight may be gained by considering other control mechanisms. The von Neumann machines may be characterized as “control driven”; it is the flow of control represented by the program counter that schedules operations for execution.

“Data-driven” processors schedule operations for execution when their operands become available. In the paradigmatic variety of data-driven machines, scalar data values flow in
tokens over an interconnection network to the instructions that work upon them (hence the term “data flow”). When a token arrives, the hardware checks that all operands are present and, if they are, schedules the instruction for execution. Data-flow machines are easily built distributed memory.

It is also possible to store the data in shared memory and signal each instruction whose operand is now available. Similarly, there is a technique for handling large data structures.

An entire data structure cannot be passed in a token, so the structure is stored in a memory where components of the structure arrive as they are computed. Fetches of the elements arrive in tokens and wait for the value of the element to arrive, whereupon the value is sent on in a token to where the fetch specifies.

A “demand-driven” processor performs computations when values are demanded. For example, when the value of a binary operator is demanded, the operator, in turn, demands the values of its operands. A common implementation of demand-driven processors is based on “reductions,” which occur when a functional program is repeatedly rewritten until the solution is computed. The rewritings include replacing an operator applied to data values with its result and replacing a function call with the function body, with the actual parameters substituted for the formal. Reductions are performed on an internal representation of the program. Two common representations are graphs and strings. Graphs consist of nodes linked together with pointers and hence work best with shared memory. Strings can be spread across a chain of processors so that an individual processor can reduce sub-expressions contained entirely in its memory and neighboring processors can shift expressions falling across their boundary into one of them.“Pattern-driven” computation is typically done without specialized hardware and is implemented atop von Neumann machines. Shared-memory, pattern-driven programming usually means parallel-logic programming. Distributed-memory, pattern-driven programming is represented in this book by Active Messages and Concurrent Aggregates.

Speedup vs. Efficiency
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We want to use parallelism to compute answers more quickly. How much more quickly?

We define speedup as

.. math::

   S = \frac{T_1}{T_n}

where :math:`T_1` is defined as the execution time of the sequential algorithm for the problem on a single processor, and :math:`T_n` is the execution time of the parallel algorithm on ``n`` processors. Notice several things:

- :math:`T_n` should be smaller than :math:`T_1` , since the parallel algorithm should run faster than the sequential algorithm.


- The larger the value of S, the better. This is coherent with a cultural metaphor of bigger is better1 (even though we want the smallest run time possible).

- :math:`T_1` is supposed to be the run time of the best possible sequential algorithm, but in general, the best possible algorithm is an unknown quantity. Thus, it is often the case that :math:``T_1`` is simply a version of the parallel program that is run sequentially.

- We define linear speedup as:

  .. math::

     S = \frac{T_1}{T_n} = n


We would expect that speedup cannot be better (larger) than linear, and indeed should be smaller. If the entire work of the sequential program could be evenly divided among the $n$ processors, they could all complete in $1/n$ the time.
But it is unlikely that the work could be divided evenly; programs tend to have a sequential part, such as initialization or reading data from or writing results to sequential files.
If the sequential part can only be done on a single machine, then only the rest can be run in parallel.
We will examine this in more detail when we discuss Amdahl's law.
Even if the program could be evenly divided among :math:`n` processors, the processors would probably have to coordinate their work with each other, which would require extra instruction executions beyond the sequential program.
Therefore, :math:`T_n` may be :math:`\frac{1}{n}` of a larger value than :math:`T_1`.

Moreover, :math:`T_1` is supposed to be the best known sequential algorithm.  If the parallel algorithm runs faster on a single machine, it would be a better sequential algorithm, and therefore, you’d use it. So you can expect the algorithm :math:`T_1` to be at least as good as the algorithm for :math:`T_n`. You cannot expect any help from differences in the algorithms in achieving even linear speedup.

However, in practice, super-linear speedup is sometimes observed. There are several reasons for this:

.. math::

   S > n



- The hardware is different. The parallel machine has more processors, and hence more cache memory, for one thing. Better locality and pipelining can also play a role.

- The algorithm is different. For example, a depth-first search on a sequential machine might be translated into a collection of depth-first searches on the nodes of a parallel computer, but the parallel depth-first searches would have an element of a breadth-first search. A single depth-first search might spend a large amount of time on one fruitless branch, whereas with several searches, it is likely that another path might find the solution more quickly.

Efficiency is defined as

.. math::

   E = \frac{S}{n} = \frac{T_1}{n T_n} = \frac{T_1 / n}{T_n}

The formula shows two ways to think about efficiency. Suppose you were to run the parallel program on a serial machine. The serial machine would have to execute all the parallel processes. If there are ``n`` processes, then the serial execution shouldn’t take more than about nTn (assuming that the time to swap the processor from one process to another is negligible). Efficiency, then, would measure the ratio of the actual sequential time to the worst expected time to execute the ``n`` processes sequentially.

Suppose that, on the other hand, you calculate how long you would expect it to take to run the sequential algorithm on ``n`` processors, assuming linear speedup. That gives you ``T_1``/ n.

The efficiency would be the ratio of execution time with linear speedup to observed execution time. If speedup is no greater than linear, efficiency will be less than or equal to 1.

Amdahl’s Law
^^^^^^^^^^^^

Amdahl’s law does not really deserve the title of law. It is merely a back-of-the-envelope attempt (or conjecture) to prove that there are severe limits to the speedup that can be achieved by a parallel program. Amdahl’s law asserts that there is a serial part of any parallel program that must be executed sequentially, and the time required for this part will be a lower limit on the time the program takes to execute. Consider a serial program that executes in time T. Let’s calculate the best speedup we could achieve if a fraction f of the execution time is taken up by sequential execution. If you divide the parallel execution time into the serial and parallel parts, you get speedup with an upper bound of

.. math::

   E = \frac{T}{f T + \frac{(1 - f)T}{n}}


We get this equation by taking the definition of speedup and breaking down Tn into the time taken by the serial fraction (fT) and the time taken by the parallel fraction [(1– f)T]. We divide the parallel fraction by ``n`` to calculate the best we could expect from a linear speedup.

T appears as a factor in both the numerator and the denominator. Thus, it can be removed, which leads to an equation not involving T, or

.. math::

   S = \frac{1}{f + \frac{(1 - f)}{n}}

As ``n`` approaches infinity (i.e., the number of processors is increased), we arrive at the folllowing limit:

.. math::

   \lim_{x\to\infty} S = \lim_{x\to\infty} \frac{1}{f + \frac{(1 - f)}{n}} = \frac{1}{f}


Scalability
^^^^^^^^^^^^

A flaw in the reasoning behind Amdahl’s law is that it deals with fixed-sized problems and questions how much faster they can be run. This is not, however, the way massively paral- lel processors are used. Take the example of weather forecasting. The calculations are made by superimposing a mesh onto the atmosphere and calculating pressure, tempera- ture, humidity, etc., at each mesh point, repeatedly using the values at the surrounding points at small time intervals. The more numerous the mesh points and the smaller the time intervals, the better is the forecast. But the more calculations that are required, the
slower the program runs. And for weather forecasting, if the calculation takes too long, it loses all value. When presented with a faster machine, weather forecasters will use more grid points and a smaller step size. They increase the problem size to the largest possible value that allows the answer to be reached in the same amount of time.

Let’s rephrase the calculation, starting with a parallel program with serial fraction g that runs in time R on ``n`` processors. If we ran the calculation on a single processor, how long would it take? The answer is

.. math::

   T = g R + n(1 - g)R

This equation follows, since the serial fraction will still take the same time :math:``g R`` and the :math:`n` parts of the parallel fraction :math:`(1-g) R` would have to be interleaved.

This results in the speedup calculation

.. math::

   S = \frac{g R + n(1 - g)R}{R} = g + n(1 - g)

a linear speedup with slope (1 × g). The efficiency is
   
.. math::

   E = 1 - g \frac{n - 1}{n}

which approaches the parallel fraction as the number of processors increases. In this for- mulation, there is no theoretical limit on speedup. As long as we scale the problem size to the size of the machine, we will not run into limits.

Another aspect of this argument against Amdahl’s law is that, as the problem size increases, the serial fraction may decrease. Consider a program that reads in two N-by-N matrices, multiplies them, and writes out the result. The serial I/O time grows as :math:`N^2`, while the multiplication, which is highly parallelizable, grows as :math:`N^3`.


.. Strong/Weak scaling [new topic]
.. ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Granularity
^^^^^^^^^^^^^

Grain size loosely refers to the amount of computation that is done between communications or synchronizations. Too large a grain size can result in an unbalanced load. Too small a grain size can waste too much time on system overhead. Consider eight processors that are to execute 10 independent tasks, each of which takes :math:`t` time units. Suppose the system takes :math:`s` time units to run a task. The schedule looks like this:

Six processors execute one task completing in time :math:`t + s`.

- Two processors execute two tasks completing in time :math:`2t + 2s`.
- The overall completion time is the maximum of any processor’s completion time: :math:`2t + 2s`.

Suppose we divide each task into 10 independent tasks, giving us 100 tasks for the entire job. Each task now will take :math:`\frac{t}{10}` time units. The schedule now looks like this:

Four processors execute 12 tasks completing at time :math:`\frac{12t}{10} + 12s`.
- Four processors execute 13 tasks completing at time :math:`\frac{13t}{10} + 13s`.
- The overall completion time is the maximum of any processor’s completion time: :math:`\frac{13t}{10} + 13s`.


How do these compare? If s is negligible compared to t, then schedule (1) will complete in 2t, and schedule (2) in 1.3t. However, 13s is significantly larger than 2s, so system over- head s, being even a small fraction of grain size t, might destroy all of the advantages of load balancing. What is the cutover point? That is, at what fraction of t does s cause sched- ule (2) to take as long as schedule (1)? The answer is

2t + 2s = 1.3t + 13s s = (0.7/11)t = 0.064t

So, if s is even seven percent of t, the version with 100 tasks will be as slow as the version with 10. So how do you choose a good grain size? Folklore suggests that one millisecond of execution between communications is a reasonable amount. Other folklore suggests that processing 300–400 array elements between communications is good on some systems. What you will probably have to do is experiment for yourself to find a good grain size. By parameterizing your actual code, you can enable the possibility to experiment.



Starvation and deadlock
^^^^^^^^^^^^^^^^^^^^^^^

Starvation results when some user computations do not get adequate processor time. Here’s an example of starvation on a distributed-memory machine: For some distributed computa- tions, it is difficult to determine if they are finished. There are some algorithms that send system probe messages around to inquire about the state of the computation. Starvation can result if the probe messages use up significant processor time, making processor time unavailable to the user computations. On shared-memory machines, processors lock and unlock resources. When a resource is unlocked, one of the processors waiting for it (if any) is allowed to proceed. If the resource allocation mechanism is unfair, some waiting pro- cesses may be long delayed, while other processes acquire the resource repeatedly.

A set of processes is deadlocked if each process is waiting for resources that other pro- cesses in the set hold and none will release until the processes have been granted the other resources that they are waiting for. There are four conditions required for deadlock:
• Mutual Exclusion: Only a process in possession of a resource may proceed.
• Hold and Wait: Processes will hold resources and wait for others.
• No Preemption: A resource may not be removed from one process to give to another.
• Circular Wait: There exists a cycle of processes holding resources and waiting for resources the next process in the cycle holds.

There are three things you can try to do about deadlock:
• You can try to detect when deadlock has occurred and then try to do something about it. For example, you may cancel one or more of the processes involved to free the resources they hold.Usually, this requires the presence of a monitor process that effec- tively acts as a proxy for any resource request.
• You can try to avoid creating a deadlock by checking before each resource allocation to determine whether the allocation might result in a deadlock and then allowing pro- cesses to proceed only if it is safe to do so.
• You can try to make it impossible for deadlock to occur. The easiest prevention is to eliminate circular waits by numbering the resources and requesting resources in ascending numeric order. That is, never request a resource if you already possess one with a higher number.


Flooding/Throttling
^^^^^^^^^^^^^^^^^^^

Strangely, one of the problems with parallelism is having too much rather than too little. For many parallel algorithms (especially divide and conquer and combinatoric search), a problem is repeatedly broken into smaller parts that can be run in parallel. Once the num- ber of parallel parts significantly exceeds the number of processors available, it is some- times detrimental to create more parallelism: All processors will be kept busy anyway, the
time to create more parallel tasks will be wasted, and the storage for those task descrip-
tions will tax the parallel machine’s memory.

Preventing a flood of parallelism typically requires extra programming: The algorithm must be broken down into the code that is executed before enough parallel tasks are cre- ated, which creates more tasks, and the code that is executed after sufficient tasks are available, which does its work within a single task.

Choice of when to switch from creating more tasks to executing within tasks can be made statically, before the algorithm runs, or dynamically, in response to the system load. Dynamic switching requires additional information about the current state of the system, which is oftentimes not available or is highly imprecise.


Layout
^^^^^^^^

The layout of a data structure on a distributed-memory machine can make a significant dif- ference in performance. There are two interacting concerns. First, it is important to balance the load so that all nodes have approximately the same amount of work to do. Secondly, it helps to have most communication between neighboring nodes; there won’t be as many queueing delays as messages contend for communication edges along longer paths.
Consider, though, a simulation of the cosmos: If you divide space into equally sized cubes and assign one cube to each node of a multicomputer, then communication of gravitation and movements of mass can be done between neighboring nodes on a mesh-connected computer. Unfortunately, there will be vast regions of nearly empty space mapped to some regions of nodes, while those parts of space with clusters of galaxies will be mapped into other nodes; that is, the load will be horribly imbalanced. A way to balance the load is to divide space into a larger number of regions and randomize their mapping onto the nodes, say, by hashing their coordinates to give the node number. Then you can count on the law of large numbers to balance the load, but communication between neighboring regions is no longer between neighboring nodes.
Suppose we have N rows of an array that must be processed. How can we divide them evenly among P nodes?

1. We could give floor :math:`N ⁄ P` rows to each of the first :math:`P - 1` nodes and the remaining rows to the last node. If N = 15 and P = 4, nodes 0, 1, and 2 get three rows, and node 3 gets six. The load is imbalanced, and the completion time will be dominated by the last node.

2. We could give ceiling :math:`N ⁄ P` rows to each of the first :math:`P - 1` nodes and the remaining rows to the last. If N = 21 and P = 5, we would assign five rows to each of the first four nodes and one row to the last. The last is underutilized, but it’s not as severe as case (1), where the last node was the bottleneck.

We could try to assign the rows so that no node has more than one row more than any other node. An easy way to do this is to assign node i all rows j such that j mod P = i, assuming rows are numbered zero through :math:`N - 1` and nodes are numbered zero through :math:`P - 1`. Node i will contain rows i, i + P, i + 2P, i + 3P, ... .
We can assign blocks of rows to nodes, as in (1) and (2), but guarantee that no node has more than one more row than any other node, as in (3). Assign node i the rows in the range Li to Ui inclusive, where

.. Li = floor(N/P) + min(i, N mod P) Ui = Li + 1 − 1

Some algorithms divide arrays into regions that communicate along their edges, so mes- sages will be shorter and faster if the perimeters of regions are smaller: Square regions tend to be better than long, rectangular regions.


Latency
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As machines get larger, physical packaging itself requires that components get further apart. Therefore, it will take longer for information to flow between some components rather than others. This implies that the larger, shared-memory machines will be NUMA (nonuniform memory access). Data layout becomes increasingly important. Algorithms may benefit by being rewritten to fetch remote objects, operate on them locally, and then write them back, rather than just manipulating them in place.

Latency is also one of the considerations in laying out tasks and data on distributed-mem- ory machines. On distributed-memory machines, one has the extra option of using asyn- chronous message passing to allow other computations to be performed while messages are being passed.



Scheduling [needed for understanding q.submit()]
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Scheduling assigns tasks to processors to be run in a particular order or at particular times. There is a large amount of literature devoted to process scheduling, the major import of which is this: Almost any scheduling of activities on processors is an NP-hard problem. For practical purposes, the meaning of NP-hard is this: The worst-case time to run an NP- hard algorithm grows so rapidly (e.g., doubling when you add one element to the input), that you may not get a solution for a modestly sized problem before the sun burns out. Do not seek perfect solutions to NP-hard problems. Instead, look for ways to quickly get solu- tions that are reasonably good most of the time. Static scheduling of tasks on processors would be done before the tasks are run. Dynamic scheduling assigns tasks during execu- tion. Self-scheduling is a form of dynamic scheduling in which the processors themselves select which task to execute next.


The techniques for partitioning rows among nodes that we saw in the discussion of layout are also applicable to processor scheduling on shared-memory machines. For technique (3), an easy way to assign process i all rows j such that j mod P = i is to handle the rows in a loop:


::

     for (j = my_id; j<n; j +=P) {
         process row j
     }
     where the rows are numbered 0 through N-1
     my_id is the node number in the range 0..P-1


Rather than assign entire rows or columns to processors, better load balancing can some- times be accomplished by assigning groups of elements. If there are K total elements in an array, we can assign them numbers 0 through :math:`K - 1`, assign ranges of those numbers to processors, and convert from the element number to the array indices when necessary. For an M × N matrix A with zero origin addressing, element A[i,j] would be given the num- ber i*N+j in row major order. Similarly, the element with number q would correspond to A[i,j], where

::

    i = floor(q/N)
    j = q mod N


A simple form of self-scheduling for K elements is to keep the index C of the next element to be processed and to allocate items by incrementing or decrementing C. The following code is illustrative:

::

    initially, C = K-1
    i = 0;
    while (i>=0) {
       lock C_lock;
       i = C;
       C = C-1;
       unlock C_lock;
       if (i >= 0) process item i;
    }

However, if the processing of a single element takes little time, the grain size is too small. Of course the processor could allocate some constant number of elements greater than one at a time. This is clearly better for grain size, but may still have load balance problems. An improved self-scheduling algorithm has each of the P processors allocate ceiling(C/P) elements (i.e., allocate 1/P of the remaining elements):

::

    initially, C = K
    low = 0;
    while (low>=0) {
       lock C_lock;
       t = ceiling(C/P);
       if (t == 0)
          low=-1;
       else {
       high = C-1;
       low = C = C-t; }
       unlock C_lock;
       if (low>=0)
           process items low through high inclusive;
    }



.. task graphs / dataflow execution / macro-dataflow concept
.. ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^




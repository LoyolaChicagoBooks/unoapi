Parallel Programming Preliminaries
==================================

.. note:: This chapter is being drafted now. Set expectations accordingly!

Brief History of Data Parallelism
----------------------------------

.. note:: This is an approximate lineage (not finalized)!

Vector machines (Cray)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Connection Machine (Thinking Machines)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Systolic architectures
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Loop parallelism in FORTRAN
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C* and Data-Parallel C efforts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

CUDA
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

OpenMP
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

oneAPI
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Parallel Concepts for Humans
------------------------------

.. note:: The track for this was laid in the Java threads/networking book.

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

MISD—multiple instruction stream–single data stream: It’s not totally clear what machines fit into this category. One kind of MISD machine would be designed for fail-safe operation; several processors perform the same operations on the same data and check each other to be sure that any failure will be caught.

Another proposed MISD machine is a systolic array processor. Streams of data are fetched from memory and passed through arrays of processors. The individual processors perform their own operations on the streams of data passing through them, but they have no control over where to fetch data from.

MIMD machines are divided into two varieties: shared memory and distributed memory.

Shared-memory machines have several processors accessing a common memory. Unless the machine is for a special purpose, the processors will be accessing the shared memory through some sort of address-mapping hardware. To be used for parallel processing, the software must let the processors actually share that memory in their address spaces.

Shared-memory machines have significant advantages for programming. All of the processors working on a common problem can share the large data structures (e.g., large arrays) and cooperate by working on parts of the data structure, while other processors work on other parts.

The problems with programming shared-memory machines have to do with synchronizing the processors. Since the processors work by fetching and storing small data elements, a processor updating a large data structure cannot read or write it in one instant. This means that if one processor is reading and another writing the same data structure at the same time, the reader may be getting some old components and some new ones. The state will not be consistent, and the computation will therefore become confused (“confused,” meaning there is an inconsistent state.) Similarly, if two processors are trying to write the same structure at the same time, parts of the two writes will be confused. Therefore, the software for shared-memory parallel machines must provide facilities for coordinating processors. The problem with programming is to make sure the coordination is done correctly.

There is another problem with shared-memory machines: It’s hard to build them to be large. The switch between the processors and memory becomes a bottleneck, limiting the traffic between processors and memory, or it tends to become expensive or slow. This is particularly the problem with UMA machines (Uniform Memory Access). UMA machines take the same amount of time to get to all memory locations. As the UMA machines get larger, physical packaging alone dictates that some memory will get further from some processors than it will for smaller versions. When the problems of switching more processors to more memory chips are added, UMAs can be expected to get slower still.

An alternative to UMA is NUMA (nonuniform memory access) machines. Typically, NUMA machines have some memory attached to each processor, which the processor can access quickly. To get to the memory attached to another processor, the processor must go through some sort of switch, which slows down the access. By careful placement and rep-lication of some data and subroutines, NUMA machines can have many of the programming conveniences of UMA machines, but with cheaper hardware, larger numbers of processors, and reasonable speed. However, programmers tend to discover that they can gain even better performance by copying entire data structures into local memory, operating on them locally, and writing them back to local memory. At this point, their code becomes more complex and less portable.Distributed-memory MIMD machines (MIMD-DM) are much easier to build, but much harder to program. The MIMD-DM machine is basically a collection of computers, called nodes, connected through a high-performance network. The major programming problem is that the individual machines must coordinate and communicate data by message passing; it often requires entire redesigns of programs to port them to MIMD-DM machines. The only way to access data on another node is to have that node send it to you. For that to happen, the other node must know that you need the data—or you must send it a request message, and it must be programmed to reply.

It is arguable that the change from shared-memory to distributed-memory machines is a radical shift; it goes to the root of how one thinks about computations. On the von Neumann machine, the most important entity is the process, the program in execution. The process fetches instructions and manipulates data, thereby embodying both control and data. On a shared-memory machine, the process is still the most important entity, although there are now multiple threads of execution within the data space. But at the global level, on a distributed-memory machine, messages convey data across the machine and the arrival of messages enables computations. At the global level of distributed-memory machines, it is the messages that embody control and data. Hence, the messages are more important than the processes that are running on the nodes.

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


Linear speedup

.. math::

   S = \frac{T_1}{T_n} = n


Efficiency

.. math::

   S = \frac{S}{n} = \frac{T_1}{n T_n} = \frac{T_1 / n}{T_n}


Divide parallel execution time into sequential and parallel parts to get upper bound on speedup:

.. math::

   S = \frac{T}{f T + \frac{(1 - f)T}{n}}

Simplify by removing T

.. math::

   S = \frac{1}{f + \frac{(1 - f)}{n}}

Assuming infinite processors, n, the limit is:

.. math::

   \lim_{x\to\infty} S = \lim_{x\to\infty} \frac{1}{f + \frac{(1 - f)}{n}} = \frac{1}{f}


Scalability

.. math::

   T = g R + n(1 - g)R


Speedup using this equation

.. math::

   S = \frac{g R + n(1 - g)R}{R} = g + n(1 - g)

Efficiency

   
.. math::

   E = 1 - g \frac{n - 1}{n}


Strong/Weak scaling [new topic]
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Granularity
--------------------------------------

starvation, deadlock
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Flooding/Throttling
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Latency
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Scheduling [needed for understanding q.submit()]
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

task graphs / dataflow execution / macro-dataflow concept
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



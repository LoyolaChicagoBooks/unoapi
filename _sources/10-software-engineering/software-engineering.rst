Introduction to Software Engineering
========================================

Software engineering (SE) is and remains vital to success as a professional software developer / research software engineer.
While SE principles evoke a wide range of responses, it is possible to embrace many princples from software engineering and ensure impact on your projects without distracting you (entirely) from your day-to-day work. We encourage readers to consult the article `Software Engineering Need Not Be Difficult <https://ecommons.luc.edu/cs_facpubs/75>`_ to see how you can apply some of these principles to your work.

We maintain that there are many software engineering principles that matter in day-to-day life among professional programmers. Here are some of the key ones:

- **Agile and iterative development**: Adopting an agile and iterative development methodology can help teams quickly respond to changing requirements, customer needs, and market trends, while minimizing risks and maximizing value. This includes using techniques such as user stories, sprints, retrospectives, and continuous improvement.

- **Code quality and maintainability**: Writing code that is easy to understand, modify, and extend is essential for the long-term success of any software project. This includes using consistent coding style and conventions, writing clean and concise code, and applying best practices such as modularization, encapsulation, and abstraction.

- **Testing and quality assurance**: Ensuring that the software meets the expected quality and functionality requirements is critical to avoiding bugs and defects that can cause system failures, data loss, or security breaches. This includes developing automated tests, performing manual tests, and applying quality assurance processes such as code reviews, continuous integration, and continuous delivery.

- **Documentation and knowledge sharing**: Documenting the code, architecture, design decisions, and project requirements is essential for enabling effective communication, collaboration, and knowledge sharing among team members and stakeholders. This includes writing clear and concise comments, documentation, and user manuals, and applying knowledge management processes such as code reviews, wikis, and project wikis. We intend for :doc:`this book itself <../00-preliminaries/preliminaries>` to exemplify this practice, along with several other principles included in this chapter.

- **Version control and collaboration**: Using a version control system and collaborating effectively with team members and external contributors is essential for managing code changes, resolving conflicts, and ensuring that the project progresses smoothly. This includes using a distributed version control system such as Git, following good branching and merging practices, and using collaboration tools such as pull requests, issue trackers, and chat applications.

- **Build and Configuration Management**: Build and configuration management tools have long been a key part of the software engineer's toolbox. These tools, such as the UNIX `make` command, support consistently and efficiently rebuilding a project after a change in one or more source files. In addition, more modern tools such as `cmake` and Apache Maven, add support for automatic, declarative management of external dependencies.

- **Continuous Integration**: Continuous Integration (CI) refers to the practice of continuously merging code changes, typically from multiple contributors, into a shared repository. Instead of waiting for days or weeks to integrate code from different team members, with CI, changes are integrated frequently, often multiple times a day. Concretely, this approach involves automated builds and testing, along with immediate feedback if there is a problem.

- **Rootless package management**: This technique allows users to install, update, and manage software packages without requiring superuser (root) permissions. This approach enhances security by minimizing the potential damage malicious or buggy software can inflict on system-wide directories, and offers flexibility by allowing individual users to manage their software in isolated environments. 

- **Security and privacy**: Ensuring that the software is secure and protects user privacy is becoming increasingly important in today's interconnected world. This includes applying security and privacy best practices such as encryption, authentication, and authorization, following security standards such as OWASP, and regularly testing for vulnerabilities and threats.

- **Professionalism and ethics**: Behaving ethically and professionally, and following industry standards and regulations, is essential for building trust with clients, customers, and the wider community. This includes following ethical principles such as honesty, integrity, and respect, complying with regulations such as GDPR and HIPAA, and adopting industry standards such as ISO 9001 and CMMI.

While there are other practices that give the *full* software engineering experience, we think these can be a helpful starting point to ensure success in developing research software (the kind of software you are likely doing if you're reading about SYCL and oneAPI).

We are going to take a look at some of the more *technical* aspects of software engineering: testing, documentation, version control, security/privacy (by discouraging unsafe practices, e.g. explicit pointer usage), and professionalism/ethics. As scientific computing is something used to drive scientific progress, we need to write software that users can trust ("trust science"), which results, in part, from taking all possible steps to ensure reliability and reproducibility.


Testing
--------

Testing is a vast software engineering topic in itself, encompassing various levels---primarily unit testing, integration testing, system testing, and acceptance testing---along with many testing types, techniques, and tactics. For an overview of the subject of testing, please refer to the corresponding `Wikipedia article <https://en.wikipedia.org/wiki/Software_testing>`_.

The main value proposition of `automated unit testing <https://en.wikipedia.org/wiki/Test-driven_development>`_ is that it encourages frequent regression testing by making it painless.
During the last two decades, this “test-infected” mindset has gradually entered the mainstream including introductory computer science courses.
We argue that it can benefit and integrate seamlessly with HPC education.

Support for unit testing in C/C++ has improved considerably, and we prefer `GoogleTest <https://google.github.io/googletest/>`_ for this purpose.
A typical floating-point correctness test looks like this:

.. literalinclude:: ../../examples/unoapi-dpcpp-examples/integration/test.cpp
  :language: cpp
  :start-after: UnoAPI:integration-test-simple3:begin
  :end-before: UnoAPI:integration-test-simple3:end  

At the unit testing level, the following techniques are of particular interest:

- Ad-hoc testing, also called example-based testing, such as the preceding example, where we provide one or more specific test cases, where we programmatically interact with the system under test (SUT) and then examine the result or effect of the interaction.
- Table-based testing, where we provide a table of two or more columns corresponding to arguments and expected results of the function or method under test. This technique allows for a more concise representation of several similar ad-hoc tests.
- Property-based testing, where we express the relationship between arguments and expected results as a universally quantified property. Typically, a property-based testing library automatically generates a certain number of argument and result values based on the property and executes each corresponding test.

.. math::

  \forall y \in [0, 100] \forall w \in [0, 10] \, trapezoid(-y, +y, w) \leq \epsilon

We have covered various aspects of testing in other works, including

- `Managing Concurrency in Mobile User Interfaces with Examples in Android <https://link.springer.com/chapter/10.1007/978-3-319-93109-8_9>`_
- `Tests as Maintainable Assets via Auto-Generated Spies: A Case Study Involving the Scala Collections Library's Iterator Trait <https://ecommons.luc.edu/cs_facpubs/230/>`_

	  
Build and Configuration Management
----------------------------------

A key portability challenge results from differences across users’ development and production environments, such as different versions of operating systems, compilers, libraries, and other tools.
Among several efforts to abstract away these differences and support building a project on any environment meeting certain minimum criteria, (modern) `CMake <https://cmake.org>`_ has emerged as the most painless choice, especially for C/C++-based projects.

CMake enables us to use C/C++ similar to other languages, such as Java, Scala, Python, JavaScript/Node, by managing external library dependencies declaratively and fetching them dynamically.
This encourages parametric thinking and makes it possible to develop adaptable HPC codes.

The following settings consistently ensure a specific language standard:

.. literalinclude:: ../../examples/unoapi-dpcpp-examples/CMakeLists.txt
  :language: cmake
  :start-after: UnoAPI:CMakeLists-language-settings:begin
  :end-before: UnoAPI:CMakeLists-language-settings:end  

This section is an example of declaring an external dependency that gets included into the build process at source level.

.. literalinclude:: ../../examples/unoapi-dpcpp-examples/CMakeLists.txt
  :language: cmake
  :start-after: UnoAPI:CMakeLists-fetchcontent:begin
  :end-before: UnoAPI:CMakeLists-fetchcontent:end  

The external dependencies declared in this way then become available for linking into the executable(s).

.. literalinclude:: ../../examples/unoapi-dpcpp-examples/integration/CMakeLists.txt
  :language: cmake
  :start-after: UnoAPI:CMakeLists-targetlibraries:begin
  :end-before: UnoAPI:CMakeLists-targetlibraries:end  
   
With our CMake build configuration in place, we normally perform the following to steps to configure a debug build:

.. code-block:: shell

  cmake -DCMAKE_BUILD_TYPE=Debug -S . -B build
  cmake --build build

For measuring the performance of our code, however, configuring a release build ensures that code optimization is properly enabled:

.. code-block:: shell

  cmake -DCMAKE_BUILD_TYPE=Release -S . -B build

This is the type of build we use for our performance measurements (see also :doc:`/30-performance/performance`.


Version Control
----------------

Version control, especially distributed, hosted services such as GitHub, GitLab, and Bitbucket, are one of the foundations of modern software engineering practice.
Version control allows a development team to keep their code in a secure place and enables collaboration following numerous different models and cultures.

- **Commits/Snapshots**: The essence of version control is recording changes, and commits or snapshots represent these changes. Each commit marks a specific point in a project's history, allowing developers to revisit or restore to that point if needed.

- **Branching and Merging**: These concepts allow for parallel development without interference. Developers can work on new features, bug fixes, or experiments separately from the mainline code and later integrate these changes back. This flexibility is a cornerstone of modern development practices like feature branching and GitFlow.

- **Conflict Resolution**: When multiple developers change the same code sections, conflicts arise. Resolving these conflicts correctly is crucial to maintaining code integrity and team collaboration.

- **Remote Repositories and Syncing Operations (Pull/Push/Fetch)**: Especially in distributed systems like Git, operations to synchronize local and remote repositories are fundamental. They allow developers to share changes, fetch updates, and collaborate on a shared codebase.

- **Hooks and Automation**: Custom scripts or actions that are triggered by repository events, allowing automated tests, builds, or notifications. These steps are usually part of a continuous integration (CI) workflow, as discussed below.


Continuous Integration
----------------------

There are various choices for adding continuous integration to a software project, such as setting up a dedicated server or connecting to an external provider.
Even more conveniently, major hosted version control services already include support for continuous integration.
In practice, automated builds (workflow runs) are triggered every time a project contributor commits changes to the code base.
Such a build automates the steps one would typically perform manually on one’s workstation:

- starting with a vanilla configuration,
- installing prerequisites to the build,
- checking out the project source code,
- building executable artifacts, and
- running/testing them.

Starting with a vanilla (default) system configuration ensures that all project dependencies (tools, external libraries, etc.) are fully understood and explicit.
In addition, build automation results in almost immediate feedback on an incorrect commit that “breaks the build”.

We argue that continuous integration can make us reproducibility-aware: A researcher wishing to reproduce the work represented by a particular project can “fork” the project into their own account on, say, GitHub.
The CI workflow then runs on that user’s fork of the project.
This gives us some degree of reproducibility “for free,” subject to limitations in devices available through the actual CI container (i.e., not usually accelerators).

These are the steps of our GitHub Actions CI workflow (see also the full script `here <https://github.com/LoyolaChicagoCode/unoapi-dpcpp-examples/blob/main/.github/workflows/oneapi-cmake.yml>`_).

.. literalinclude:: ../../examples/unoapi-dpcpp-examples/.github/workflows/oneapi-cmake.yml
  :language: bash

Automated testing usually takes place as part of the continuous integration process.  
Accordingly, the last step of our CI workflow invokes all discovered executable tests.


Rootless Package Management for Libraries and Tools
---------------------------------------------------

On publicly accessible HPC clusters, such as Intel’s DevCloud and those run by some national laboratories, users don’t typically have root access (administrative privileges).
This precludes them from using native package management, such as ``apt`` on Ubuntu, to install missing packages or newer versions of outdated packages.

During the last decade or so, userland package management tools have emerged as a complement to native package management.
These tools, such as Homebrew on MacOS and Linux and Chocolatey on Windows, allow users to install additional packages for their personal use without requiring root access, e.g., a current version of CMake.

Rootless package managers often utilize user-specific directories, such as a user's home directory, to store and manage libraries and tools, thereby avoiding conflicts and ensuring that software management operations remain user-specific and don't affect the entire system or other users.


Additional References
---------------------

- `Software Engineering Book of Knowledge (SWEBOK) <https://www.computer.org/education/bodies-of-knowledge/software-engineering>`_
- `ACM Code of Ethics and Professional Conduct <https://www.acm.org/code-of-ethics>`_
- `IEEE Code of Ethics <https://www.ieee.org/about/corporate/governance/p7-8.html>`_

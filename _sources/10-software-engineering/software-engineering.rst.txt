Introduction to Software Engineering
========================================

Software engineering (SE) is and remains vital to success as a professional software developer / research software engineer.
While SE principles evoke a wide range of responses, it is possible to embrace many princples from software engineering and ensure impact on your projects without distracting you (entirely) from your day-to-day work. We encourage readers to consult https://ecommons.luc.edu/cs_facpubs/75/ to see how software engineering need not be difficult to apply to your work.

We maintain that there are many software engineering principles that matter in day-to-day life among professional programmers. Here are some of the key ones:

- **Agile and iterative development**: Adopting an agile and iterative development methodology can help teams quickly respond to changing requirements, customer needs, and market trends, while minimizing risks and maximizing value. This includes using techniques such as user stories, sprints, retrospectives, and continuous improvement.

- **Code quality and maintainability**: Writing code that is easy to understand, modify, and extend is essential for the long-term success of any software project. This includes using consistent coding style and conventions, writing clean and concise code, and applying best practices such as modularization, encapsulation, and abstraction.

- **Testing and quality assurance**: Ensuring that the software meets the expected quality and functionality requirements is critical to avoiding bugs and defects that can cause system failures, data loss, or security breaches. This includes developing automated tests, performing manual tests, and applying quality assurance processes such as code reviews, continuous integration, and continuous delivery.

- **Documentation and knowledge sharing**: Documenting the code, architecture, design decisions, and project requirements is essential for enabling effective communication, collaboration, and knowledge sharing among team members and stakeholders. This includes writing clear and concise comments, documentation, and user manuals, and applying knowledge management processes such as code reviews, wikis, and project wikis.

- **Version control and collaboration**: Using a version control system and collaborating effectively with team members and external contributors is essential for managing code changes, resolving conflicts, and ensuring that the project progresses smoothly. This includes using a distributed version control system such as Git, following good branching and merging practices, and using collaboration tools such as pull requests, issue trackers, and chat applications.

- **Security and privacy**: Ensuring that the software is secure and protects user privacy is becoming increasingly important in today's interconnected world. This includes applying security and privacy best practices such as encryption, authentication, and authorization, following security standards such as OWASP, and regularly testing for vulnerabilities and threats.

- **Professionalism and ethics**: Behaving ethically and professionally, and following industry standards and regulations, is essential for building trust with clients, customers, and the wider community. This includes following ethical principles such as honesty, integrity, and respect, complying with regulations such as GDPR and HIPAA, and adopting industry standards such as ISO 9001 and CMMI.

- **Automatic Compilation**: Makefile vs. CMake

- **Continuous Integration**: Using GitHub Actions (at least for the non-GPU specific stuff)


.. todo:: rootless package management
  

While there are other practices that give the *full* software engineering experience, we think these can be a helpful starting point to ensure success in developing research software (the kind of software you are likely doing if you're reading about SYCL and OneAPI).

We are going to take a look at some of the more *technical* aspects of software engineering: testing, documentation, version control, security/privacy (by discouraging unsafe practices, e.g. explicit pointer usage), and professionalism/ethics. As scientific computing is something used to drive scientific progress, we need to write software that users can trust ("trust science"), which results, in part, from taking all possible steps to ensure reliability and reproducibility.


Testing
--------

The main value proposition of `automated unit testing <https://en.wikipedia.org/wiki/Test-driven_development>`_ is that it encourages frequent regression testing by making it painless.
During the last two decades, this “test-infected” mindset has gradually entered the mainstream including introductory computer science courses.
We argue that it can benefit and integrate seamlessly with HPC education.

Support for unit testing in C/C++ has improved considerably, and we prefer `GoogleTest <https://google.github.io/googletest/>`_ for this purpose.
A typical floating-point correctness test looks like this:

.. literalinclude:: ../snippets/snip-UnoAPI-integration-test-simple3.tex
  :language: cpp
  :linenos:
  :lineno-start: 36
  :lines: 3-5

	  
Build and Configuration Management
----------------------------------

A key portability challenge results from differences across users’ development and production environments, such as different versions of operating systems, compilers, libraries, and other tools.
Among several efforts to abstract away these differences and support building a project on any environment meeting certain minimum criteria, (modern) `CMake <https://cmake.org>`_ has emerged as the most painless choice, especially for C/C++-based projects.

CMake enables us to use C/C++ similar to other languages, such as Java, Scala, Python, JavaScript/Node, by managing external library dependencies declaratively and fetching them dynamically.
This encourages parametric thinking and makes it possible to develop adaptable HPC codes.

The following settings consistently ensure a specific language standard:

.. literalinclude:: ../snippets/snip-UnoAPI-CMakeLists-language-settings.tex
  :language: cmake
  :linenos:
  :lineno-start: 10
  :lines: 3-5

This section is an example of declaring an external dependency that gets included into the build process at source level.

.. literalinclude:: ../snippets/snip-UnoAPI-CMakeLists-fetchcontent.tex 
  :language: cmake
  :linenos:
  :lineno-start: 18
  :lines: 3-8

The external dependencies declared in this way then become available for linking into the executable(s).

.. literalinclude:: ../snippets/snip-UnoAPI-CMakeLists-targetlibraries.tex
  :language: cmake
  :linenos:
  :lineno-start: 1
  :lines: 3-8

   
Version Control
----------------

Version control, especially distributed, hosted services such as GitHub, GitLab, and Bitbucket, are one of the foundations of modern software engineering practice.
Version control allows a development team to keep their code in a secure place and enables collaboration following numerous different models and cultures.

.. todo:: expand to include various subtopics


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
In addition, build automation results in almost immediate feedback on an incorrect commit that “breaks the build” (see also `the actual script <https://github.com/LoyolaChicagoCode/unoapi-dpcpp-examples/blob/main/.github/workflows/oneapi-cmake.yml>`_).

We argue that continuous integration can make us reproducibility-aware: A researcher wishing to reproduce the work represented by a particular project can “fork” the project into their own account on, say, GitHub.
The CI workflow then runs on that user’s fork of the project.
This gives us some degree of reproducibility “for free,” subject to limitations in devices available through the actual CI container (i.e., not usually accelerators).


Automated Testing
-----------------

Automated testing usually takes place as part of continuous integration.  Indeed, the last section of the CI workflow shown above invokes all discovered executable tests.


Rootless Package Management for Libraries and Tools
---------------------------------------------------

On publicly accessible HPC clusters, such as Intel’s DevCloud and those run by some national laboratories, users don’t typically have root access (administrative privileges).
This precludes them from using native package management, such as ``apt`` on Ubuntu, to install missing packages or newer versions of outdated packages.

During the last decade or so, userland package management tools have emerged as a complement to native package management.
These tools, such as Homebrew on MacOS and Linux and Chocolatey on Windows, allow users to install additional packages for their personal use without requiring root access, e.g., a current version of CMake.



Documentation
--------------


Security/Privacy
------------------

Professionalism/Ethics
-----------------------

For More Information
----------------------

- SWEBOK
- ACM Ethics/Code of Conduct
- IEEE Ethics/Code of Conduct





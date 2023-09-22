Compiling and Running oneAPI programs
=======================================

Our examples are CMake-based \CPP projects along with unit tests in source form.
They are publicly available as a GitHub repository under the Apache 2.0 open-source license at `github.com/LoyolaChicagoCode/unoapi-dpcpp-examples <https://github.com/LoyolaChicagoCode/unoapi-dpcpp-examples>`__.

The examples include a README file with instructions for building and running on Debian-based Linux systems (including Ubuntu), as well as the scripts needed to run the experiments described in this paper.


Running the example on GitHub as a fork of the original repo (browser-based)
----------------------------------------------------------------------------

The repository is configured with continuous integration (CI) using the following GitHub Actions workflow:

.. literalinclude:: ../snippets/snip-UnoAPI-github-workflow.tex
  :language: bash
  :linenos: 
  :lineno-start: 19
  :lines: 3-28

It relies on this prerequisite installation script, which one can also invoke manually on a local workstation:

.. literalinclude:: ../snippets/snip-UnoAPI-install-dpcpp.tex
  :language: bash
  :linenos: 
  :lineno-start: 5
  :lines: 3-17

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


Running the examples on the Intel DevCloud
------------------------------------------

This option requires a (free) account on Intel’s DevCloud for working with oneAPI and provides access to various types of accelerators, such as GPUs based on the gen9 architecture we’ve used for the sample runs shown above; it thereby provides the highest degree of reproducibility.
 Once access to DevCloud has been established, the specific steps are documented in the top-level README file in the GitHub repository.
The artifact’s main executable is self-documenting using the ``-h`` or ``–help`` CLI option.


Running the examples in Gitpod
------------------------------

.. todo:: todo

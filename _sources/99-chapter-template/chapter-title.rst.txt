Chapter Title
=================

This chapter is not part of the book. It is an example for a minimum viable chapter and, for now, provides the documentation on how to add your own chapter. You may also open an issue on the issue tracker to suggest a chapter (with title), and the maintainer (George) will be happy to add it for you.

In this book, we organize each chapter into a folder. This way, the chapter can maintain its own figures and any input/include sectioning. We recommend starting with a chapter and not organizing into separate files until it is absolutely necessary.

I'm working on polished instructions but here is the basic idea:

- Each chapter folder begins with a number (just to keep it in order when listing the directory). For example, the first chapter is `00-preliminaries`. The actual reStructuredText file for the chapter is `00-preliminaries/prelimnaries.rst`. 

- To make a chapter part of the book, you need to edit the `index.rst` file at the top level and make sure the new chapter's relative path and entry point (the main chapter file) are linked to it.

- For example, this chapter `99-chapter-template/chapter-title` is the very last entry in the `index.rst` file.

- The folder and filename should be named nicely, since they do show up in the navigation when generating the HTML version of the book. You can get a sense of good naming by looking at the other chapter folders.

- In general, I recommend that each person working on a topic related to the book just start with a new chapter. That way, you can work and not have to worry about stepping on others toes and having merge conflicts, etc.

- All contributions to this book do need to follow the contribution guidelines. In general, your first pull request should be for a chapter folder and file. Then you can start working on your own fork and issuing pull requests for us to absorb your new chapter content.

- When it comes to including source code in your chapter, this also needs to be handled by opening an issue so we can include your source code as a submodule. Submodules are a bit tricky and we will be centralizing that aspect of the project by using issue tracking and working with the maintainer (George) to ensure it is properly integrated into the book.

Testing of Screencasts from Asciinema
--------------------------------------

.. only:: html

   .. image:: install.gif
      :alt: Install Demo
      :align: center


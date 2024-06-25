Contribution Guildelines
==========================

.. note:: This is still in draft status.


ORCID
------

Our group is primarily focused on academic instituions and research laboratories (academic, industry, or government).
Although we we weclome all participation, we will not accept contributions from anyone without an ORCID. See https://orcid.org.
We ask for an ORCID since we track all significant scholarly and coding contributions that are included in this work and strive to include everyone who contributes.


Open Source Code
-----------------

.. note:: We are still working to determine a list of approved licenses.

All code must be made available via an approved open source license.


Open Source/Creative Commons Writing
--------------------------------------

To be considered an author of the book, you *must* be willing to make your written work available under Creative Commons licensing.
You must be associated with at least one content-related request (e.g. a book chapter or major section of the book).
We will not accept any pull requests from anyone who does not consent to these terms.


Ethical AI / Ethical Contributions
------------------------------------

If you use generative AI, it is permitted. You must disclose that you used it, even if for the most trivial aspects of your coding or writing.
Please include a *transcript* (world read-only) link showing your prompt "thought process" if generative AI played a major role in your contribution.
Open AI (and others) provide a mechamism for sharing your prompts and responses. You may also organize your transcript into a document (Markdown) and create a Figshare artifact that includes the Markdown and a rendered version in PDF (via Pandoc).


Co-Authorship
--------------

We are a highly inclusive group that is not focused on the number of contributors and/or the size of any individual contribution.
However, we will use the ACM and/or IEEE guidelines for co-authorship.

Konstantin and George are the lead authors and also serve as editors in chief (EICs). Remaining authors are listed in alphabetical order.

Regardless of author order, every author is greatly valued and will share in the scholarly credit.

Given the dynamic nature of this work, authors are officially recognized whenever new versions of the book are released.

We will be using a service like Zenodo to make snapshots of the work available and take all new authors into account.

New Topics
------------

As all of us know from writing, we always have a *better* idea of how to do something. That is what keeps the academy/field moving forward. If this is is your story, please open an issue on the GitHub issue tracker for your new topic and/or example. Include the following:

- Chapter title
- Rationale for inclusion in the book
- URL to repository containing your source code (work in progress).
- Clear statement as to what level of CS, Math, or other specific scienes

When in Doubt
--------------

We may ask you to seek additional clarification from yourself or your employer about whether you can participate.
If you see any potential impediments to your participation, we suggest that you not participate.

Lastly, you are prohibited from including any proprietary content without first contacting your employer.

Reproducibility
----------------

Any contributions of code or text are expected to last the test of time. Especially when it comes to code, your co-authorship is contingent upon making your source available in perpetuity. We will mirror any source code included as a *git submodule* in our project.

Software Engineering Standards
-------------------------------

Similar to many open source projects, we have our standards that we follow by example.
We expect any contributions to have the following "goodness" from CS/Software Engineering:

- proper build script using **cmake**. We do not embrace **make**. It had a good run, but modern systems such as **cmake** and **bazel** are well on their way to displacing *ad hoc* make-centered projects and embrace clear/concise declarative thinking.

- no matter how big or small, any submodule linked to our book must use continuous integration or compile cleanly. We strongly recommend GitHub Actions but will consider other well-maintained solutions. Our main book and example repos all use GitHub Actions.

- Testing is vital. While we personally use unit/property tests, any development workflow that has a separate testing phase (run in gitHub Actions) is considered valid.

- Documentation: If writing is unimportant to you, you do not want to work with us. We ascribe to literate programming principles. A well-crafted README and clear attention to good naming practices and modular thinking goes a long way toward meeting this requirement.


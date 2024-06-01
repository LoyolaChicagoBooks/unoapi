Contribution Guildelines
==========================

.. todo:: Konstantin is going to work on drafting the contribution guidelines. None of this is official but is a starting point. All of the following are draft ideas and are subsequent to a full rewrite until further notice.

ORCID
------

Our group is primarily focused on academic instituions and research laboratories (academic, industry, or government).
Although we we weclome all participation, we will not accept contributions from anyone without an ORCID. See https://orcid.org.

Open Source Code
-----------------

All code must be made available via an approved open source license. 

Open Source/Creative Commons Writing
--------------------------------------

To be considered an author of the book, you *must* be willing to make your work available under Creative Commons licensing.
We will not accept any pull requests from anyone who does not consent to these terms.


Ethical AI / Ethical Contributions
------------------------------------

If you use generative AI, it is permitted. You must disclose that you used it, even if for the most trivial aspects of your coding or writing.
Please include a *transcript* (world read-only) link if generative AI played a major role in your contribution. Open AI (and others) provide a mechamism for sharing your prompts and responses.


Co-Authorship
--------------

We are a highly inclusive group that is not focused on the number of contributors and/or the size of any individual contribution.
However, we will use the ACM and/or IEEE guidelines for co-authorship.

Konstantin and George are the lead authors and also serve as editors in chief (EICs). Remaining authors are listed in alphabetical order.

Regardless of author order, every author is greatly valued.

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

- proper build files using **cmake**. We do not embrace **make**. It had a good run, but modern systems such as **cmake* and **bazel** are well on their way to displacing *ad hoc* make-centered projects.

- no matter how big or small, any submodule linked to our book must use continuous integration. We strongly recommend GitHub Actions but will consider other well-maintained solutions. Our main book and example repos all use GitHub Actions

- Testing is vital. While we personally use unit/property tests, any development workflow that has a separate testing phase (run in gitHub Actions) is considered valid.

- documentation: If writing is unimportant to you, you do not want to work with us. We ascribe to literate programming principles. 



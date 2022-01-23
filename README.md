# About UnoAPI

[![GitHub Pages and Release PDF](https://github.com/LoyolaChicagoBooks/unoapi/actions/workflows/main.yml/badge.svg)](https://github.com/LoyolaChicagoBooks/unoapi/actions/workflows/main.yml)

This book deploys on all *successful* commits to https://unoapi.cs.luc.edu/. See this site for additional details.

You can also get PDF from the [Releases](https://github.com/LoyolaChicagoBooks/unoapi/releases) tab on this page.

# Getting Started

- Start by setting up a virtual environment using `python3 -m venv env-name`

- source env-name/bin/activate

- Run `pip install -r requirements.txt`

- If you want PDF output, install texlive.

- Clone using `git clone --recurse-submodules --depth 1 git@github.com:<org-or-user>/unoapi.git`

- `make html` or `make latexpdf`

# Submodule considerations

In our project, the intent is that you will be largely read-only on submodules as you likely have a checked out folder somewhere for each submodule.
Submodules are anchored at a specific commit. But you can always update to the latest branch/commit.

If you cloned without `--recurse-submodules`:

- git submodule update --init --recursive

If you want to update:

- git pull --recurse-submodules

If you want to run a git command on every submodule:

- git submodule foreach 'git remote -v'

To add more submodules:

git submodule add [URL to Git repo] 
git submodule init 

To add a submodule but use a specific branch (sometimes necesssary for `master` vs. `main`)
git submodule add -b master [URL to Git repo]
git submodule init kko


To ensure the latest commit is being used for a submodule:

git add [submodule directory]
git commit -m "move submodule to latest commit in master"



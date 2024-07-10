## Table of Contents
- [Project Requirements](#project-requirements)
- [Pre-requisites](#pre-requisites)
- [Installation](#installation)

<a name="project-requirements"/>

## Project Requirements

#### Summary

You are tasked with developing an inventory and checkout system for a library. 
* It should include a front-facing interface for members to search for resources, view their availability.
* Allow library employees to manage inventory and process checkouts and returns. 
* Event scheduling system for events the library is running.
* Members should be able to view these events when interacting with the system. 
* While this system is not required to be developed to be accessed via the web, it must be able to be run on multiple different machines while accessing a central database (you will run a database locally for testing and development, but it should function as if you were connecting to a database on a central server). 

#### Course Specifications
* Implements User Authentication
* Implements a dynmaic database of user and item data
* Implements on or more "operations" involving some form of frontend-backend-database communication

#### Course Expectations
* Databases can use any existing dataset or have dummy data
    * Databases using datasets should have at least 100 items.
* New User creation/registration should be available
* UI design should contain elements commonly found in real-world library websites including: 
    * User profile
    * Login
    * Logout
* Consideration for design aesthetics
* System should be dynamic and responsive


<a name="pre-requisites"/>

## Pre-Requisites

### Linux
We will install node through nvm

1. The following will grab the latest installation script for nvm at the time of writing. 
    * _Make sure to audit the script before piping into bash_
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

2. Ensure that the following block was appended to the `~/.bashrc` file
``` 
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```
by running the following:
```bash
tail ~/.bashrc
```

3. The following command lists available version of Node, which you may use to determine which version is suitable
    * We will install version 22.3.0
```bash
nvm list-remote
```

4. Install a suitable Node version, 22.3.0 in our case
```bash
nvm install v22.3.0
```
5. List the installed version of Node with the following:
```bash
nvm list
```
6. Specify which of the version from the previous output we wish our system to use
```bash
nvm use v22.3.0
```

* _By: [Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04#prerequisites)_

### Windows
### MacOS


<a name="installation"/>

## Installation
1. Clone the repository and move into the project's directory.
```bash
git clone https://github.com/anduytran/LibManage.git

cd LibManage/
```
2. Install the necessary npm packages.
```bash
npm install
```
3. Initialize the website.
```bash
nodemon app.js
```
4. Navigate to `localhost:8000` on your browser to see the website. 

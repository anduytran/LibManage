
## Table of Contents
- [Project Requirements](#project-requirements)
- [Pre-requisites](#pre-requisites)
- [Installation](#installation)

<a name="project-requirements">

# Project Requirements

</a>

## Summary

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


<a name="pre-requisites">

# Pre-Requisites

</a>

## Linux

### Node.js

* _By: [Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04#prerequisites)_


### MongoDB
* _By: [Mongo Docs](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#std-label-install-mdb-community-ubuntu)_

### MongoDB Compass
* _By: [Mongo Docs](https://www.mongodb.com/docs/compass/current/install/)_

## Windows

### Node.js

* _By: [Node](https://nodejs.org/en/download/prebuilt-installer)_

### MongoDB & MongoDB Compass
* _By: [Mongo Docs](https://www.mongodb.com/try/download/community)._ 
* Both of these tools can be installed from the same installer that MongoDB provides 

## MacOS

### Node.js

* _By: [Node](https://nodejs.org/en/download/prebuilt-installer)_

### MongoDB

* _By: [Mongo Docs](https://www.mongodb.com/try/download/community)_

### MongoDB Compass
* _By: [Mongo Docs](https://www.mongodb.com/try/download/compass)_

## Populating the Database
Use the provided [script](./book_data_generator.py) to create dummy data for books.



<a name="installation">

## Installation 

</a>

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

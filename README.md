# ABC Book Club App

<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/perugoal1/disease-analyzer-webapp">
    <img src="images/logo.jpg" alt="Logo" width="80" height="80" style="border-radius:50%">
  </a>

  <h3 align="center">ABC Book Club App</h3>

  <p align="center">
    App to help manage a Book Club
    <br />
  </p>

  ---

  [![Frontend Deployment](https://github.com/perugoal1/BookClubApp/actions/workflows/frontend-lint-prettier-check.yaml/badge.svg?branch=master)](https://github.com/perugoal1/BookClubApp/actions/workflows/frontend-lint-prettier-check.yaml) &nbsp; [![Backnd Deployment](https://github.com/perugoal1/BookClubApp/actions/workflows/backend-lint-prettier-check.yaml/badge.svg?branch=master)](https://github.com/perugoal1/BookClubApp/actions/workflows/backend-lint-prettier-check.yaml)
  
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#development-setup">Development Setup</a></li>
        <li><a href="#steps-to-run-production-build-locally">Steps to run production build locally</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

![Screen Shot][screenshot]

A web console for easier management of book fan club, allowing its members to borrow books from the club.


<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

List of frameworks/libraries used in the project.

* [React.js](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [Recharts](https://recharts.org/en-US)
* [Nodejs](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Docker](https://www.docker.com/)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

Below are the instructions on setting up the project locally.

### Prerequisites

Following software is required to run the project.
* Docker - docker is suffient to run and do development on the project.
  Installation Reference: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)


### Development and Prod Setup

Run the below commands to start local dev server

1. Clone the repo
   ```sh
   git clone https://github.com/perugoal1/BookClubApp.git
   ```
2. Run following Docker compose command to start frontend and backend for development

   All the services are listed in `docker-compose.yml`.
   ```sh
   docker-compose up
   ```

3. Run following Docker compose command to run frontend and backend similar to production setup

   All the services are listed in `docker-compose-prod.yml`.
   ```sh
   docker-compose -f docker-compose-prod.yml up --build
   ```

3. To build images of frontend and backend use the following command

   For Frontend: All the services are listed in `./frontend/Dockerfile`.
   ```sh
   cd frontend && docker build -t bookAppFrontend .
   ```

   For Backend: All the services are listed in `./backend/Dockerfile`.
   ```sh
   cd backend && docker build -t bookAppBackend .
   ```
<p align="right">(<a href="#top">back to top</a>)</p>

## Design and Development Explanation

### Front-End

####  Set up and design the Redux store

The redux has been setup with 3 reducers
- Auth reducer to handle authentication, login and logout.
- Book reducer to handle CRUD and return and borrow of books
- User reducer to handle CRUD and approval of user.

####  Project file structure
![fe-filestucture][fe-filestucture]

####  Code implementation

Below is the design of pages and the respective components inside them, with differnet workflows.
![fe-component-design][fe-component-design]

The screenshots of the pages are below
![fe1][fe1]
![fe2][fe2]




####  Scalability of the project
- The project can easily be scaled in terms of both code development and deployment
- The client side data is store in Redux store, which helps us store the data in a modulae way and enable us to easily share data across components.
- Linting and prettier tools have been integrated within the project, which helps in maintaining proper coding standards when the application grows and scales.
- Also the frontend app is containerised and built as as image. It will help us to deploy them as containers which have the ablity to scale easily.

<p align="right">(<a href="#top">back to top</a>)</p>

### Back-End

####  Project file structure
![be-filestucture][be-filestucture]

#### API design

The detailed explanantion of the API is mentioned below

Auth APIs
- /auth/login (POST)- Used for User login and session start 
- /auth/logout (POST)- Used for User logout and session end 

Book APIs
- /book/:id (GET) - Used to get book details based on ID
- /book/create (POST) - Used to add new Book to Database, mutiple copies of the book also can be created.
- /book/getAllBooks (POST) - Used list of all books or list of books based on search text
- /book/:id/update (POST) - Used to update a particular book based on ID.
- /book/:id/delete (DELETE) - Used to delete a particular book based on ID.
- /book/:id/borrow (POST) - Used by user to borrow a book
- /book/:id/borrow (POST) - Used by user to return a book

User APIs
- /user/:id (GET) - Used to get user details based on ID
- /user/create (POST) - Used to add new user to Database.
- /user/getAllUsers (POST) - Used list of all users or list of users based on search text
- /user/:id/update (POST) - Used to update a particular user based on ID.
- /user/:id/delete (DELETE) - Used to delete a particular user based on ID.
- /user/getApprovalDetails/:id (GET) - Used to get user details from a separate makerchecker table for approval
- /user/getApprovalList (POST) - Used to get list of all users from a separate makerchecker table for approval
- /user/:id/approveUser (POST) - Used by admin to approve a particular user.

Analytics APIs
- /analytics/genre (GET) - Used to get details of breakdown of books by genre by aggregation
- /analytics/published-year (GET) - Used to get details of breakdown of books by published year by aggregation


#### The code implementation

To implement the funtionalities 3 collections have been created - (users, books, makerChecker)

<b>User Collection</b> <br/>
It hold all the user data documents. Below is the schema.
![user-schema][user-schema]

<b>Book Collection</b>  <br/>
It hold all the book data documents. Below is the schema.
![book-schema][book-schema]

<b>Maker Checker Collection</b>  <br/>
It hold all the user data documents, that are waiting for approval from another admin. Once approved, the data get transferred to Users Collection. Below is the schema.
![maker-checker-schema][maker-checker-schema]

####  Scalability of the project
- The project can easily be scaled in terms of both code development and deployment
- Linting and prettier tools have been integrated within the project, which helps in maintaining proper coding standards when the application grows and scales.
- Backend app is containerised and built as as image. It will help us to deploy them as containers which have the ablity to scale easily.
- Also mongodb database comes with the ablility of horizontal scaling / sharding, which helps.
- Nodejs also helps in scaling. The thread does not cause a bottleneck because all I/O is evented and asynchronous and can handle huge concurrent load.

<p align="right">(<a href="#top">back to top</a>)</p>

## Features Implemented

- [x] Authentication for user and session handling.
- [x] Used Data grid to show data which also supports sorting, pagination and filtering
- [X] User Management
    - Lists all the users
    - Allows Admin to add/remove/update users
- [X] Book Management
    - Lists all the books
    - Allows Admin and Editor to add/remove/update books
    - Allows all users to borrow/return books
- [X] Analytics to view breakdown of books by genre and reakdown of books by year 
- [X] Responsive web app
- [x] Single page App with React routing.
- [x] Custom hooks for handling auth data, session and RBAC of web pages.
- [X] Implemented a maker checker rule for adding, removing and updating users, to be approved by another admin.
- [X] Implemented CI pipleine using github actions that check code quality using lint and prettier, when the code in pushed to the githb repo.
- [X] Setup test data in './database/mongo-init.js' for development purpose.

<p align="right">(<a href="#top">back to top</a>)</p>

## Improvements Needed
The following improvements need to be made to fix minor issues

- Handle edge cases
- Have more robust validation
- Make UI more appealing
- Use typescript through-out the app. Now its used only sparingly. Need to improve on this.







<!-- MARKDOWN LINKS & IMAGES -->
[screenshot]: images/screenshot.png
[fe-filestucture]: images/fe-filestucture.png
[fe-component-design]: images/fe-component-design.png
[fe1]: images/fe1.png
[fe2]: images/fe2.png
[be-filestucture]: images/be-filestucture.png
[user-schema]: images/user-schema.png
[book-schema]: images/book-schema.png
[maker-checker-schema]: images/maker-checker-schema.png
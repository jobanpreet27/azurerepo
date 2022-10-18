# EF_Back
Curated back end services

# Get Started:
1. <strong>npm install</strong> to install all node_modules needed
2. Add the .env file in the base directory
3. <strong>nodemon</strong> to run the server
4. API Url: http://localhost:5200/api/
<h5> For account features: </h5>

- To create a new user: POST http://localhost:5200/api/users/create with user's username and password
- To read a user: GET http://localhost:5200/api/users/:userid
- To authenticate a user when logging: POST http://localhost:5200/api/users/authenticate with user's username and password

# Tachnologies:
- MongoDB, Express, Node.js, TypeScipt
- chalk@4.1.2 - library for adding color to the console for logging
- joi - for data validation
- lodash - for dealing with arrays, objects, strings etc
- bcrypt - to encrpt the password of a user
- Passport - an authentication middleware for Node.js
- JWT - to secure RESTful endpoints without sessions

# Branch rules:
1. Personal branches:
- Naming convention: Feature-Firstname, for example AuthenticationAPI-Aria
- get features done in personal branches
2. dev branch:
- pull request to the dev branch once the feature is completed and tested
- get approval by two developers before merging
3. main branch:
- pull request from dev to the main branch once each iteration is done and tested
- get approval by two of the leads before merging


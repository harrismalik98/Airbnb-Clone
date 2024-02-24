# Airbnb Clone

This is a clone of the Airbnb web application built using MERN stack. It is a full-stack web application that allows users to book accommodations in various locations. This application supports user registration, login and authentication.

![app](https://github.com/harrismalik98/Airbnb-Clone/assets/113388505/e91c2400-e895-462e-b742-489e848cc9a6)

## Installation

To install and run the application, please follow these steps:

- Clone the repository to your machine.
- Navigate to the project root folder in your terminal.
- Inside the `client` folder, run `npm install` to install client-side dependencies.
- Start the client-side with `npm start`.
- Inside the `server` folder, run `npm install` to install server-side dependencies.
- Start the server-side using `nodemon app.js`.
- You can choose to work with either MongoDB Atlas or your locally installed MongoDB.
- Create a .env file in the `client` and `server` folder of your project and add the following variables:


## Client env variables

##### REACT_APP_API_BASE_URL=

- `REACT_APP_API_BASE_URL`: Base URL of your backend server.

## Server env variables

##### MONGODB_URL=
##### JWT_SECRET=
##### CLIENT_BASE_URL=

- `MONGODB_URL`: The URL of your MongoDB database.
- `JWT_SECRET`: Secret key for JWT token generation.
- `CLIENT_BASE_URL`: Base URL of your frontend server.

## Features

The application has following features:

- User authentication and authorization.
- View accommodation details and pricing.
- Book an accommodation by selecting check-in and check-out dates.
- View and manage bookings as a registered user.
- Add and manage accommodations as a registered user.

## Dependencies

This project uses the following dependencies:

- MongoDB - NoSQL database used to store application data.
- Express - Node.js framework used to build the server-side of the application.
- React - JavaScript library used to build the client-side of the application.
- Node.js - JavaScript runtime used to execute server-side code.
- Mongoose - Object Data Modeling (ODM) library used to interface with MongoDB.
- React Router - Declarative routing library for React applications.
- Axios - Promise based HTTP client for making API requests from the client-side.
- Tailwind CSS - Used for styling the application.

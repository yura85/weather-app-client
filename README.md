# Weather App Capstone Project

Welcome to the weather app. It is a simple app that allows you to check the weather in any location and also create a list of favorite cities.

## Screnshot

![WeatherApp](https://imgur.com/wmRgpv8.png)

## Technologies Used

* HTML5
* Bootstrap
* React
* Axios
* Express
* MongoDB
* Mongoose
* Heroku

## Installation Instructions

### Front End Installation
1) Fork and Clone this repository.
2) Install dependencies with npm install.
3) Run the development server with npm start.

## Back End Instalation
1) Fork and Clone this repository.
2) Install dependencies with npm install.
3) Run the development server with nmp run server

## Planning

For the capstone project we have option to choose our own prefered tech stack to implement our app. I chose to use Express for the backend and React for the front end.

On the first day, I set up front and backend repositories. Then I concentrated to meet MVP.

### Planned Schedule

#### Day 1:
- Back-end setup
- CRUD actions
- Auth actions

#### Day 2:
- Front-end setup

#### Day 3:
- Third party API setup(Openweathermap)

#### Day 4:
- Design
- README
- Bugs/troubleshooting

### ERD
[ERD](https://imgur.com/4RiSeYc)

### Wireframe
[Wireframe](https://imgur.com/A9yUF9l)

### User Stories

#### Authorization Features:
1. As an unregistered user, I would like to sign up with an email and password.
2. As a registered user, I would like to sign in with an email and password.
3. As a signed in user, I would like to change the password.
4. As a signed in user, I would like to sign out.

#### Main Features:
5. As an unregistered user, I would like to see the weather in my current location.
6. As a signed in user, I would like to add and remove cities from my favorite city list.
7. As a signed in user, I would like to check the weather in any place.
8. As a signed in user, I would like to check the weather in my favorite cities(stretch goal).


- POST /sign-up users#signup
- POST /sign-in users#signin
- DELETE /sign-out users#sign-out
- PATCH /change-password users#changepw
- GET /cities #index
- GET /cities/:id #show
- POST /city cities#create
- PATCH /cities/:id cities#update
- DELETE /cities/:id cities#destroy

## Challenges

### Connecting Openweathermap API
This feature was because it was hard to get correct data from the response.

### Working with React Components

## Future improvements:
* Work on styling
* Add feature to check the weather in city list
* Add google map API to be able to get the weather in the current location

## Try it out!

### [You can visit the deployed app](https://yura85.github.io/weather-app-client/)
Please do not use real emails and passwords, it is not safe.
Please use the valid city and country names when checking for the weather.

### [The deployed Heroku database](https://dry-badlands-54670.herokuapp.com/)

### [Check out our back-end repo here](https://github.com/yura85/weather-app-api)

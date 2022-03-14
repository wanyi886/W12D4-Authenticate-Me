
## Description

This is a clone of [eventbrite](https://www.eventbrite.com/). EventLight is a website allows you to host events, and register events host by other people. Light your life by these events!


## Table of Contents
  - [MVP Feature List](#Features)
  - [Database Schema](#Database-Schema )
  - [API Documentation](#API-Documentation)
  - [Frontend Routes](#Frontend-Routes)

## Link to live site

Hosted on Heroku: [eventLight](https://event-light.herokuapp.com/)

## Technologies

eventLight was built using the following technologies:
<br>
<br>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" style="width:75px;" />
<img src="https://raw.githubusercontent.com/reactjs/reactjs.org/main/src/icons/logo.svg" style="width:75px;">
<img src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png" style="width:75px;">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-plain-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-plain-wordmark.svg" style="width:75px;" />


## Getting started

1. Clone this repo.
-- `gh repo clone wanyi886/W16-solo-project-eventLight`

2. Install dependencies from the root directory.
-- `npm install`

3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL.
-- `CREATE USER <name> WITH CREATEDB PASSWORD <'password'>`

4. Create a .env file in the backend directory based on the .env.example found within the respectice directory.
5. Enter your username and password information into your .env file along with your desired database name, a secured combination of characters for your JWT_SECRET, and your desired PORT (preferably 5000).
6.  Add the following proxy to your package.json file within your frontend directory, replacing or keeping the 5000 port to match your PORT configuration found in your .env file.
--`"proxy": "http://localhost:5000"`
7. Create Database, Migrate, and Seed models.
--`npx dotenv sequelize db:create`
--`npx dotenv sequelize db:migrate`
--`npx dotenv sequelize db:seed:all`
8. Start the serveices in the backend directory.
--`npm start`
9. Start the services in the frontend directory, which should open the project in your default browser. If not, navigate to http://localhost:3000.
--`npm start`
10. You can use the Demo user or create an account to begin using eventLight.



## Features
### Logged in users can do:
- View/ Create/ Edit/ Delete events
- Register events
- View your tickets/ registrations of events
- Cancel registrations of events

### Logged out users can do:
- View all the events

Hosted on Heroku: [eventLight](https://event-light.herokuapp.com/)

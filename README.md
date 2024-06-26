# MitchTV

Hello ABN Amro, welcome to MitchTV!<br>
It's a tv-show dashboard inspired by familiar streaming services :)

## Short overview

This project consists of a NodeJS backend server and a frontend built with Vue. Because of TVmaze endpoint limitations, the choice has been made to build a local (json) database in order to categorize the shows by genre.

## NPM

The project has been created using `npm v10.7.0`

# Backend

The backend technically consists of two servers:

- The **build-db** server is a one-time server used to build the local database. It fetches all the shows from the TVmaze shows-by-index endpoint and stores them across categorized files. This is a one time thing and it closes after it has done this.
- The **endpoints** server is used by the frontend to consume the data stored in those json files. This one has pagination functionality: it serves data in pages of 100 items.

### First-time backend

The one-time steps to get started with the MitchTV backend are as follows:

1. Navigate to the server folder
2. Install the dependencies in that folder
3. Build the local (json) database using the build-db server

These 3 steps can be executed by

```
cd server
npm install
npm run build-db
```

The build-db server will close automatically once done, the terminal will give feedback on this.<br>
The data folder in the server directory now contains json files filled with shows by category.<br>
Time to start the endpoints to serve these!

### Start backend

To start the endpoints server type `npm start` in the server directory

### Backend run tests

To run unit tests for the backend type `npm test`

### Dependencies

The backend uses `NodeJS v21.7.1` with `express`<br>
`typescript ^5.4.5` is used to turn NodeJS into NodeTS<br>
For testing, the backend uses `jest` and `t-jest` for typescript parsing<br>
For handling cross-origin requests the `cors` package is used

# Frontend

The frontend consists of four pages

- **Home** page with an overview of 10 shows per genre
- **Genre** page with a list of all shows of that specific genre. This page has an infinite scroll and uses pagination
- **Detail** page which shows more information about a specific show
- **Search** page which shows the search results

On top of the website sits a **header** which contains a home button, **search bar** and **genre selection dropdown**. A custom directive is written to handle clicks outside in order to close the dropdown. The header has a fixed position and will always be visible. It has a different layout depending on the size of the screen.

Speaking of which: the whole website is responsive and mobile-friendly. Shows are displayed in modular card components which are housed in a grid-system. Other visual elements are adjusted accordingly depending on screen-size as well.

There are many more things to discover, let's get that frontend running!

### First-time frontend

To get started with the MitchTV frontend it's important that all dependencies are installed. This is a one-time process. With the backend server running, open a new terminal in your IDE and type the following in the root directory of the project:

```
npm install
```

Once the dependencies are installed it's time to get to the good part:

### Start frontend

To start the frontend type `npm run dev` in the root directory<br>
Open your browser and go to `http://localhost:5173/`

### Frontend run tests

To run units tests for the frontend type `npm test`

### Dependencies

To serve icons across the website a free version of `font awesome` is included<br>
The standard Vue testing package `vitest` is used to create the unit-tests<br>
The frontend uses `pinia` for state management, this allows for better scalability and prevents prop drilling<br>
The `axios` package is used to handle api calls: for its backwards compatibility, json parsing and unified response

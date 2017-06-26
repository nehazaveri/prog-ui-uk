# admin-ui
Admin Web App

## Introduction


## Tools Used

 - **React** for building user interface
 - **Babel** as JavaScript compiler for generating ES2015 to ES5
 - **Redux** library for unidirectional dataflow architecture
    (read more here http://redux.js.org/ )
 - **Fetch** A window.fetch JavaScript polyfill  http://github.github.io/fetch/
  for creating api calls



## Environment Setup

 - Install **Node.js** on your computer and **npm** package manager.
 https://nodejs.org/en/download/

 - Run all npm module packages
  ``npm install`` should install all packages.

 - There is few main tasks for building the application
    `start`, `dev`, `prod` and `test`

  - Run `npm dev` should build the application and create all needed files inside build folder

  - Run `npm prod` should build the application and create all needed files inside build folder for prod env.

  - Run `npm start` should start the server and watches for any changes(js, rt and sass), also run tests.

  - Run `npm test` builds the test environment, create and bundle all files needed to run test and run test locally

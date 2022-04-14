# StudyKit

* This is our website made with HTML, CSS, JS { Using NodeJs and Express in a monngo Database }
* Currently this website is being hosted on heroku in the name of [StudyKitsk](https://studykitsk.herokuapp.com/)

## How To set on your local machine

In **app.js**

* set `const dbUrl = 'mongodb://localhost:27017/{any name}'`
* set `const secret = {any secret key which you like}`
* set `port = {any number}`

## To run this code

* Install Nodejs
* Setup MongoDB
* Install and setup Git bash {or anyother terminal you like}
* Install VScode {or any other editor you like}

## Node Packages Required

* [ExpressJS](https://expressjs.com/)
* [mongoose](https://mongoosejs.com/)
* [ejs-mate](https://www.npmjs.com/package/ejs-mate)
* [express-sessions](https://www.npmjs.com/package/express-session).
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [connect-mongo](https://www.npmjs.com/package/connect-mongo)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [nodemon](https://www.npmjs.com/package/nodemon) {This not not compulsion but is very helpful}

## **Now you are ready to start the website**
* Run this command in your terminal `node app.js` { or if you have installed nodemon run `nodemon app.js` }

## Now to explain where is what code

* Every routes is in app.js
* views folder contains all the HTML {ejs} of different parts of the website
* utils folder contains error handling for the website
* public folder contains all the images, css and js of the different parts of the website
* model folder contains the mongoose schema for data storage

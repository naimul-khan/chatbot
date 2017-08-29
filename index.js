"use strict" //enforces usage of 'var' or 'let' when creating variables

/* below, we REQUIRE that the package dependencies are there for the below three packages */
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

// initialize our app, which will be an express application
const app = express()
// set which port our server will access...below is an if-statement which checks if our environemnt is alreaady connected to a port [process.env.PORT] or else "||" connect to port [5000]
app.set('port', (process.env.PORT || 5000))

// these below lines allow us to process our messages -- body-parser
//.urlendcoded takes the text as URL encoded data, which is how browsers tend to send data, and then exposes the resulting object on {req.body}--extended is false so it will take a value of string or array, whereas, if it were true, it would take any type.. makes the objet parsed using querystring library, instead of qs library
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) // parse text into JSON

// lets set up some routes
// that slash '/' will hide appending extra text to url, like in Google
app.get('/', function(req, res) {
    res.send("Hi, I am a chatbot")
})
// Facebook, security thing
app.get('/webhook/', function(req, res){ 
})
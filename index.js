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

let token = "EAADujaO0AlkBAJYd5Si2aWeDFrV2yVRhs7AgZAWoV4UpBLJQsO1EhBMi4fyBnJqZCxQvbZBve6KTiy9ZB2risnVXdR5TUO0fiUOGPkdfeMNtOoQhYwcY92t1z1ioEhq35cFRh03oZC8Tc7IuE5ZAt0xDTWJEhpIrWUUeF0Mak2hgZDZD"
// Facebook, security thing
app.get('/webhook/', function(req, res){ 
    if (req.query['hub.verify_token'] === "nk1493") { 
        res.send(req.query['hub.challenge'])
    }
    res.send("Wrong token")
})

app.post('/webhook/', function(req, res) {
    let messaging_events = req.body.entry[0].messaging_events
    for (let i=0; i < messaging_events.length; i++){ 
    let event = messaging_events[i]
    let sender = event.sender.id
    if (event.message && event.message.text) { 
          let text = event.message.text 
          sendText(sender, "Text echo: " + text.substring(0,100))
    }
    }
    res.sendStatus(200)
})

function sendText(sender, text){ 
    let messageData = {text: text}
    request({ 
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: {access_token, token},
        method: "POST",
        json: { 
            receipt: {id, sender}, 
            message: messageData
    }, function(error, response, body){ 
    if(error){ 
        console.log("sending error")
    } else if (response.body.error){ 
        console.log("response body error")
    }
    }
    })
}

// start the server
app.listen(app.get('port'), function(){
    console.log("running: port")
})
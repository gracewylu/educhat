/*
 Module dependencies:

 - Express
 - Http (to run Express)
 - Body parser (to parse JSON requests)
 - Underscore (because it's cool)
 - Socket.IO

 It is a common practice to name the variables after the module name.
 Ex: http is the "http" module, express is the "express" module, etc.
 The only exception is Underscore, where we use, conveniently, an
 underscore. Oh, and "socket.io" is simply called io. Seriously, the
 rest should be named after its module name.

 */

//  var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');
// var ObjectId = require('mongodb').ObjectID;
// var url = 'mongodb://ds011409.mlab.com:11409/educhat';

var express = require("express")
  , app = express()
  , http = require("http").createServer(app)
  , bodyParser = require("body-parser")
  , io = require("socket.io").listen(http)
  , _ = require("underscore")
  , mongoose = require('mongoose')
  , db = require('mongodb').Db;

mongoose.connect('mongodb://ds011409.mlab.com:11409/educhat');

//if there is an error with mongoose connection 
mongoose.connection.on('error', function(err){
  console.log("Issue connecting to database");
});
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ');
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

var participants = [];

var Chat_schema = mongoose.Schema({
  created: Date, 
  content: String, 
  username: String, 
  room: String
});

var ObjectId = mongoose.Schema.Types.ObjectId;

var Class_schema = mongoose.Schema({
  class_name: String, 
  class_id: ObjectId, 
  class_section: String, 
  department: String, 
  admin: String 
});

<<<<<<< HEAD
var Chat = mongoose.model('Message', Chat_schema);
var Class = mongoose.model('Class', Class_schema);

=======
>>>>>>> 1489e83b578e75a5e87b3f2407a080d660c05d94
/* Server config */

//Server's IP address
app.set("ipaddr", "127.0.0.1");

//Server's port number
app.set("port", 8080);

//Specify the views folder
app.set("views", __dirname + "/views");

app.set("view engine", "jade");

//Specify where the static content is
app.use(express.static("public", __dirname + "/public"));

//Tells server to support JSON requests
app.use(bodyParser.json());

/* Server routing */

//Handle route "GET /", as in "http://localhost:8080/"
app.get("/", function(request, response) {

  //Render the view called "index"
  response.render("index");

});

<<<<<<< HEAD
 function newRoom(){
      var room = $('#class').val();
      var department = $('#depo').val();
      var adminstrator = $('#admin').val();
      var pass = $('#password').val();
      $.ajax({
         url: '/newRoom', 
         type: 'POST', 
         contentType: 'application/json', 
         dataType: 'json', 
         data: JSON.stringify({
             class: room, 
             depo: department, 
             admin: adminstrator,
             password: pass
        })
      });
   }
/** ROOMS */
app.get("/room/:id", function(request,response){
  console.log(request.params.id)
  response.end();
});



//POST method to create a chat message
app.post("/message", function(request, response) {

  //The request body expects a param named "message"
  var message = request.body.message;

  //If the message is empty or wasn't sent it's a bad request
  if(_.isUndefined(message) || _.isEmpty(message.trim())) {
    return response.json(400, {error: "Message is invalid"});
  }

  //We also expect the sender's name with the message
  var name = request.body.name;

  //logs message to console for now 
  console.log("message: " + message);
  
  //Let our chatroom know there was a new message
  io.sockets.emit("incomingMessage", {message: message, name: name});

  //sending chats to database 
  var message_data = {
    created: new Date(),
    content: message, 
    username: "test", //grab the username
    room: "CS101" //grab room you're in 
  }

  var newChat = new Chat(message_data);

  console.log(newChat);
  newChat.save(function(err, savedChat){
    console.log(err);

    if(err) throw err;

    console.log(savedChat);

  });

  //Looks good, let the client know
  response.json(200, {message: "Message received"});

});

/* Socket.IO events */
// io.on("connection", function(socket){

  /*
   When a new user connects to our server, we expect an event called "newUser"
   and then we'll emit an event called "newConnection" with a list of all
   participants to all connected clients
   */
  // socket.on("newUser", function(data) {
  //   participants.push({id: data.id, name: data.name});
  //   io.sockets.emit("newConnection", {participants: participants});
  // });

  /*
   When a user changes his name, we are expecting an event called "nameChange"
   and then we'll emit an event called "nameChanged" to all participants with
   the id and new name of the user who emitted the original message
   */
  // socket.on("nameChange", function(data) {
  //   _.findWhere(participants, {id: socket.id}).name = data.name;
  //   io.sockets.emit("nameChanged", {id: data.id, name: data.name});
  // });

  /*
   When a client disconnects from the server, the event "disconnect" is automatically
   captured by the server. It will then emit an event called "userDisconnected" to
   all participants with the id of the client that disconnected
   */
//   socket.on("disconnect", function() {
//     participants = _.without(participants,_.findWhere(participants, {id: socket.id}));
//     io.sockets.emit("userDisconnected", {id: socket.id, sender:"system"});
//   });

// });

//Start the http server at port and IP defined before
http.listen(app.get("port"), app.get("ipaddr"), function() {
  console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});

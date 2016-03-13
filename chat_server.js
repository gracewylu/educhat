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

var express = require("express")
  , app = express()
  , http = require("http").createServer(app)
  , bodyParser = require("body-parser")
  , io = require("socket.io").listen(http)
  , _ = require("underscore")
  , mongoose = require('mongoose')
  , passport = require('passport');

var path = require('path');

mongoose.connect('mongodb://educhat:educhatpass@ds011409.mlab.com:11409/educhat');

var FacebookStrategy = require('passport-facebook').Strategy;

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

//var ObjectId = mongoose.Schema.Types.ObjectId;

var Class_schema = mongoose.Schema({
  class_name: String, 
  class_id: Number, 
  department: String, 
  admin: String, 
  admin_password: String 
});

var User_schema = mongoose.Schema({
  fbID: Number, 
  username: String, 
  provider: String 
});

var Chat = mongoose.model('Message', Chat_schema);
var Class = mongoose.model('Class', Class_schema);
var User = mongoose.model('User', User_schema);
/* Server config */

//Server's IP address
app.set("ipaddr", "127.0.0.1");

//Server's port number
app.set("port", 8080);

//Specify the views folder
app.set("views", __dirname + "/views");

app.set("view engine", "jade");

//Specify where the static content is
app.use(express.static(path.join( __dirname, "/public")));

//Tells server to support JSON requests
app.use(bodyParser.json());

/* Server routing */

//Handle route "GET /", as in "http://localhost:8080/"
app.get("/", function(request, response) {
  // Class.find({'class_name': 'slapmybitchup'}, function(err, classes){
  //   console.log(classes);
  // });
  Class.find().distinct('class_name', function(err, results){

  });

  //Render the view called "index"
  response.render("index");

});

//adds new room/chatroom to the database
/** ROOMS */
app.post("/room/:id", function(request,response){
  var room = request.body.room;
  var dept = request.body.dept; 
  var admin = request.body.admin; 
  var password = request.body.password;

  var class_data = {
    class_name: room,
    class_id: 3, 
    department: dept, 
    admin: admin, 
    admin_password: admin 
  }

  var newClass = new Class(class_data);

  newClass.save(function(err, savedClass){
    if(err) throw err;

  });

  response.json(200, {success: "Success!"});
});

//gets list of classes/chatrooms to list in side nav-bar
app.get("/rooms", function(request, response) {
  Class.find().distinct('class_name', function(err, results){
    response.json(200, results);
  });

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
  io.sockets.emit("incomingMessage", {name: 'Anonymous', message: message});

  //sending chats to database 
  var message_data = {
    created: new Date(),
    content: message, 
    username: "test", //grab the username
    room: "CS101" //grab room you're in 
  }

  var newChat = new Chat(message_data);

  newChat.save(function(err, savedChat){
    if(err) throw err;

  });

  //Looks good, let the client know
  response.json(200, {message: "Message received"});

});

/*** Facebook */
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new FacebookStrategy({
    clientID: '947369812024794',
    clientSecret: '404d053f28e3c0dc58ab7da91fdd5a4a',
    callbackURL: "http://localhost:8080/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({
            'fbID': profile.id 
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            //No user was found... so create a new user with values from Facebook (all the profile. stuff)
            if (!user) {
                user = new User({
                  fbID: profile.id, 
                  username: profile.displayName, 
                  provider: 'facebook'
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                //found user. Return
                return done(err, user);
            }
      });
  }
));

/*** Facebook */
app.get('/auth/facebook',
  passport.authenticate('facebook'));
 
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home. 
    console.log("Authenticated");
    res.redirect('/');
  });

//Start the http server at port and IP defined before
http.listen(app.get("port"), app.get("ipaddr"), function() {
  console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});

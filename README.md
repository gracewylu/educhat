# educhat
This is a website that lets you talk to people in your college classes specifically. You have to be enrolled in that class to talk to the other people. It's anonymous so you don't know who is saying what. All you know is that they are also in your college class. But here's the twist, if you want to privately message someone, both you and that person have to accept and then you can see who you guys really are. Uses facebook integration and a .edu email address to check if you are in that class.

This is a project for SIUE eHacks 

Developers: Michael Rhodes, Erik Verduin, Suprith Aireddy, Ichi Lee, Grace Lu 

URL: https://chatedu.herokuapp.com/

## Technology Stack
### MongoDB
### Express
Using Express Server app.js
```
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
```
### Angular.js
HTML enhanced for web apps http://angularjs.org
```
npm install angular
```
### Node.js
Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.
```
sudo npm install npm -g
```
### Socket.io
```
npm install socket.io
```
```
var io = require('socket.io')(80);
var cfg = require('./config.json');
var tw = require('node-tweet-stream')(cfg);
tw.track('socket.io');
tw.track('javascript');
tw.on('tweet', function(tweet){
  io.emit('tweet', tweet);
});
```

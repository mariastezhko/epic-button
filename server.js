// Import express and path modules.
var express = require( "express");
var path = require( "path");

// Create the express app.
var app = express();
var count = 0;
// Define the static folder.
app.use(express.static(path.join(__dirname, "./static")));

// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render("index");
})

// Start Node server listening on port 8000.
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);
  var response = 'The button has been pushed ' + count + ' time(s)';
  // Emit the maessage to a newly connected user.
  socket.emit( 'current_count', {response: response});
  socket.on( "pushing_button", function (){
      count ++;
      var response = 'The button has been pushed ' + count + ' time(s)';
      // Full broadcast every time the counter has increased.
      io.emit( 'updated_count', {response: response});
  })
  socket.on( "resetting", function (){
      count = 0;
      var response = 'The button has been pushed ' + count + ' time(s)';
      // Full broadcast every time the counter has been reset.
      io.emit( 'reset_count', {response: response});
  })
})

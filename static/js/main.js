$(document). ready(function (){
   var socket  = io.connect();
   // When a user just connected, the server emits the current count
   socket.on( 'current_count', function (data){
         $('#response').html('<p>' + data.response + '</p>');
   });
   // Emit the event when an epic button was pushed
   $( '#epic').click(function (){
         console.log('hi');
         socket.emit("pushing_button");
   });
   // Get a response from the server
   socket.on( 'updated_count', function (data){
         $('#response').html('<p>' + data.response + '</p>');
   });
   // Emit the event when a reset button was pushed
   $( '#reset').click(function (){
         console.log('reset');
         socket.emit("resetting");
   });
   // Get a response from the server
   socket.on( 'reset_count', function (data){
         $('#response').html('<p>' + data.response + '</p>');
   });
})

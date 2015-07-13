
######Unit 5 / Lesson 2 / Project 1
#Collaborative Drawing

The following challenges were completed:
#####Networking the drawing
- Emit a draw event from your mousemove function to the Socket.IO server
- In server.js, listen for the draw event, and broadcast it out to all other clients.
- Listen for the broadcast draw event in public/main.js, and call the draw function when it is received

#####Only draw on mousedown
- Listen for the ```mousedown``` event
- Listen for the ```mouseup``` event
- Only perform the ```mousemove``` actions when drawing is set to true


######Unit 5 / Lesson 2 / Project 2
#The Guessing Game

The following challenges were completed:
- Emit a ```guess``` event to the server when a guess is made.
- Broadcast the ```guess``` event to all of the other clients

- Create a new ```<div>``` for displaying guesses in *public/index.html*
- Listen for ```guess``` events in *public/main.html*
- When a ```guess``` event is received, update the contents of the ```<div>``` to display the guess

import "./App.scss";
import { useState } from 'react';
import io from "socket.io-client";
import Room from './Room';

let environment;

if (process.env.NODE_ENV === 'production') {
  environment = 'https://oui-tube-backend.vercel.app/';
} else {
  environment = "http://localhost:4000";
}

const socket = io.connect(environment);

const App = () => {

  // useState hook to save username and room
  // Deconstruct useState, first item is current state, second is function
  // to update current state.
  const [ username, setUser ] = useState("");
  const [ room, setRoom ] = useState("");
  const [ joinedRoom, enterRoom ] = useState(false);

  // Join room function - user is only allowed to join room if username / ID is
  // filled in.
  const joinRoom = () => {
    if (username.length > 0 && room.length > 0 && username !== 'System') {
      socket.emit("joinRoom", [username, room]);
      enterRoom(true);
    } else {
      alert("Invalid username and/or Room ID.");
    }
  }

  const leaveRoom = () => {
    enterRoom(false);
    setUser("");
    setRoom("");
  }

  return (
    <div className="App">
      { // User ternary operator to render room or join form
        !joinedRoom ? (
          <div className="join-container">
            <h1>OuiTube</h1>
            <h3>Enter an existing room ID or create your own.</h3>
            <input type="text" 
              placeholder="Name" 
              onChange={(e) => {
                setUser(e.target.value);
              }}
              onKeyPress={(e) => {
                e.key === 'Enter' && joinRoom();
              }}/>
            <input type="text" 
              placeholder="Room ID" 
              onChange={(e) => {
                setRoom(e.target.value);
              }}
              onKeyPress={(e) => {
                e.key === 'Enter' && joinRoom();
              }}/><br />
            <button
              onClick={joinRoom}
             >Enter Room</button>
          </div> 
      ) : ( 
      // Pass props to child component.
      <Room socket={socket} username={username} room={room} 
        leaveRoom={leaveRoom}/> 
      )}
    </div>
  );
}

export default App;

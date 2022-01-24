import "./App.css";
import { useState } from 'react';
import io from "socket.io-client";
import Room from './Room';

const socket = io.connect("http://localhost:4000");

const App = () => {

  // useState hook to save username and room
  const [ username, setUser ] = useState("");
  const [ room, setRoom ] = useState("");

  // Join room function - user is only allowed to join room if username / ID is
  // filled in.
  const joinRoom = () => {
    if (username.length > 0 && room.length > 0) {
      socket.emit("joinRoom", room)
    } else {
      alert("Invalid username and/or Room ID.");
    }
  }

  return (
    <div className="App">
        <h1>OuiTube</h1>
        <h3>Enter an existing room with a provided ID or create your own.</h3>
        <input type="text" 
          placeholder="Name" 
          onChange={(e) => {
            setUser(e.target.value);
          }}/>
        <br />
        <input type="text" 
          placeholder="Room ID" 
          onChange={(e) => {
            setRoom(e.target.value);
          }}/>
        <br />
        <button
          onClick={joinRoom}>Enter</button>
          <Room socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;

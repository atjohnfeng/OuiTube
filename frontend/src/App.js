import "./App.css";
import { useState } from 'react';
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

const App = () => {

  // useState hook to save username and room
  const [username, setUser] = useState("");
  const [room, setRoom] = useState("");

  // Join room function - user is only allowed to join room if username / ID is
  // filled in.
  const joinRoom = () => {
    if (username.length > 0 && room.length > 0) {

    }
  }

  return (
    <div className="App">
        <h1>OuiTube</h1>
        <h3>Enter a Room</h3>
        <input type="text" placeholder="Name" />
        <br />
        <input type="text" placeholder="Room ID" />
        <br />
        <button>Enter</button>
    </div>
  );
}

export default App;

import './App.css';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function App() {
  return (
    <div className="App">
        Hello! Welcome.
    </div>
  );
}

export default App;

import React from 'react';
import { useState } from 'react';

const Room = (props) => {

    const { socket, username, room } = props;
    const [ video, setVideo ] = useState("");
    
    return (
        <div>
            <div className="room-header">
                Room ID: {room}
            </div>
            <div className="video-box">
                Video goes here. <br />
                <input type="text" 
                    placeholder="Video URL" />
                <button>Submit Video</button>
            </div>
            <div className="chat-box">
                Chatbox goes here.
            </div>
            <div className="chat-input">
                <input type="text"
                    placeholder={`Message Room`} />
                <button>Submit Message</button>
            </div>
        </div>
    )
}

export default Room;
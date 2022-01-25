import React, { useEffect } from 'react';
import { useState } from 'react';

const Room = (props) => {

    // Deconstruct props
    const { socket, username, room } = props;

    // Create State for Video using React Hooks
    const [ video, setVideo ] = useState("");
    const [ newMessage, setNewMessage ] = useState("");

    // Function to send message
    // Make function asynchronous to make sure function completes before
    // moving forward
    const sendMessage = async () => {
        if (newMessage.length > 0) {
            const message = {
                room: room,
                author: username,
                message: newMessage,
                time: new Date(Date.now()).getHours() + ":"
                    + new Date(Date.now()).getMinutes()
            }

            await socket.emit("sendMessage", message);
        }
    }

    // Add event listener to listen to event changes
    useEffect(() => {
        socket.on("receiveMessages", (messages) => {
            console.log(messages)
        });
    }, [socket]);
    
    return (
        <div className="room-container">
            <div className="room-header">
                Room ID: {room}
            </div>
            <div className="video-box">
                Video goes here. <br />
                <input type="text" 
                    placeholder="Video URL" 
                    onChange={(e) => {
                        setVideo(e.target.value);
                    }} />
                <button>Submit</button>
            </div>
            <div className="chat-box">
                Chatbox goes here.
            </div>
            <div className="chat-input">
                <input type="text"
                    placeholder={`Message Room`}
                    onChange={(e) => {
                        setNewMessage(e.target.value);
                    }} />
                <button onClick={sendMessage}>Enter</button>
            </div>
        </div>
    )
}

export default Room;
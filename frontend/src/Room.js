import React, { useEffect } from 'react';
import { useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Room = (props) => {

    // Deconstruct props
    const { socket, username, room } = props;

    // Create State for Video using React Hooks
    const [ video, setVideo ] = useState("");
    const [ newMessage, setNewMessage ] = useState("");
    const [ messages, setMessages ] = useState([]);

    // Function to send message
    // Make function asynchronous to make sure function completes before
    // moving forward
    const sendMessage = async () => {
        if (newMessage.length > 0) {
            let message = {
                room: room,
                author: username,
                message: newMessage,
                time: new Date(Date.now()).getHours() + ":"
                    + new Date(Date.now()).getMinutes()
            }

            await socket.emit("sendMessage", message);
            setMessages(messages => {
                return [...messages, message]
            });
            setNewMessage("");
        }
    }

    // Add event listener to listen to event changes
    useEffect(() => {
        socket.on("receiveMessages", (newMessage) => {
            // console.log(newMessage);
            setMessages(messages => {
                return [...messages, newMessage]
            })
        });
    }, [socket]);
    
    return (
        <div className="room-container">
            <h1>OuiTube</h1>
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
                <ScrollToBottom className="chat-box">
                { messages.map((message, i) => {
                    return <div className="message" key={`msg-${i}`}>
                        { message.time + ' ' + message.author + ': ' + 
                            message.message }
                    </div>
                }) }
                </ ScrollToBottom>
            </div>
            <div className="chat-input">
                <input type="text"
                    placeholder={`Message Room`}
                    value={newMessage}
                    onChange={(e) => {
                        setNewMessage(e.target.value);
                    }} 
                    onKeyPress={(e) => {
                        e.key === 'Enter' && sendMessage();
                    }}/>
                <button onClick={sendMessage}>Enter</button>
            </div>
        </div>
    )
}

export default Room;
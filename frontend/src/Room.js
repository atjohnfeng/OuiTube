import React, { useEffect } from 'react';
import { useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Room = (props) => {

    // Deconstruct props
    const { socket, username, room, leaveRoom } = props;

    // Create State for Video using React Hooks
    const [ video, enterVideo ] = useState("");
    const [ videoShow, setShow ] = useState(false);
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

    const setVideo = async () => {
        if (video.length > 0) {
            let embedLink = video.split("watch?v=");
            if (embedLink.length !== 2) {
                alert('Not a valid URL.');
                setShow(false);
                enterVideo("");
            } else {
                embedLink = embedLink.join('embed/');
                await socket.emit("setVideo", [embedLink, room]);
                enterVideo(embedLink);
                setShow(true);
            }
        }
    }
    
    // const leave = () => {
    //     leaveRoom();
    // }

    // Add event listener to listen to event changes
    useEffect(() => {
        socket.on("receiveMessages", (newMessage) => {
            // console.log(newMessage);
            setMessages(messages => {
                return [...messages, newMessage]
            })
        });
    }, [socket]);

    useEffect(() => {
        socket.on("receiveVideo", video => {
            // console.log(video);
            enterVideo(video[0]);
            setShow(true);
        })
    }, [socket]);
    
    return (
        <div className="room-container">
            <h1>OuiTube</h1>
            <div className="room-header">
                Room ID: {room}
            </div>
            <div className="video-box">
                { videoShow ? ( <iframe width="420" height="315"
                    src={video}> 
                </iframe> ) : ( <div className="empty-video">
                    Enter a valid YouTube URL</div> )}
                <br />
                <input type="text" 
                    placeholder="Video URL" 
                    value={video}
                    onChange={(e) => {
                        enterVideo(e.target.value);
                    }} 
                    onKeyPress={(e) => {
                        e.key === 'Enter' && setVideo();
                    }}/>
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
            </div>
            <button onClick={leaveRoom}>Leave Room</button>
        </div>
    )
}

export default Room;
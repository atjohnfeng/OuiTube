import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Room = (props) => {

    // Deconstruct props
    const { socket, username, room, leaveRoom } = props;

    // Create State for Video using React Hooks
    const [ video, enterVideo ] = useState("");
    const [ currentVideo, setCurrentVideo ] = useState("");
    const [ videoShow, setShow ] = useState(false);
    const [ newMessage, setNewMessage ] = useState("");
    const [ messages, setMessages ] = useState([]);

    const [ isPlaying, setPlaying ] = useState(false);

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
            // let embedLink = video.split("watch?v=");
            // if (embedLink.length !== 2) {
            //     alert('Not a valid URL.');
            //     enterVideo("");
            // } else {
            //     embedLink = embedLink.join('embed/') + '?enablejsapi=1';
            //     await socket.emit("setVideo", [embedLink, room]);
            //     setCurrentVideo(embedLink);
            //     setShow(true);
            await socket.emit("setVideo", [video, room]);
            setCurrentVideo(video);
            setShow(true);
            enterVideo("");
            // }
        }
    }

    const setPlayState = async () => {
        await socket.emit("setVideoState", [true, room]);
        setPlaying(true);
    }

    const setPauseState = async () => {
        await socket.emit("setVideoState", [false, room]);
        setPlaying(false);
    }

    // Add event listener to listen to event changes
    useEffect(() => {
        socket.on("receiveMessages", (newMessage) => {
            // console.log(newMessage);
            setMessages(messages => {
                return [...messages, newMessage];
            });
        });

        socket.on("receiveVideo", video => {
            // console.log(video);
            // enterVideo(video[0]);
            setCurrentVideo(video[0]);
            setShow(true);
        });

        socket.on("receiveUser", message => {
            setMessages(messages => {
                return [...messages, message];
            });
        });

        socket.on("receivePlayState", state => {
            console.log(state);
            setPlaying(state[0]);
        });

    }, [socket]);
    
    return (
        <div className="room-container">
            <h1>OuiTube</h1>
            <div className="room-header">
                Room ID: {room}
            </div>
            <div className="video-box" id="player">
                { videoShow ? ( 
                // <iframe width="420" height="315"
                //     src={currentVideo}> 
                // </iframe> 
                <ReactPlayer controls url={currentVideo} 
                    playing={isPlaying}
                    onPlay={setPlayState}
                    onPause={setPauseState} />
                ) 
                : ( <div className="empty-video">
                    Enter a valid YouTube URL</div> )}
                <br />
                Currently Playing: { !!currentVideo ? currentVideo : 'None' }
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
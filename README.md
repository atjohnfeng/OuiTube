# QuiTube

You can find OuiTube live [here](https://oui-tube.vercel.app/)!

## Background

OuiTube let's you watch YouTube videos synchronously with your friends. Queue up a video to watch while chatting with your closest buddies.

## Technologies Used

The basic functionality of OuiTube was built over the course of a day using the following technologies:

- ReactJS
- React-Player
- NodeJS
- Nodemon
- SocketIO
- Express
- Cors
- Sass
- Heroku
- Vercel

The frontend was built with React and React hooks, utilizing a Single-Page Application to display content to the user, and hosted on Vercel.

The backend is hosted on Heroku and was was built utilizing websockets via socket.io, cors, express, and node.

```
const [ video, enterVideo ] = useState("");
const [ currentVideo, setCurrentVideo ] = useState("");
const [ videoShow, setShow ] = useState(false);
const [ newMessage, setNewMessage ] = useState("");
const [ messages, setMessages ] = useState([]);
const [ isPlaying, setPlaying ] = useState(false);

const ref = useRef(null);
```

By utilizing React Hooks, functional components may store state and have access to lifecycle methods without the need to write a class.

```
useEffect(() => {
        socket.on("receiveMessages", (newMessage) => {
            setMessages(messages => {
                return [...messages, newMessage];
            });
        });

        socket.on("receiveVideo", video => {
            setCurrentVideo(video[0]);
            setShow(true);
        });

        socket.on("receiveUser", message => {
            setMessages(messages => {
                return [...messages, message];
            });
        });

        socket.on("receivePlayState", state => {
            setPlaying(state[0]);
        });

        socket.on("receiveVideoTime", time => {
            ref.current.seekTo(time, 'seconds');
        });

    }, [socket]);
```

By adding a listener with the useEffect hook, the application can listen for incoming messages with websockets and handle them accordingly.
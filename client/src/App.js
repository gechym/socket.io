import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:8080');

function App() {
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messageRecive, setMessageRecive] = useState({});
    const [name, setName] = useState('');

    const handleSendMessage = () => {
        socket.emit('send_message', { message: message, room: room, name });
    };

    const handleJoinRoom = () => {
        socket.emit('join_room', { room, room, name });
    };

    useEffect(() => {
        socket.on('recive_message', (data) => {
            console.log(data);
            setMessageRecive(data);
        });

        socket.on('on_join_room', (data) => {
            alert(data);
        });
    });

    return (
        <div className="App">
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <input value={room} onChange={(e) => setRoom(e.target.value)} />
            <button onClick={handleJoinRoom}>join rom</button>
            <input value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={handleSendMessage}>Send</button>

            <h1>message</h1>
            <h3>
                {messageRecive.name} 👉 {messageRecive.message}
            </h3>
        </div>
    );
}

export default App;

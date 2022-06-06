import io from 'socket.io-client';
import { useEffect } from 'react';

const socket = io.connect('http://localhost:8080');

function App() {
    const handleSendMessage = () => {
        socket.emit('send_message', { message: 'hello' });
    };

    useEffect(() => {
        socket.on('recive_message', (data) => {
            alert(data.message);
        });
    }, [socket]);

    return (
        <div className="App">
            <input />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default App;

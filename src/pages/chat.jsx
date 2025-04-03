import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMessagesWithUser, fetchMessageCreate } from '../services/messageService';
import MessagesList from '../components/MessagesList';
import '../styles/message2.css';  


const Chat = () => {
    const { userId } = useParams();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [text, setText] = useState('');

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await fetchMessagesWithUser(userId);
                setMessages(response.data);
            } catch (err) {
                console.error('Failed to fetch messages:', err);
                setError('Failed to load messages.');
            } finally {
                setLoading(false);
            }
        };
        getMessages();
    }, [userId]);

    const handleSendMessage = async () => {
        if (!text.trim()) return;
        try {
            const response = await fetchMessageCreate({ recipientId: userId, text });
            setMessages((prevMessages) => [...prevMessages, response.data]);
            setText('');
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };

    if (loading) return <p>Loading messages...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Messages with User {userId}</h2>
            <MessagesList messages={messages} />
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chat;

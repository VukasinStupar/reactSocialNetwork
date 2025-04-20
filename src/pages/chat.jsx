import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMessagesWithUser} from '../services/messageService';
import MessagesList from '../components/MessagesList';

import { useAuth } from '../context/AuthContext';
import '../styles/chat.css';   // Make sure this file is imported
import { connectWS, sendMessageWS } from '../services/WebSocketService';

const Chat = () => {
    const { user } = useAuth();

    const { userId } = useParams();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [text, setText] = useState('');
   


    useEffect(() => {
        if(user == null){
            return;
        }
        getMessages();
        connectWS(user.id.toString(), (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
          });
      
          return () => {
            disconnect();
          };
    
      }, [userId, user]);



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

    const handleSendMessage = async () => {
        if (!text.trim()) return;
        try {
            

            sendMessageWS({ recipientId: userId, senderId : user.id,  text });
            getMessages();
            setText('');
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };
   

    if (loading) return <p>Loading messages...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="chatContainer"> {/* Applying chat container styles */}
            <h2 className="header">Messages with User {userId}</h2>
            <div className="messagesList"> {/* Updated messages list class */}
                <MessagesList messages={messages} />
            </div>
            <div>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type your message..."
                    className="inputField" 
                />
                <button onClick={handleSendMessage} className="sendButton"> {/* Adding sendButton class */}
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;

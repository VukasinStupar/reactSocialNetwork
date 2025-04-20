import React from 'react';

import '../styles/messageList.css';
import { useAuth } from '../context/AuthContext';

const Message = ({ message }) => {
    const { user } = useAuth();
    const isSentByUser = message.senderId === user.id;

    return (
        <div className={`message-container ${isSentByUser ? 'sent' : 'received'}`}>
            <div className={`message-bubble ${isSentByUser ? 'sent-bubble' : 'received-bubble'}`}>
                <p className="message-text">{message.text}</p>
                <span className="message-time">
                    {new Date(message.sendTimeStr).toLocaleString()}
                </span>
            </div>
        </div>
    );
};

const MessagesList = ({ messages }) => {
    return (
        <div className="message-list">
            {messages.map((msg) => (
                <Message key={msg.id} message={msg} />
            ))}
        </div>
    );
};

export default MessagesList;

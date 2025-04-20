import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessagesList from '../components/MessagesList';
import { useAuth } from '../context/AuthContext';
import '../styles/chat.css';
import { fetchGroupChat } from '../services/messageService';
import { connectGroupWS, disconnectGroup, sendGroupMessageWS } from '../services/WebSocketGroupService';

const GroupChat = () => {
  const { user } = useAuth();
  const { groupChatId } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !groupChatId) return;

    initChat();

    connectGroupWS(groupChatId, (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => disconnectGroup();
  }, [groupChatId, user]);

  const initChat = async () => {
    try {
      const response = await fetchGroupChat(groupChatId);
      setMessages(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load messages.');
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (!text.trim()) return;

    const message = {
      groupChatId: Number(groupChatId),
      senderId: user.id,
      text,
    };

     try {
    
        sendGroupMessageWS(message);
        setText("");
        initChat();
    } catch (err) {
        console.error('Failed to send message:', err);
    }
  };

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="chatContainer">
      <h2 className="header">Group Chat: {groupChatId}</h2>
      <div className="messagesList">
        <MessagesList messages={messages} />
      </div>
      <div className="inputArea">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="inputField"
        />
        <button onClick={handleSendMessage} className="sendButton">
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupChat;

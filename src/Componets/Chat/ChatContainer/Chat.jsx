import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import "./chat.css";
import ChatSidebar from "../ChatSidebar/ChatSidebar";
import ChatNavbar from "../ChatNavbar/ChatNavbar";
import { Send } from '@mui/icons-material';
import { depCountActions } from '../../../store/depCount';
import { useDispatch, useSelector } from 'react-redux';
import Messages from '../Messages/Messages';


const socket = io('http://localhost:5000');

function Chat() {
    
    axios.defaults.withCredentials = true;

    const dispatch = useDispatch();
    const [receiverId, setReceiverId] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const userId = localStorage.getItem("userId");

    const dep = useSelector(state => state.count?.depValue);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
            scrollToBottom();
        });

        socket.on('receiveNotification', (data) => {
            if (data.sender !== userId) { // Only show notification if the message is not from the current user
                setNotifications((prevNotifications) => [...prevNotifications, { ...data, timestamp: new Date() }]);
            }
        });

        return () => {
            socket.off('receiveMessage');
            socket.off('receiveNotification');
        };
    }, []);

    useEffect(() => {
        if (userId) {
            socket.emit('joinRoom', userId);
        }
    }, [userId]);

    const handleDepCount = () => {
        dispatch(depCountActions.handleCount());
    };

    const sendMessage = () => {
        handleDepCount();
        const newMessage = {
            sender: userId,
            receiver: receiverId,
            message
        };
        socket.emit('sendMessage', newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage('');
        scrollToBottom();
    };

    const fetchMessages = async () => {
        if (!receiverId) return;
        try {
            const response = await axios.post('http://localhost:5000/messages', {
                sender: userId,
                receiver: receiverId
            });
            setMessages(response.data);
            scrollToBottom();
        } catch (error) {
            console.error("Error fetching messages", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [receiverId, dep]);

    const handleGetUser = (id) => {
        setReceiverId(id);
        handleDepCount();
    };

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/all_staff');
                setUsers(response.data);
            } catch (error) {
                console.error("An error occurred while fetching users", error);
            }
        };
        getUsers();
    }, [userId]);

    return (
        <div className='chat-container'>
            <ChatSidebar 
                users={users} 
                handleGetUser={handleGetUser}
                fetchMessages={handleDepCount}
            />
            <div className='chat-content'>
                <ChatNavbar receiverId={receiverId} />
                <div className='message-input-container'>
                    <div className='messages-container'>
                        <Messages messages={messages} />
                        <div ref={messagesEndRef} />
                    </div>
                    <div className='chat-box-container'>
                        <input
                            type="text"
                            placeholder="Type a message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className='chat-input'
                            disabled={receiverId===null?true:false}
                        />
                        <button 
                         onClick={sendMessage} className='chat-btn'
                         disabled={message===""?true:false}
                        >
                            <Send />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
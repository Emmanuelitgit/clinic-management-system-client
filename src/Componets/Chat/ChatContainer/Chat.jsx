import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./chat.css";
import ChatSidebar from "../ChatSidebar/ChatSidebar";
import ChatNavbar from "../ChatNavbar/ChatNavbar";
import { Send } from '@mui/icons-material';
import { depCountActions } from '../../../store/depCount';
import { useDispatch, useSelector } from 'react-redux';
import Messages from '../Messages/Messages';
import { io } from "socket.io-client";
import { format, parseISO, isValid } from 'date-fns';
import api from "../../../api"


function Chat() {
    axios.defaults.withCredentials = true;

    const userId = parseInt(localStorage.getItem("userId"));
    const dispatch = useDispatch();
    const socket = useRef();

    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [receiverId, setReceiverId] = useState(null);
    const [users, setUsers] = useState("");
    const [messages, setMessages] = useState([]);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleDepCount = () => {
        dispatch(depCountActions.handleCount());
    };

    const handleGetUser = (id) => {
        setReceiverId(id);
        handleDepCount();
    };

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await api.get('/all_staff');
                setUsers(response.data);
            } catch (error) {
                console.error("An error occurred while fetching users", error);
            }
        };
        getUsers();
    }, [userId]);

    // Connect to Socket.io only once when the component mounts
    useEffect(() => {
        socket.current = io("wss://clinic-server-o79p.onrender.com");

        socket.current.emit("new-user-add", userId);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });

        // Set up a listener for incoming messages
        socket.current.on("recieve-message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
            scrollToBottom();
        });

        // Clean up the socket connection when the component unmounts
        return () => {
            socket.current.disconnect();
        };
    }, [userId]);  // Empty dependency array ensures this runs only once

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            const date = new Date();
            const formattedTime = format(date, 'hh:mm a');
            const message = {
                sender: userId,
                receiver: receiverId,
                message: newMessage,
                createdAt: formattedTime
            };
            setSendMessage(message);

            const response = await api.post(`/add-message`, {
                sender: message.sender,
                receiver: message.receiver,
                message: message.message
            });
            if (response.status === 201) {
                setMessages((prevMessages) => [...prevMessages, message]);
                scrollToBottom();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setNewMessage("");
        }
    };

    // Send Message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await api.get(`/messages`, {
                    withCredentials: true,
                });

                const fetchedData = response.data;
                setMessages(fetchedData);
            } catch (error) {
                console.log(error);
            }
        };
        getMessages();
    }, [receiverId, userId]);

    const filteredMessages = messages.filter((msg) => {
        return (parseInt(msg.sender) === userId && parseInt(msg.receiver) === receiverId) ||
            (parseInt(msg.receiver) === userId && parseInt(msg.sender) === receiverId);
    });

    const checkOnlineStatus = (chat) => {
        return onlineUsers.some((user) => user.userId === chat);
    };

    return (
        <div className='chat-container'>
            <ChatSidebar
                users={users}
                handleGetUser={handleGetUser}
                fetchMessages={handleDepCount}
                status={checkOnlineStatus}
            />
            <div className='chat-content'>
                <ChatNavbar receiverId={receiverId} />
                <div className='message-input-container'>
                    <div className='messages-container'>
                        <Messages
                            messages={filteredMessages}
                        />
                        <div ref={messagesEndRef} />
                    </div>
                    <div className='chat-box-container'>
                        <input
                            type="text"
                            placeholder="Type a message"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className='chat-input'
                            disabled={receiverId === null}
                        />
                        <button
                            onClick={handleSend} className='chat-btn'
                            disabled={newMessage === ""}
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
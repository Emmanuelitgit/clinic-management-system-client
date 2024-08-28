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

    const user_id = localStorage.getItem("userId");
    const userId = parseInt(user_id)
    const dispatch = useDispatch();
    const socket = useRef();
  
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
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
    

    // Connect to Socket.io
    useEffect(() => {
        socket.current = io("https://clinic-server-o79p.onrender.com:8800");
        socket.current.emit("new-user-add", userId);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [userId]);       


    const handleSend = async(e) => {
        e.preventDefault();
        try {
            const date = new Date();
            const formattedTime = format(date, 'hh:mm a');
            const message = {
                sender: userId,
                receiver: receiverId,
                message: newMessage,
                createdAt:formattedTime
            };
            setSendMessage(message);

          const response = await api.post(`/add-message`, {
            sender:message.sender,
            receiver:message.receiver,
            message:message.message
          });
          console.log(response)
          if(response.status === 201){
            setMessages((prevMessages) => [...prevMessages, message]);
            scrollToBottom();
          }
        } catch (error) {
            console.log(error)
        }finally{
            setNewMessage("");
        }
      };


    // Send Message to socket server
    useEffect(() => {
      if (sendMessage!==null) {
        socket.current.emit("send-message", sendMessage);}
    }, [sendMessage]);

    useEffect(() => {
        socket.current.on("recieve-message", (data) => {
          setMessages((prevMessages) => [...prevMessages, data]);
            scrollToBottom();
        });
      }, [receiverId, userId]);


      useEffect(()=>{
        const getMessages = async()=>{
          try {
            const response = await api.get(`/messages`, {
              withCredentials: true,
          });
    
          const fetchedData = response.data;
            setMessages(fetchedData)
          } catch (error) {
            console.log(error)
          }
        }
        getMessages()
      }, [receiverId, userId])
  

      const filteredMessages = messages? messages.filter((msg) => {
        return (parseInt(msg.sender )=== userId && parseInt(msg.receiver )=== receiverId) || 
               (parseInt(msg.receiver) === userId && parseInt(msg.sender )=== receiverId);
      }): 'No messages found';
            
  
    const checkOnlineStatus = (chat) => {
    //   const chatMember = users.find((member) => member.staff_id !== userId);
      const online = onlineUsers.find((user) => user.userId === chat);
      return online ? true : false;
    };

    console.log(filteredMessages)

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
                            disabled={sendMessage === ""}
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
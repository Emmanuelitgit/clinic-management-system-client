import React from 'react';
import "./ChatNavbar.css";
import image from "../../images/staff/doctor 1.png";
import { Logout } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ChatNavbar = ({ receiverId }) => {

    axios.defaults.withCredentials = true;

    const location = useLocation()
    const route = location.pathname.split("/")[1]
   
    const [user, setUser] = useState('');

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/single_staff/${receiverId}`);
                if (!response) {
                    throw new Error("failed to fetch");
                }
                setUser(response.data);
            } catch (error) {
                console.log("an error occurred");
            }
        };
        getUsers();
    }, [receiverId]);

    const userName = user !== "" ? user.map(user => user.name) : "No user Selected";
    const userRole = user !== "" ? user.map(user => user.role) : "No user Selected";


    return (
        <div className='chat-navbar-container'>
            <div className="user-container-nav">
                <div className="user-info-container-nav">
                    {userName[0] !== undefined ?
                        <img src={image} alt="" className='user-img-nav' /> :
                        <span className='user-name'>No user selected</span>}
                        <div className='user-role-name-container'>
                        <span className='user-name'>{userName[0]}</span>
                        <span>({userRole[0]})</span>
                        </div>
                </div>
                <div className="chat-logout-btn-container">
                    <Link to={`/${route}/dashboard`}>
                        <Logout style={{ color: 'black', fontSize: '23px', cursor: 'pointer' }} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ChatNavbar;

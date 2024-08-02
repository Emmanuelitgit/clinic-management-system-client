import React from 'react'
import './ChatSidebar.css'
import image from "../../images/staff/doctor 1.png"
import { useEffect, useState } from 'react'
import axios from 'axios'

const ChatSidebar = ({users, handleGetUser}) => {

  const currentUserId = localStorage.getItem("userId")
  const filteredUsers = users.filter((user)=>user.staff_id != currentUserId)

  return (
    <div className='chat-sidebar-container'>
        <div className="search-container">
           <input type="text" placeholder='Search user here...' className='search-input' />
        </div>
        <div className='user-container'>
        {filteredUsers?.map((user)=>(
        <div className="user-container-items" onClick={()=>handleGetUser(user.staff_id)}>
            <div className="user-image-container">
                <img src={image} alt="" className='user-img'/>
            </div>
            <div className="user-info-container">
                <span>{user.name}</span>
            </div>
        </div>
        ))}
        </div>
    </div>
  )
}

export default ChatSidebar
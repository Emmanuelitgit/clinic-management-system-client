import React from 'react'
import './ChatSidebar.css'
import image from "../../images/staff/doctor 1.png"


const ChatSidebar = ({users, handleGetUser, status}) => {

  const currentUserId = localStorage.getItem("userId")
  const filteredUsers = users? users?.filter((user)=>user.staff_id != currentUserId) : ''



  return (
    <div className='chat-sidebar-container'>
        <div className="search-container">
           <input type="text" placeholder='Search user here...' className='search-input' />
        </div>
        <div className='user-container'>
        {filteredUsers? filteredUsers?.map((user)=>(
        <div className="user-container-items" onClick={()=>handleGetUser(user.staff_id)}>
            <div className="user-image-container">
                <img src={image} alt="" className='user-img'/>
            </div>
            {status(user?.staff_id) && <span style={{
                  backgroundColor:"#4caf50",
                  borderRadius:"50%",
                  height:'1.5%',
                  padding:"1.5%",
                  position:'absolute',
                  left:"32%",
                }}></span>}
            <div className="user-info-container">
                <span>{user.name}</span>
                {status(user?.staff_id) && <span style={{
                  color:"#4caf50",
                  fontWeight:"bold",
                  fontSize:"13px"
                }} className='online-status'>online</span>}
            </div>
        </div>
        )): 'no user found'}
        </div>
    </div>
  )
}

export default ChatSidebar
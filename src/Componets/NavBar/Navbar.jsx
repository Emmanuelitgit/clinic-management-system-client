import React, { useEffect, useState } from 'react';
import "./style.css";
import { Menu, Notifications, Message, ArrowDropDown } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Panelbar from '../Panelbar/Panelbar';
import { useDispatch, useSelector } from 'react-redux';
import { handleSidebarToggle } from '../../store/modalState';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import ProfileModal from "../Profile/ProfileModal";

const Navbar = () => {

  //  const user = useSelector((state)=>state.auth?.currentUser) || []
  //  const role = useSelector((state)=>state.auth?.role) || []

  axios.defaults.withCredentials = true;

  const dispatch = useDispatch()
  const [settings, setSettings] = useState('');
  const [count, setCount] = useState()
   const visible = useSelector((state)=>state.modal?.sidebar_toggle) || [];
   const roleValue = localStorage.getItem('role');
   const role = roleValue?.charAt(0).toUpperCase() + roleValue.slice(1);
   const user = localStorage.getItem('user');
   const location = useLocation();
   const route = location.pathname.split("/")[1];
   const dep = useSelector(state => state.count?.depValue) || [2];


   useEffect(()=>{
    const getsettings = async()=>{
      try {
        const response = await fetch('http://localhost:5000/settings', {
          method: 'GET',
          credentials: 'include', // Important for including cookies
      });
        if(!response.ok){
          console.log('faild to fetch data..')
        }
        const fetchedData = await response.json();
        setSettings(fetchedData)
      } catch (error) {
        console.log(error)
      }
    }
    getsettings()
  }, [dep])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/staff/${role}`);
        const data = response.data;
        setCount(data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dep]);

  const handleToggle = () =>{
    dispatch(handleSidebarToggle())
   }


  return (
    <div className='navbar-container'>
      <div className='menu-title-container'>
           <span className='menu-icon-container'>
             <Menu 
              onClick={handleToggle} 
               className='menu-icon'
               />
           </span>
           <img src={require("../../uploads/logo2.avif")} alt=""  className='logo'/>
            <span className='navbar-title'>{settings[0]?.system_name}
            <span className='dash'>-</span> 
            </span> <span className='zangu'> ZANGU-VUGA</span>
      </div>
      <div className='panel-type-container'>
         <h4 className='panel-type-text'>{role} Panel</h4>
      </div>
      <div className='nav-profile-container'>
          <Link to={`/${route}/chat`}>
          <Badge badgeContent={4} color="primary" className='icons'>
              <MailIcon color="action" className='profile-icon' style={{color:'white'}} />
         </Badge>
          </Link>
         <Badge badgeContent={4} color="primary" className='icons'>
              <NotificationsIcon color="action" className='profile-icon' style={{color:'white'}} />
         </Badge>
         <div className='user-profile-container'>
            {/* <img 
            className='nav-profile-img'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU" alt="" />
            <span className='user-name' style={{color:"white"}}>{user}</span>
            <ArrowDropDown 
             className='dropdown-icon'
             style={{
               fontWeight:'600',
               fontSize:'25px'
             }}
             /> */}
             <ProfileModal/>
         </div>
      </div>
      {/* <Panelbar/> */}
    </div>
  )
}

export default Navbar
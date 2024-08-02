import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  ArrowDropDown } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth';
import { Logout } from '@mui/icons-material';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import LogoutBtn from "../Buttons/LogoutBtn";
import ManageProfile from "./ManageProfile";
import { Person, PersonRounded } from '@mui/icons-material';


function ProfileModal() {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const user = localStorage.getItem('user');
  const profile = localStorage?.getItem("profile")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation();
  const route = location.pathname.split("/")[1]

   const handleLogout = () =>{
    dispatch(logout());
    handleClose()
    navigate("/login")
  }

  
  return (
    <>
        {profile !=='null' &&  <img 
            className='nav-profile-img'
            src={require(`../../uploads/${profile}`)}
            onClick={handleShow} 
            />}
            {profile ==='null' &&  <img 
            className='nav-profile-img'
            src={require(`../../uploads/default.png`)}
            onClick={handleShow} 
            />}
            <span className='user-name' style={{color:"white"}}>{user}</span>
            <ArrowDropDown 
             className='dropdown-icon'
             style={{
               fontWeight:'600',
               fontSize:'25px'
             }}
             />
      <Modal show={show} onHide={handleClose} 
        animation={false} style={{
            marginLeft:"65%",
            width:'10%',
            marginTop:'1.5%',
        }}
        >
        <Modal.Header closeButton>
        {profile ==='null' &&  <img 
            className='nav-profile-img'
            src={require(`../../uploads/default.png`)}
            onClick={handleShow} 
            />}
           {profile !=='null' &&  <img 
            className='nav-profile-img'
            src={require(`../../uploads/${profile}`)}
            onClick={handleShow} 
            />}
        </Modal.Header>
        <Modal.Body style={{display:'flex', flexDirection:"column", gap:"10px"}}>
            <Link to={`/${route}/profile`} 
             onClick={handleClose}
             style={{textDecoration:'none', color:'black'}}
             >
               <span 
                 style={{
                  cursor:'pointer',
                  marginLeft:'10%',
                  color:"black"
                 }} 
               >
                  View Profile
                </span>
            </Link>
            <div style={{
              width:"100%"
            }}>
              <ManageProfile 
              btnName={"Update Profile"}
              color={"black"}
              handleProfileClose={handleClose}
              />
            </div>
            <span onClick={handleLogout}
             style={{
              cursor:'pointer',
              marginLeft:'10%',
              color:"black"
             }}
            >
              Logout
            </span>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfileModal;
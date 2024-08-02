import React from 'react';
import "./style.css";
import { Dashboard, 
        Person, 
        } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import LogoutBtn from '../Buttons/LogoutBtn';


const RadiographerSidebar = () => {

  const profile = localStorage?.getItem("profile")

  return (
    <div className='sidebar-container'>
      <div className='sidebar-items-container'>
       <Link to={'/pharmacist/profile'} className='link'>
         <div className='item'>
           {profile !=='null' &&  <img 
            className='sidebar-img'
            src={require(`../../uploads/${profile}`)}
            />}
            {profile ==='null' &&  <img 
            className='sidebar-img'
            src={require(`../../uploads/default.png`)}
            />}
        </div>
        </Link>
        <div className='item'>
          <Link className='link' to={"/radiographer/dashboard"}>
          <Dashboard className='sidebar-icon'/>
          <span className='item-name'>Dashboard</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/radiographer/request-list"}>
          <Dashboard className='sidebar-icon'/>
          <span className='item-name'>Add Diagnosis Report</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/radiographer/scan-reports"}>
          <Dashboard className='sidebar-icon'/>
          <span className='item-name'>Manage Results</span>
          </Link>
        </div>
        <div className='item'>
         <Link className='link' to={"/radiographer/profile"}>
         <Person className='sidebar-icon'/>
         <span className='item-name'>Profile</span>
         </Link>
        </div>
      </div>
      <div style={{
          marginTop:'10%',
          marginRight:'10%'
        }}>
          <LogoutBtn/>
      </div>
    </div>
  )
}

export default RadiographerSidebar;
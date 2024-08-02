import React from 'react';
import "./style.css";
import { Dashboard,
        Logout, 
        Settings, 
        Person, 
        Science, 
        LocalPharmacy,
        MedicalServices,
        PeopleAlt,
        Bloodtype,
        ArrowDropDown,
        PersonAdd,
        Healing } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import LogoutBtn from '../Buttons/LogoutBtn';


const PharmacistSidebar = () => {

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
          <Link className='link' to={"/pharmacist/dashboard"}>
          <Dashboard className='sidebar-icon'/>
          <span className='item-name'>Dashboard</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/pharmacist/medicine-category"}>
          <Dashboard className='sidebar-icon'/>
          <span className='item-name'>Medicine Category</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/pharmacist/medicine-list"}>
          <Dashboard className='sidebar-icon'/>
          <span className='item-name'>Manage Medicine</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/pharmacist/prescription-list"}>
          <Dashboard className='sidebar-icon'/>
          <span className='item-name'>Provide Medication</span>
          </Link>
        </div>
        <div className='item'>
         <Link className='link' to={"/pharmacist/profile"}>
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

export default PharmacistSidebar;
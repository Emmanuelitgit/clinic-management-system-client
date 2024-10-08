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


const LaboratoristSidebar = () => {

  const profile = localStorage?.getItem("profile")

  return (
    <div className='sidebar-container'>
      <div className='sidebar-items-container'>
       <Link to={'/pharmacist/profile'} className='link'>
         <div className='item'>
         {(profile ==='null' || profile ==='' || profile ===null)?  <img 
            className='sidebar-img'
            src={require(`../../uploads/default.png`)}
            />:
            <img 
            className='sidebar-img'
            src={require(`../../uploads/${profile}`)}
            />
          }
        </div>
        </Link>
        <div className='item'>
          <Link className='link' to={"/laboratorist/dashboard"}>
          <Dashboard className='sidebar-icon'/>
          <span className='item-name'>Dashboard</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/laboratorist/request-list"}>
          <Dashboard className='sidebar-icon'/>
          <span className='item-name'>Add Diagnosis Report</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/laboratorist/lab-result"}>
          <Dashboard className='sidebar-icon'/>
          <span className='item-name'>Manage Result</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/laboratorist/blood-bank"}>
          <Dashboard className='sidebar-icon'/>
          <span className='item-name'>Manage Blood Bank</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/laboratorist/blood-donor"}>
          <Dashboard className='sidebar-icon'/>
          <span className='item-name'>Manage Blood Donor</span>
          </Link>
        </div>
        <div className='item'>
         <Link className='link' to={"/laboratorist/profile"}>
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

export default LaboratoristSidebar;
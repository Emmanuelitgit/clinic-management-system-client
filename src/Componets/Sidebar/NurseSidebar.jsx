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


const NurseSidebar = () => {

  const profile = localStorage?.getItem("profile")

  return (
    <div className='sidebar-container'>
      <div className='sidebar-items-container'>
       <Link to={'/nurse/profile'} className='link'>
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
          <Link className='link' to={"/nurse/dashboard"}>
          <Dashboard className='sidebar-icon'/>
          <span className='item-name'>Dashboard</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/nurse/patient-list"}>
          <PersonAdd className='sidebar-icon'/>
          <span className='item-name'>Manage Patient</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/nurse/vital-list"}>
          <PersonAdd className='sidebar-icon'/>
          <span className='item-name'>Manage Vitals</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/nurse/appointment-list"}>
          <Healing className='sidebar-icon'/>
          <span className='item-name'>Manage Appointment</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/nurse/bed-allotment-list"}>
          <PeopleAlt className='sidebar-icon'/>
          <span className='item-name'>Bed Allotment</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/nurse/bed-list"}>
          <PeopleAlt className='sidebar-icon'/>
          <span className='item-name'>Manage Bed</span>
          </Link>
        </div>
        <div className='item'>
         <Link className='link' to={"/nurse/blood-bank"}>
         <MedicalServices className='sidebar-icon'/>
         <span className='item-name'>Manage Blood Bank</span>
         </Link>
        </div>
        <div className='item'>
         <Link className='link' to={"/nurse/blood-donor-list"}>
         <MedicalServices className='sidebar-icon'/>
         <span className='item-name'>Manage Blood Donor</span>
         </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/nurse/birth-report"}>
          <LocalPharmacy className='sidebar-icon'/>
          <span className='item-name'>Birth Report</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/nurse/death-report"}>
          <LocalPharmacy className='sidebar-icon'/>
          <span className='item-name'>Death Report</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/nurse/operation-report"}>
          <LocalPharmacy className='sidebar-icon'/>
          <span className='item-name'>Operation Report</span>
          </Link>
        </div>
        <div className='item'>
         <Link className='link' to={"/nurse/profile"}>
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

export default NurseSidebar;
import React, { useEffect } from 'react';
import "./style.css";
import { Dashboard,
        Share, Logout, Settings, Person, Science, LocalPharmacy,MedicalServices,PeopleAlt,
        Bloodtype,ArrowDropDown,PersonAdd,Healing, Payment, Bed, ChildCare,
        MedicalInformation,} from '@mui/icons-material';
import  LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import AddCardIcon from '@mui/icons-material/AddCard';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Collapse } from '@mui/material';
import LogoutBtn from '../Buttons/LogoutBtn';
import { useDispatch, useSelector } from 'react-redux';
import { handleSidebarToggle } from '../../store/modalState';



const AdminSidebar = () => {

  const [visible, setVisible] = useState(false)
  const sidebarVisible = useSelector((state)=>state.modal?.sidebar_toggle);
  const profile = localStorage?.getItem("profile")
  const [windowSize, setWindowSize] = useState()


  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setWindowSize(windowWidth);
    };
  
    window.addEventListener('resize', handleResize);
    
    handleResize();
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const dispatch = useDispatch()
  
  const handleToggle = () =>{
    dispatch(handleSidebarToggle())
   }

  return (
    <div className={sidebarVisible && windowSize < 1000? 'sidebar-toggle' : 'sidebar-container'}>
      <div className='sidebar-items-container'>
        <Link to={'/admin/profile'} className='link'>
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
          <Link to={"/admin/dashboard"} className='link' onClick={handleToggle}>
          <Dashboard className='sidebar-icon'/>
          <span className='item-name'>Dashboard</span>
          </Link>
        </div>
        <div className='item'>
          <Link to={"/admin/department-list"} className='link' onClick={handleToggle}>
          <PersonAdd className='sidebar-icon'/>
          <span className='item-name'>Department</span>
          </Link>
        </div>
        <div className='item'>
          <Link to={"/admin/patient-list"} className='link' onClick={handleToggle}>
          <Healing className='sidebar-icon'/>
          <span className='item-name'>Patient</span></Link>
        </div>
        <div className='item'>
          <Link to={"/admin/doctor-list"} className='link' onClick={handleToggle}>
          <PeopleAlt className='sidebar-icon'/>
          <span className='item-name'>Doctor</span></Link>
        </div>
        <div className='item'>
          <Link to={"/admin/nurse-list"} className='link' onClick={handleToggle}>
          <MedicalServices className='sidebar-icon'/>
          <span className='item-name'>Nurse</span></Link>
        </div>
        <div className='item'>
          <Link to={"/admin/pharmacist-list"} className='link' onClick={handleToggle}>
          <LocalPharmacy className='sidebar-icon'/>
          <span className='item-name'>Pharmacist</span></Link>
        </div>
        <div className='item'>
          <Link to={"/admin/laboratorist-list"} className='link' onClick={handleToggle}>
          <Science className='sidebar-icon'/>
          <span className='item-name'>Laboratorist</span></Link>
        </div>
        <div className='item'>
          <Link to={"/admin/radiographer-list"} className='link' onClick={handleToggle}>
          <MonitorWeightIcon className='sidebar-icon'/>
          <span className='item-name'>Radiographer</span></Link>
        </div>
        <div className='item'>
          <Link to={"/admin/accountant-list"} className='link' onClick={handleToggle}>
          <AddCardIcon className='sidebar-icon'/>
          <span className='item-name'>Accountant</span></Link>
        </div>
        <div className='item'>
          <AddToQueueIcon className='sidebar-icon'/>
          <span onClick={() => setVisible(!visible)} className='item-name'>Monitor Hospital</span>
          <ArrowDropDown className='sidebar-icon'/>
        </div>
        <Collapse 
           in={visible} className='dropdown-items-container'
           timeout={"auto"}
           unmountOnExit
           easing="easeInOut"
        >
          <div className="dropdown-items">
          <Link to={"/admin/appointment-list"} className='link' onClick={handleToggle}>
          <Healing className='sidebar-icon'/>
          <span className='item-name'>View Appointment</span>
          </Link>
          </div>
          <div className="dropdown-items">
          <Link to={"/admin/payment-list"} className='link' onClick={handleToggle}>
          <Payment className='sidebar-icon'/>
          <span className='item-name'>View Payment</span>
          </Link>
          </div>
          <div className="dropdown-items">
          <Link to={"/admin/bed-allotment-list"} className='link' onClick={handleToggle}>
          <Bed className='sidebar-icon'/>
          <span className='item-name'>View Bed Allotment</span>
          </Link>
          </div>
          <div className="dropdown-items">
          <Link to={"/admin/medicine-list"} className='link' onClick={handleToggle}>
          <LocalHospitalIcon className='sidebar-icon'/>
          <span className='item-name'>View Medicine</span>
          </Link>
          </div>
          <div className="dropdown-items">
          <Link to={"/admin/blood-bank"} className='link' onClick={handleToggle}>
          <Bloodtype className='sidebar-icon'/>
          <span className='item-name'>View Blood Bank</span>
          </Link>
          </div>
          <div className="dropdown-items">
          <Link to={"/admin/birth-report"} className='link' onClick={handleToggle}>
          <ChildCare className='sidebar-icon'/>
          <span className='item-name'>View Birth Report</span>
          </Link>
          </div>
          <div className="dropdown-items">
          <Link to={"/admin/death-report"} className='link' onClick={handleToggle}>
          <MedicalInformation className='sidebar-icon'/>
          <span className='item-name'>View Death Report</span>
          </Link>
          </div>
          <div className="dropdown-items">
          <Link to={"/admin/operation-report"} className='link' onClick={handleToggle}>
          <ContentCutIcon className='sidebar-icon'/>
          <span className='item-name'>View Operation Report</span>
          </Link>
          </div>
        </Collapse>
        <div className='item' style={{marginTop: visible ? "300px" : "0px"}}>
         <Link to={"/admin/settings"} className='link' onClick={handleToggle}>
         <Settings className='sidebar-icon'/>
          <span className='item-name'>Settings</span>
         </Link>
        </div>
        <div className='item'>
          <Link to={"/admin/profile"} className='link' onClick={handleToggle}>
          <Person className='sidebar-icon'/>
          <span className='item-name'>Profile</span></Link>
        </div>
      </div>
        <div style={{
          marginTop:'10%',
          marginRight:'10%'
        }}>
          <LogoutBtn visible={visible}/>
        </div>
    </div>
  )
}

export default AdminSidebar



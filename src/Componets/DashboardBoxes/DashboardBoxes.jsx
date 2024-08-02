import React from 'react'
import "./style.css";
import Calender from '../Calender/Calender';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStaff } from '../../store/data';
import AdminBoxes from './AdminBoxes';
import DoctorBoxes from './DoctorBoxes';
import NurseBoxes from './NurseBoxes';
import PharmacistBoxes from './PharmacistBoxes';
import AccountantBoxes from './AccountantBoxes';
import LaboratoristBoxes from './LabaoratoristBoxes';
import RadiographerBoxes from './RadiographerBoxes';

const DashboardBoxes = () => {


    // const role = useSelector((state) => state.auth?.role?.toLowerCase());
    const dispatch = useDispatch()
    const role = localStorage.getItem('role').toLowerCase()



    useEffect(()=>{
        dispatch(getStaff())
       },[])

  return (
    <div className=''>
        <AdminBoxes/>  
        <DoctorBoxes/>
        <NurseBoxes/>
        <PharmacistBoxes/>
        <AccountantBoxes/>
        <LaboratoristBoxes/>
        <RadiographerBoxes/>

        { (role === "doctor" || role === "nurse") && <div className="doctor-nurse-horizontal-line"></div> } 
        { (role !== "admin" && role !== "doctor" && role !== "nurse") && <div className="other-horizontal-line"></div> } 

        <div className="footer-text-container">
        </div>
       {role !== "admin" &&
          <Calender/>
       }

    </div>
  )
}

export default DashboardBoxes
import React from 'react'
import "./style.css";
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getStaff } from '../../store/data';
import { depCountActions } from '../../store/depCount';


const Panelbar = () => {

  const dispatch = useDispatch()
  const location = useLocation();
  const route = location.pathname.split("/")[2];
  const getAllStaff = useSelector((state)=>state.data?.staff)
  const dep = useSelector(state => state.count?.depValue) || [2];
  const newRoute = route?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const doctor = getAllStaff.filter((data) => data?.role?.toLowerCase() === "doctor");
  const nurse = getAllStaff.filter((data) => data?.role?.toLowerCase() === "nurse");
  const laboratorist = getAllStaff.filter((data) => data?.role?.toLowerCase() === "laboratorist");
  const pharmacist = getAllStaff.filter((data) => data?.role?.toLowerCase() === "pharmacist");
  const radiographer = getAllStaff.filter((data) => data?.role?.toLowerCase() === "radiographer");
  const accountant = getAllStaff.filter((data) => data?.role?.toLowerCase() === "accountant");

  useEffect(()=>{
    dispatch(getStaff())
   },[dep])


  return (
    <div className='panel-main-container'>
    <div className='panel-container'>
        <div className='panel-type-container'>
            <h3 className='panel-type-name'>{newRoute}</h3>
        </div>
        <div className='panels-container'>
            <div className='panel-name-container'>
                <span className='panel-name'>Doctor</span>
                <span className='panel-value' style={{color:'brown'}}>{doctor.length}</span>
            </div>
            <div className="vertical-line"></div>
            <div className='panel-name-container'>
                <span className='panel-name'>Nurse</span>
                <span className='panel-value' style={{color:'darkblue'}}>{nurse.length}</span>
            </div>
            <div className="vertical-line"></div>
            <div className='panel-name-container'>
                <span className='panel-name'>Pharmacist</span>
                <span className='panel-value' style={{color:'green'}}>{pharmacist.length}</span>
            </div>
            <div className="vertical-line"></div>
            <div className='panel-name-container'>
                <span className='panel-name'>Laboratorist</span>
                <span className='panel-value'>{laboratorist.length}</span>
            </div>
            <div className="vertical-line"></div>
            <div className='panel-name-container'>
                <span className='panel-name'>Radiographer</span>
                <span className='panel-value' style={{color:'steelblue'}}>{radiographer.length}</span>
            </div>
            <div className="vertical-line"></div>
            <div className='panel-name-container'>
                <span className='panel-name'>Accountant</span>
                <span className='panel-value' style={{color:'purple'}}>{accountant.length}</span>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Panelbar
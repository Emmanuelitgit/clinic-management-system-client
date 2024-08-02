import React from 'react'
import "./style.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStaff, getPatients, getReports } from '../../store/data';
import { depCountActions } from '../../store/depCount';


const AdminBoxes = () => {


    // const role = useSelector((state) => state.auth?.role?.toLowerCase());
    const dispatch = useDispatch()
    const role = localStorage.getItem('role').toLowerCase()
    const getAllStaff = useSelector((state)=>state.data?.staff)
    const patients = useSelector((state)=>state.data?.patients)
    const reports = useSelector((state)=>state.data?.reports)
    const dep = useSelector(state => state.count?.depValue) || [2];


    const doctor = getAllStaff?.filter((data) => data?.role?.toLowerCase() === "doctor");
    const nurse = getAllStaff?.filter((data) => data?.role?.toLowerCase() === "nurse");
    const laboratorist = getAllStaff?.filter((data) => data?.role?.toLowerCase() === "laboratorist");
    const pharmacist = getAllStaff?.filter((data) => data?.role?.toLowerCase() === "pharmacist");
    const radiographer = getAllStaff?.filter((data) => data?.role?.toLowerCase() === "radiographer");
    const accountant = getAllStaff?.filter((data) => data?.role?.toLowerCase() === "accountant");
    


    useEffect(()=>{
        dispatch(getStaff())
       },[dep]);

    useEffect(()=>{
        dispatch(getPatients())
       },[dep]);

    useEffect(()=>{
        dispatch(getReports())
       },[dep])

   const adminBoxes = [
        {
        id:1,
        name:"Doctor",
        background:"bg-primary",
        link:'/admin/doctor-list',
        total: doctor?.length
      },
      {
        id:2,
        name:"Nurse",
        background:"bg-warning",
        link:'/admin/nurse-list',
        total: nurse?.length
      },
      {
        id:3,
        name:"Patient",
        background:"bg-success",
        link:'/admin/patient-list',
        // total: patients?.length
      },
      {
        id:4,
        name:"Pharmacist",
        background:"purple",
        link:'/admin/pharmacist-list',
        total: pharmacist?.length
      },
      {
        id:5,
        name:"Laboratorist",
        background:"bg-danger",
        link:'/admin/laboratorist-list',
        total: laboratorist?.length
      },
      {
        id:6,
        name:"Accountant",
        background:"teal",
        link:'/admin/accountant-list',
        total: accountant?.length
      },
      {
        id:7,
        name:"Radiographer",
        background:"brown",
        link:'/admin/radiographer-list',
        total: radiographer?.length
      },
      {
        id:8,
        name:"Reports",
        background:"bg-info",
        link:'/admin/birth-report',
        total: reports?.length
      },  
      ]

  return (
    <div className=''>

        {role === "admin" &&
        <div class="row">
            {adminBoxes?.map((box)=>(
            <div className="col-xl-3 col-md-6">
                <div className={`card ${box?.background} text-white mb-4`} style={{
                    height:'14.5vh'
                }}>
                    <div class="card-body">
                        <span className='text-lg'>{box?.name}</span>
                        <span style={{
                             position:"absolute",
                             top:"10%",
                             left:'80%',
                             fontSize:'18px',
                             fontWeight:600
                        }}>{box.total}</span>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="text-sm text-white stretched-link" href={box?.link}>View Details</a>
                        <div class="text-sm text-white"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            ))}
            </div>
            }
    </div>
  )
}

export default AdminBoxes
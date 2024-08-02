import React from 'react'
import "./style.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBloodGroup, getLabResult, getBloodDonors} from '../../store/data';


const LaboratoristBoxes = () => {


    // const role = useSelector((state) => state.auth?.role?.toLowerCase());
    const dispatch = useDispatch()
    const role = localStorage.getItem('role').toLowerCase()

    const bloodBank = useSelector((state)=>state?.data?.bloodBank);
    const dep = useSelector(state => state.count?.depValue) || [2];
    const labResult = useSelector(state => state?.data?.labResult)
    const bloodDonors = useSelector(state => state?.data?.bloodDonors)


    useEffect(()=>{
        dispatch(getBloodGroup())
       },[dep]);

    useEffect(()=>{
        dispatch(getLabResult("lab"))
       },[dep]);

    useEffect(()=>{
        dispatch(getBloodDonors())
       },[dep]);

  const laboratoristBoxes = [
    {
      id:6,
      name:"Add Diagnosis Report",
      background:"bg-primary",
      link:'/laboratorist/request-list',
      total: ''
    },
    {
      id:10,
      name:"Lab Result",
      background:"bg-warning",
      link:'/laboratorist/lab-result',
      total: labResult?.length
    },
  {
    id:7,
    name:"Blood Bank",
    background:"bg-success",
    link:'/laboratorist/blood-bank',
    total: bloodBank?.length
  },
  {
    id:9,
    name:"Blood Donor",
    background:"purple",
    link:'/laboratorist/blood-donor',
    total: bloodDonors?.length
  },
  ]

  return (
    <div className=''>
        {role === "laboratorist" &&
        <div class="row">
            {laboratoristBoxes?.map((box)=>(
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

export default LaboratoristBoxes
import React from 'react'
import "./style.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLabResult} from '../../store/data';

const RadiographerBoxes = () => {


    // const role = useSelector((state) => state.auth?.role?.toLowerCase());
    const dispatch = useDispatch()
    const role = localStorage.getItem('role').toLowerCase()
    const dep = useSelector(state => state?.count?.depValue) || [2];
    const scanResult = useSelector(state => state?.data?.labResult)

    useEffect(()=>{
        dispatch(getLabResult("scan"))
       },[dep]);

     const radiographerBoxes = [
        {
          id:6,
          name:"Add Diagnosis Report",
          background:"bg-primary",
          link:'/radiographer/request-list',
          total: ''
        },
      {
        id:7,
        name:"View Reports",
        background:"bg-warning",
        link:'/radiographer/scan-reports',
        total: scanResult?.length
      },
      ]

  return (
    <div className=''>
        {role === "radiographer" &&
        <div class="row">
            {radiographerBoxes?.map((box)=>(
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
                        }}>{box?.total}</span>
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

export default RadiographerBoxes
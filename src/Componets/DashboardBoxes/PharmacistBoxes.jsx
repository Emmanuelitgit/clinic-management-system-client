import React from 'react'
import "./style.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMedicineCategories, getMedicineList, getPrescriptionCountForPharmacist } from '../../store/data';



const PharmacistBoxes = () => {


    // const role = useSelector((state) => state.auth?.role?.toLowerCase());
    const dispatch = useDispatch()
    const role = localStorage.getItem('role').toLowerCase()
    const dep = useSelector(state => state?.count?.depValue) || [2];
    const medicineCategories = useSelector((state)=>state?.data?.medicineCategories);
    const medicineList = useSelector((state)=>state?.data?.medicineList);
    const prescriptions = useSelector((state)=>state?.data?.prescCountPharmacist);


    useEffect(()=>{
        dispatch(getMedicineCategories())
    }, [dep]);

    useEffect(()=>{
        dispatch(getMedicineList())
    }, [dep]);

    useEffect(()=>{
        dispatch(getPrescriptionCountForPharmacist())
    }, [dep]);


    const pharmacistBoxes = [
        {
          id:6,
          name:"Medicine Category",
          background:"bg-primary",
          link:'/pharmacist/medicine-category',
          total: medicineCategories?.length
        },
      {
        id:7,
        name:"Manage Medicine",
        background:"bg-warning",
        link:'/pharmacist/medicine-list',
        total: medicineList?.length
      },
      {
        id:9,
        name:"Provide Medication",
        background:"bg-success",
        link:'/pharmacist/prescription-list',
        total: prescriptions?.length
      },
      ]

  return (
    <div className=''>
       {role === "pharmacist" &&
        <div class="row">
            {pharmacistBoxes?.map((box)=>(
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

export default PharmacistBoxes
import React, { useEffect, useState } from 'react'
import doctor from "../../Componets/images/staff/doctor 1.png";
import { useLocation } from 'react-router-dom';
import api from '../../api';


const ViewMedicine = () => {

    const[data, setData] = useState()
    const location = useLocation();
    const id = location.pathname.split("/")[3];
    let medicine_name = data?.map((d)=>d?.name)


    useEffect(()=>{
        const getStaff = async()=>{
            try {
              const response = await api.get(`/medicine/${id}`, {
                withCredentials: true,
            });

            const fetchedData = response.data;
            setData(fetchedData)
            } catch (error) {
                console.log(error)
            }
        }
        getStaff()
    }, [])

  return (
    <div className='view-result-container'>
            <h3 className='result-title'>Medicine Category ({medicine_name})</h3>
                <div className="medical-history-container">
                <table className='medical-history-table'>
                  <thead className='table-head'>
                     <tr className='medical-history-td-tr view-patient-tr'>
                         <th className='view-patient-th '>Medicine Description</th>
                         <th className='view-patient-th '>Category</th>
                         <th className='view-patient-th '>Price</th>
                         <th className='view-patient-th '>Manufacturer</th>
                         <th className='view-patient-th '>Status</th>
                     </tr>
                   </thead>
                   <tbody>
                     {data?.map((medicine)=>(
                     <tr className='medical-history-td-tr view-patient-tr' key={medicine.medicine_id}>
                       <td className='medical-history-td-tr'>{medicine.description}</td>
                       <td className='medical-history-td-tr'>{medicine.category}</td>
                       <td className='medical-history-td-tr'>{medicine.price}</td>
                       <td className='medical-history-td-tr'>{medicine.manufacturer}</td>
                       <td className='medical-history-td-tr'>{medicine.status}</td>
                     </tr>
                     ))}
                   </tbody>
                </table>
             </div>  
    </div>
  )
}

export default ViewMedicine
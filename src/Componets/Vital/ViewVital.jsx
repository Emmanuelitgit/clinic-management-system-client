import React, { useEffect, useState } from 'react'
import doctor from "../../Componets/images/staff/doctor 1.png";
import { useLocation } from 'react-router-dom';
import api from '../../api';


const ViewVital = () => {

    const[data, setData] = useState()
    const location = useLocation();
    const id = location.pathname.split("/")[3];
    let names = data?.map((d)=>d?.patient_name)

    names = Array.isArray(names) ? names : [names];

    let patient_name = null;
    for (const name of names) {
        if (name?.includes(' ')) {
            patient_name = name;
            break;
        }
    }
 

    useEffect(()=>{
        const getStaff = async()=>{
            try {
              const response = await api.get(`/vital/${id}`, {
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
            <h3 className='result-title'>Vital's History ({patient_name})</h3>
                <div className="medical-history-container">
                <table className='medical-history-table'>
                  <thead className='table-head'>
                     <tr className='medical-history-td-tr view-patient-tr'>
                         <th className='view-patient-th '>Nurse's Comment</th>
                         <th className='view-patient-th '>BP</th>
                         <th className='view-patient-th '>Temperature</th>
                         <th className='view-patient-th '>Height</th>
                         <th className='view-patient-th '>Date</th>
                     </tr>
                   </thead>
                   <tbody>
                     {data?.map((vital)=>(
                     <tr className='medical-history-td-tr view-patient-tr' key={vital.vital_id}>
                       <td className='medical-history-td-tr'>{vital.comment}</td>
                       <td className='medical-history-td-tr'>{vital.bp_level}</td>
                       <td className='medical-history-td-tr'>{vital.temperature}</td>
                       <td className='medical-history-td-tr'>{vital.height}</td>
                       <td className='medical-history-td-tr'>{vital.date}</td>
                     </tr>
                     ))}
                   </tbody>
                </table>
             </div>  
    </div>
  )
}

export default ViewVital
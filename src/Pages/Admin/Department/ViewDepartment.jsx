import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import api from '../../../api';


const ViewDepartment = () => {

    const[data, setData] = useState()
    const location = useLocation();
    const id = location.pathname.split("/")[3]; 
   

    useEffect(()=>{
        const getStaff = async()=>{
            try {
              const response = await api.get(`/department/${id}`, {
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
            <h3 className='result-title'>Department Detail</h3>
            <div className="medical-history-container">
               <table className='medical-history-table'>
                 <thead className='table-head'>
                    <tr className='medical-history-td-tr view-patient-tr'>
                        <th className='view-patient-th '>Description</th>
                        <th className='view-patient-th '>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((department)=>(
                    <tr className='medical-history-td-tr view-patient-tr' key={department.department_id}>
                       <td className='medical-history-td-tr'>{department.description}</td>
                       <td className='medical-history-td-tr'>{department.name}</td>
                   </tr>
                    ))}
                  </tbody>
               </table>
            </div>  
    </div>
  )
}

export default ViewDepartment
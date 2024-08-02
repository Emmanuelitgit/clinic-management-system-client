import React, { useEffect, useState } from 'react'
import doctor from "../../Componets/images/staff/doctor 1.png";
import { useLocation } from 'react-router-dom';


const ViewBed = () => {

    const[data, setData] = useState()
    const location = useLocation();
    const id = location.pathname.split("/")[3];
    let bed_number = data?.map((d)=>d?.bed_number)

 

    useEffect(()=>{
        const getStaff = async()=>{
            try {
            const response = await fetch(`http://localhost:5000/bed/${id}`, {
              method: 'GET',
              credentials: 'include', // Important for including cookies
          })
            if(!response.ok){
            console.log("faild to fetch data...")
            }
            console.log(response)
            const fetchedData = await response.json()
            setData(fetchedData)
            } catch (error) {
                console.log(error)
            }
        }
        getStaff()
    }, [])

  return (
    <div className='view-result-container'>
            <h3 className='result-title'>Bed Details ({bed_number})</h3>
                <div className="medical-history-container">
                <table className='medical-history-table'>
                  <thead className='table-head'>
                     <tr className='medical-history-td-tr view-patient-tr'>
                         <th className='view-patient-th '>Bed Description</th>
                         <th className='view-patient-th '>Type</th>
                         <th className='view-patient-th '>Number</th>
                         <th className='view-patient-th '>Status</th>
                         <th className='view-patient-th '>Location</th>
                     </tr>
                   </thead>
                   <tbody>
                     {data?.map((bed)=>(
                     <tr className='medical-history-td-tr view-patient-tr' key={bed.bed_id}>
                       <td className='medical-history-td-tr'>{bed.description}</td>
                       <td className='medical-history-td-tr'>{bed.bed_type}</td>
                       <td className='medical-history-td-tr'>{bed.bed_number}</td>
                       <td className='medical-history-td-tr'>{bed.status}</td>
                       <td className='medical-history-td-tr'>{bed.location}</td>
                     </tr>
                     ))}
                   </tbody>
                </table>
             </div>  
    </div>
  )
}

export default ViewBed
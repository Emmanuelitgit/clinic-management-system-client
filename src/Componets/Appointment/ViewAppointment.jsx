import React, { useEffect, useState } from 'react'
import doctor from "../../Componets/images/staff/doctor 1.png";
import { useLocation } from 'react-router-dom';


const ViewAppointment = () => {

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

    const getText = (html) =>{
      const doc = new DOMParser().parseFromString(html, "text/html")
      return doc.body.textContent
   }
 

    useEffect(()=>{
        const getStaff = async()=>{
            try {
            const response = await fetch(`http://localhost:5000/appointment/${id}`, {
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
            <h3 className='result-title'>Appointment History ({patient_name})</h3>
                <div className="medical-history-container">
                <table className='medical-history-table'>
                  <thead className='table-head'>
                     <tr className='medical-history-td-tr view-patient-tr'>
                         <th className='view-patient-th '>Appointment Reason</th>
                         <th className='view-patient-th '>Title</th>
                         <th className='view-patient-th '>Doctor</th>
                         <th className='view-patient-th '>Date</th>
                     </tr>
                   </thead>
                   <tbody>
                     {data?.map((appointment)=>(
                      <tr className='medical-history-td-tr view-patient-tr' key={appointment.appointment_id}>
                         <td className='medical-history-td-tr'>{getText(appointment.description)}</td>
                         <td className='medical-history-td-tr'>{appointment.title}</td>
                         <td className='medical-history-td-tr'>{appointment.doctor_name}</td>
                         <td className='medical-history-td-tr'>{appointment.date}</td>
                      </tr>
                     ))}
                   </tbody>
                </table>
             </div>  
    </div>
  )
}

export default ViewAppointment
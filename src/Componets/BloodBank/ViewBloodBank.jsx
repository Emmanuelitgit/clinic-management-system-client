import React, { useEffect, useState } from 'react'
import doctor from "../../Componets/images/staff/doctor 1.png";
import { useLocation } from 'react-router-dom';


const ViewBloodBank = () => {

    const[data, setData] = useState()
    const location = useLocation();
    const id = location.pathname.split("/")[3];
    let blood_group = data?.map((d)=>d?.blood_group)

    const getText = (html) =>{
      const doc = new DOMParser().parseFromString(html, "text/html")
      return doc.body.textContent
   }

    useEffect(()=>{
        const getStaff = async()=>{
            try {
            const response = await fetch(`http://localhost:5000/blood_bank/${id}`,  {
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
            <h3 className='result-title'>Blood Bank ({blood_group})</h3>
                <div className="medical-history-container">
                <table className='medical-history-table'>
                  <thead className='table-head'>
                     <tr className='medical-history-td-tr view-patient-tr'>
                         <th className='view-patient-th '>Description</th>
                         <th className='view-patient-th '>Status</th>
                         <th className='view-patient-th '>Group</th>
                     </tr>
                   </thead>
                   <tbody>
                     {data?.map((blood)=>(
                     <tr className='medical-history-td-tr view-patient-tr' key={blood.blood_bank_id}>
                       <td className='medical-history-td-tr'>{getText(blood.description)}</td>
                       <td className='medical-history-td-tr'>{blood.status}</td>
                       <td className='medical-history-td-tr'>{blood.blood_group}</td>
                     </tr>
                     ))}
                   </tbody>
                </table>
             </div>  
    </div>
  )
}

export default ViewBloodBank
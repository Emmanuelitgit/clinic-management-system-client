import React, { useEffect, useState } from 'react'
import doctor from "../../Componets/images/staff/doctor 1.png";
import { useLocation } from 'react-router-dom';


const ViewDonor = () => {

    const[data, setData] = useState()
    const location = useLocation();
    const id = location.pathname.split("/")[3];
    let donor_name = data?.map((d)=>d?.name)

    const getText = (html) =>{
      const doc = new DOMParser().parseFromString(html, "text/html")
      return doc.body.textContent
   }

    useEffect(()=>{
        const getStaff = async()=>{
            try {
            const response = await fetch(`http://localhost:5000/blood_donor/${id}`,  {
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
            <h3 className='result-title'>Donor Credentials ({donor_name})</h3>
                <div className="medical-history-container">
                <table className='medical-history-table'>
                  <thead className='table-head'>
                     <tr className='medical-history-td-tr view-patient-tr'>
                         <th className='view-patient-th '>Nurse's Comment</th>
                         <th className='view-patient-th '>Email</th>
                         <th className='view-patient-th '>Age</th>
                         <th className='view-patient-th '>Sex</th>
                         <th className='view-patient-th '>Blood Group</th>
                         <th className='view-patient-th '>Date</th>
                     </tr>
                   </thead>
                   <tbody>
                     {data?.map((donor)=>(
                     <tr className='medical-history-td-tr view-patient-tr' key={donor.blood_donor_id}>
                       <td className='medical-history-td-tr'>{getText(donor.comment)}</td>
                       <td className='medical-history-td-tr'>{donor.email}</td>
                       <td className='medical-history-td-tr'>{donor.age}</td>
                       <td className='medical-history-td-tr'>{donor.sex}</td>
                       <td className='medical-history-td-tr'>{donor.blood_group}</td>
                       <td className='medical-history-td-tr'>{donor.last_donation_date}</td>
                     </tr>
                     ))}
                   </tbody>
                </table>
             </div>  
    </div>
  )
}

export default ViewDonor
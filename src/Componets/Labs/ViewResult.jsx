import React, { useEffect, useState } from 'react'
import doctor from "../../Componets/images/staff/doctor 1.png";
import { useLocation } from 'react-router-dom';


const ViewBloodBank = () => {

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
            const response = await fetch(`http://localhost:5000/lab_result/${id}`, {
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
            <h3 className='result-title'>Lab Result ({patient_name})</h3>
                <div className="medical-history-container">
                <table className='medical-history-table'>
                  <thead className='table-head'>
                     <tr className='medical-history-td-tr view-patient-tr'>
                         <th className='view-patient-th '>Lab Result</th>
                         <th className='view-patient-th '>Test Name</th>
                         <th className='view-patient-th '>Laboratorist</th>
                         <th className='view-patient-th '>Date</th>
                     </tr>
                   </thead>
                   <tbody>
                   {data?.map((lab)=>(
                     <tr className='medical-history-td-tr view-patient-tr'>
                         <td className='medical-history-td-tr'>{getText(lab.test_report)}</td>
                         <td className='medical-history-td-tr'>{lab.test_name}</td>
                         <td className='medical-history-td-tr'>{lab.laboratorist_name}</td>
                         <td className='medical-history-td-tr'>{lab.laboratorist_name}</td>
                     </tr>
                      ))}
                   </tbody>
                </table>
             </div>  
    </div>
  )
}

export default ViewBloodBank
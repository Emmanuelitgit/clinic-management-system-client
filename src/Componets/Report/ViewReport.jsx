import React, { useEffect, useState } from 'react'
import doctor from "../../Componets/images/staff/doctor 1.png";
import { useLocation } from 'react-router-dom';
import api from '../../api';


const ViewReport = () => {

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
              const response = await api.get(`/report/${id}`, {
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
            <h3 className='result-title'>Birth, Death and Operation Report ({patient_name})</h3>
             <div className="medical-history-container">
             <table className='medical-history-table'>
               <thead className='table-head'>
                  <tr className='medical-history-td-tr view-patient-tr'>
                      <th className='view-patient-th '>Report Case</th>
                      <th className='view-patient-th '>Type</th>
                      <th className='view-patient-th '>Practioner</th>
                      <th className='view-patient-th '>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((report)=>(
                    <tr className='medical-history-td-tr view-patient-tr' key={report.report_id}>
                    <td className='medical-history-td-tr'>{getText(report.description)}</td>
                    <td className='medical-history-td-tr'>{report.report_type}</td>
                    <td className='medical-history-td-tr'>{report.doctor_name}</td>
                    <td className='medical-history-td-tr'>{report.date}</td>
                </tr>
                  ))}
                </tbody>
             </table>
          </div>  
    </div>
  )
}

export default ViewReport
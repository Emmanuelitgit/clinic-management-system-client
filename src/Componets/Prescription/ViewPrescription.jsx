import React, { useEffect, useState } from 'react'
import doctor from "../../Componets/images/staff/doctor 1.png";
import { useLocation } from 'react-router-dom';
import api from '../../api';
import PrintIcon from '@mui/icons-material/Print';
import { saveAs } from 'file-saver';


const ViewPrescription = () => {

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
   
   const handleDownloadPDF = () => {
    console.log(data)
      api.post('/create-prescription-pdf', data)
        .then(() => api.get('fetch-prescription-pdf', { responseType: 'blob' }))
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
  
          saveAs(pdfBlob, 'prescription.pdf');
        })
    }

    useEffect(()=>{
        const getStaff = async()=>{
            try {
              const response = await api.get(`prescription/${id}`, {
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
            <h3 className='result-title'>Prescription History ({patient_name})</h3>
            <div className="medical-history-container">
               <table className='medical-history-table'>
                 <thead className='table-head'>
                    <tr className='medical-history-td-tr view-patient-tr'>
                        <th className='view-patient-th '>Remarks</th>
                        <th className='view-patient-th '>Medicine</th>
                        <th className='view-patient-th '>Dosage</th>
                        <th className='view-patient-th '>Duration</th>
                        <th className='view-patient-th '>Status</th>
                        <th className='view-patient-th '>Payment</th>
                        <th className='view-patient-th '>Doctor</th>
                        <th className='view-patient-th '>Date</th>
                        <th className='view-patient-th '>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((prescription)=>(
                    <tr className='medical-history-td-tr view-patient-tr' key={prescription.prescription_id}>
                       <td className='medical-history-td-tr'>{getText(prescription.description)}</td>
                       <td className='medical-history-td-tr'>{prescription.medication}</td>
                       <td className='medical-history-td-tr'>{prescription.dosage}</td>
                       <td className='medical-history-td-tr'>{prescription.duration}</td>
                       <td className='medical-history-td-tr'>{prescription.med_status}</td>
                       {prescription.payment_status && <td className='medical-history-td-tr'>{prescription.payment_status}</td>}
                       {!prescription.payment_status && <td className='medical-history-td-tr'>Unpaid</td>}
                       <td className='medical-history-td-tr'>{prescription.doctor_name}</td>
                       <td className='medical-history-td-tr'>{prescription.date}</td>
                       <td className='medical-history-td-tr'>
                       <button onClick={handleDownloadPDF} style={{
                        backgroundColor:"navy",
                        padding:"4px",
                        border:"none",
                        width:"70%",
                        color:"white",
                       }}>
                         <PrintIcon/>
                       </button>
                       </td>
                   </tr>
                    ))}
                  </tbody>
               </table>
            </div>  
    </div>
  )
}

export default ViewPrescription
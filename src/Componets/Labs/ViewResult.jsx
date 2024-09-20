import React, { useEffect, useState } from 'react'
import doctor from "../../Componets/images/staff/doctor 1.png";
import { useLocation } from 'react-router-dom';
import api from '../../api';
import PrintIcon from '@mui/icons-material/Print';
import { saveAs } from 'file-saver';


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

    console.log(data)

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
     }

     const handleDownloadPDF = () => {
        console.log(data)
          api.post('/create-lab-report-pdf', data)
            .then(() => api.get('fetch-lab-report-pdf', { responseType: 'blob' }))
            .then((res) => {
              const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
      
              saveAs(pdfBlob, 'report.pdf');
            })
        }
 
    useEffect(()=>{
        const getStaff = async()=>{
            try {
                const response = await api.get(`/lab_result/${id}`, {
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
            <h3 className='result-title'>Lab Result ({patient_name})</h3>
                <div className="medical-history-container">
                <table className='medical-history-table'>
                  <thead className='table-head'>
                     <tr className='medical-history-td-tr view-patient-tr'>
                         <th className='view-patient-th '>Lab Result</th>
                         <th className='view-patient-th '>Test Name</th>
                         <th className='view-patient-th '>Laboratorist</th>
                         <th className='view-patient-th '>Date</th>
                         <th className='view-patient-th '>Action</th>
                     </tr>
                   </thead>
                   <tbody>
                   {data?.map((lab)=>(
                     <tr className='medical-history-td-tr view-patient-tr'>
                         <td className='medical-history-td-tr'>{getText(lab.test_report)}</td>
                         <td className='medical-history-td-tr'>{lab.test_name}</td>
                         <td className='medical-history-td-tr'>{lab.laboratorist_name}</td>
                         <td className='medical-history-td-tr'>{lab.laboratorist_name}</td>
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

export default ViewBloodBank
import React, { useEffect, useState } from 'react'
import doctor from "../../Componets/images/staff/doctor 1.png";
import { useLocation } from 'react-router-dom';
import api from '../../api';
import { saveAs } from 'file-saver';
import PrintIcon from '@mui/icons-material/Print';


const ViewInvoice = () => {

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
              const response = await api.get(`/invoice/${id}`, {
                withCredentials: true,
            });

            const fetchedData = response.data;
            setData(fetchedData)
            } catch (error) {
                console.log(error)
            }
        }
        getStaff()
    }, []);

  const handleDownloadPDF = () => {
    console.log(data)
      api.post('/create-invoice-pdf', data)
        .then(() => api.get('fetch-invoice-pdf', { responseType: 'blob' }))
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
  
          saveAs(pdfBlob, 'invoice.pdf');
        })
    }

  return (
    <div className='view-result-container'>
            <h3 className='result-title'>Prescription History ({patient_name})</h3>
            <div className="medical-history-container">
               <table className='medical-history-table'>
                 <thead className='table-head'>
                    <tr className='medical-history-td-tr view-patient-tr'>
                        <th className='view-patient-th '>Invoice Description</th>
                        <th className='view-patient-th '>Title</th>
                        <th className='view-patient-th '>Amount</th>
                        <th className='view-patient-th '>Status</th>
                        <th className='view-patient-th '>Accountant</th>
                        <th className='view-patient-th '>Date</th>
                        <th className='view-patient-th '>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((invoice)=>(
                    <tr className='medical-history-td-tr view-patient-tr' key={invoice.invoice_id}>
                       <td className='medical-history-td-tr'>{getText(invoice.description)}</td>
                       <td className='medical-history-td-tr'>{invoice.title}</td>
                       <td className='medical-history-td-tr'>{invoice.amount}</td>
                       <td className='medical-history-td-tr'>{invoice.status}</td>
                       <td className='medical-history-td-tr'>{invoice.accountant_name}</td>
                       <td className='medical-history-td-tr'>{invoice.date}</td>
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

export default ViewInvoice
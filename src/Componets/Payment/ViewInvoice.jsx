import React, { useEffect, useState } from 'react'
import doctor from "../../Componets/images/staff/doctor 1.png";
import { useLocation } from 'react-router-dom';


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

    useEffect(()=>{
        const getStaff = async()=>{
            try {
            const response = await fetch(`http://localhost:5000/invoice/${id}`, {
              method: 'GET',
              credentials: 'include', // Important for including cookies
          })
            if(!response.ok){
            console.log("faild to fetch data...")
            }
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
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((invoice)=>(
                    <tr className='medical-history-td-tr view-patient-tr' key={invoice.invoice_id}>
                       <td className='medical-history-td-tr'>{invoice.description}</td>
                       <td className='medical-history-td-tr'>{invoice.title}</td>
                       <td className='medical-history-td-tr'>{invoice.amount}</td>
                       <td className='medical-history-td-tr'>{invoice.status}</td>
                       <td className='medical-history-td-tr'>{invoice.accountant_name}</td>
                       <td className='medical-history-td-tr'>{invoice.date}</td>
                   </tr>
                    ))}
                  </tbody>
               </table>
            </div>  
    </div>
  )
}

export default ViewInvoice
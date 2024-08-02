import React, { useEffect, useState } from 'react'
import doctor from "../../Componets/images/staff/doctor 1.png";
import { useLocation } from 'react-router-dom';

const ViewPatient = () => {

    const[data, setData] = useState([]);
    const[profile, setProfile] = useState()
    const location = useLocation();
    const id = location.pathname.split("/")[3]; 

    const name = data?.map((d)=>d.name)

    function getFirstWord(str, num) {
        let words = str?.trim().split(/\s+/);
        return words?.length > num ? words[num] : "";
    }
    
    let sentence = name?.toString();
    let firstName = getFirstWord(sentence, 0);
    let lastName = getFirstWord(sentence, 1);

    const getText = (html) =>{
      const doc = new DOMParser().parseFromString(html, "text/html")
      return doc.body.textContent
   }
   
    useEffect(()=>{
        const getStaff = async()=>{
            try {
            const response = await fetch(`http://localhost:5000/patient/${id}`, {
              method: 'GET',
              credentials: 'include', // Important for including cookies
          })
            if(!response.ok){
            console.log("faild to fetch data...")
            }
            const fetchedData = await response.json()
            const { profile } = fetchedData[0];
            setProfile(profile)
            setData(fetchedData)
            } catch (error) {
                console.log(error)
            }
        }
        getStaff()
    }, [])


  return (
    <div className='view-patient-container '>
         <div className='view-patient-sub-container'>
            <div className="view-staff-profile-items">
                {profile && <img src={require(`../../uploads/${profile}`)} alt=""  className='view-staff-profile'/>}
                {!profile && <img src={require(`../../uploads/default.png`)} alt=""  className='view-staff-profile'/>}
             <div style={{display:'flex',flexDirection:'column'}}>
             <span className="view-patient-profile-item ">{name}</span>
             <span className="view-patient-profile-item profile-item-role">(Patient)</span>
             </div>
            </div>
         </div>
         <div className="view-patient-horozontally-line"></div>
         <h3 className='patient-bio-title'>Bio Info:</h3>
            {data?.map((patient)=>(
            <div className='patient-bio-info-container' key={patient.patient_id}>
                <div className="bio-info-items">
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Patient ID:</span>
                    <span>10445445</span>
                  </div>
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>First Name:</span>
                    <span>{firstName}</span>
                  </div>
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Last Name:</span>
                    <span>{lastName}</span>
                  </div>
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Sex:</span>
                    <span>{patient.sex}</span>
                  </div>
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Birth Date:</span>
                    <span>{patient.birth_date}</span>
                  </div>
                </div>
                <div className="bio-info-items">
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Age:</span>
                    <span>{patient.age}</span>
                  </div>
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Blood Group:</span>
                    <span>{patient.blood_group}</span>
                  </div>
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Email:</span>
                    <span>{patient.email}</span>
                  </div>
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Phone:</span>
                    <span>{patient.phone}</span>
                  </div>
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Address</span>
                    <span>{patient.address}</span>
                  </div>
                </div>
            </div>
            ))}
            <h3 className='history-title'>Medical History</h3>
            <div className="medical-history-container">
               <table className='medical-history-table'>
                 <thead className='table-head'>
                    <tr className='medical-history-td-tr view-patient-tr'>
                        <th className='view-patient-th '>Medical Case</th>
                        <th className='view-patient-th '>Doctor</th>
                        <th className='view-patient-th '>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='medical-history-td-tr view-patient-tr'>
                        <td className='medical-history-td-tr'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel laborum ab obcaecati veniam cumque architecto quia atque aliquam facilis necessitatibus laboriosam pariatur quisquam iusto ipsum quibusdam, corporis repellendus suscipit nisi.</td>
                        <td className='medical-history-td-tr'>Emmanuel Yidana</td>
                        <td className='medical-history-td-tr'>02/05/2024</td>
                    </tr>
                    <tr className='medical-history-td-tr view-patient-tr'>
                        <td className='medical-history-td-tr'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel laborum ab obcaecati veniam cumque architecto quia atque aliquam facilis necessitatibus laboriosam pariatur quisquam iusto ipsum quibusdam, corporis repellendus suscipit nisi.</td>
                        <td className='medical-history-td-tr'>Emmanuel Yidana</td>
                        <td className='medical-history-td-tr'>02/05/2024</td>
                    </tr>
                  </tbody>
               </table>
            </div>  
    </div>
  )
}

export default ViewPatient
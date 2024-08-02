import React, { useEffect, useState } from 'react'
import doctor from "../../../Componets/images/staff/doctor 1.png";
import { useLocation } from 'react-router-dom';

const ViewStaff = () => {

    const[data, setData] = useState()
    const location = useLocation();
    const id = location.pathname.split("/")[3]; 

    const role = data?.map((d)=>d.role)
    const name = data?.map((d)=>d.name)

    function getFirstWord(str, num) {
        let words = str?.trim().split(/\s+/);
        return words?.length > num ? words[num] : "";
    }
    
    let sentence = name?.toString();
    let firstName = getFirstWord(sentence, 0);
    let lastName = getFirstWord(sentence, 1);

   
    useEffect(()=>{
        const getStaff = async()=>{
            try {
            const accessToken = localStorage.getItem("token")
            const response = await fetch(`http://localhost:5000/single_staff/${id}`, {
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
    <div className='view-staff-container'>
         <div className='view-staff-sub-container'>
            <div className="view-staff-profile-items">
                <span className="view-staff-profile-item ">{name}</span>
                <img src={doctor} alt=""  className='view-staff-profile'/>
                <span className="view-staff-profile-item profile-item-role">{role}</span>
            </div>
         </div>
         <div className="view-staff-horozontally-line"></div>
         <h3 className='bio-title'>Bio Info:</h3>
            {data?.map((staff)=>(
            <div className='bio-info-container' key={staff.staff_id}>
                <div className="bio-info-items">
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Staff ID:</span>
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
                    <span>Male</span>
                  </div>
                </div>
                <div className="bio-info-items">
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Email:</span>
                    <span>{staff.email}</span>
                  </div>
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Phone:</span>
                    <span>{staff.phone}</span>
                  </div>
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Address</span>
                    <span>{staff.address}</span>
                  </div>
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Department:</span>
                    {staff?.department &&
                      <span>{staff?.department}</span>
                    }
                     {!staff?.department &&
                      <span>None</span>
                    }
                  </div>
                </div>
            </div>
            ))}
    </div>
  )
}

export default ViewStaff
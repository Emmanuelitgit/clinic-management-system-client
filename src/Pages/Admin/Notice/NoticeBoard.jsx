import React from 'react';
import { Menu } from '@mui/icons-material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAppointmentList } from '../../../store/data';


export const NoticeBoard = () => {
  const dispatch = useDispatch()
  const appointments = useSelector((state)=>state.data?.appointments);
  const dep = useSelector(state => state.count?.depValue) || [2];

  const date = new Date().toLocaleDateString()
  const day = date.split("/")[1] <= 9 ? '0' + date.split("/")[1] : date.split("/")[1]
  const month = date.split("/")[0] <= 9 ? '0' + date.split("/")[0] : date.split("/")[0]
  const year = date.split("/")[2]
  const todayDate = `${year}-${month}-${day}`


  const todayAppointments = appointments?.filter((data) => data?.date === todayDate);


  useEffect(()=>{
    dispatch(getAppointmentList())
   },[dep]);

  return (
    <div className='notice-container'>
       <div className="notice-header-container">
        <span className='notice-header-text'><Menu/> NoticeBoard of daily activities</span>
       </div>
       <div className="notice-items-container">
        {todayAppointments?.map((item)=>(
           <div className="notice-text-icon-container">
           {/* <div className="notice-icon-container">
              <NoteAltIcon style={{color:'white'}}/>
           </div> */}
           <div className="notice-text-item">
             <span className='notice-text-title'>{item?.title}</span>
             <p className='notice-p-text'>{item?.description}</p>
           </div>
         </div>
        ))}
        {/* <span>date</span> */}
       </div>
    </div>
  )
}

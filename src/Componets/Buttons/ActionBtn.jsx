import React from 'react'
import "./style.css";
import { Folder, Visibility } from '@mui/icons-material';



const ActionBtn = ({ handleClick,value, backgroundColor, icon, width, padding}) => {

  return (
    <div style={{
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }}>
        <button className='payment-status-btn' 
          onClick={handleClick}
          style={{
            backgroundColor: backgroundColor,
            width:width, 
            padding:padding,
            display:'flex',
            alignItems:'center',
            justifyContent:'space-around'
          }}
        >
          {icon === "Visibility" && <Visibility style={{
            margin:'1%',
            marginBottom:'5%'
          }}/>}
          {icon === "Folder" && <Folder style={{
            margin:'1%',
            marginBottom:'5%'
          }}/>}
            {value}
        </button>
    </div>
  )
}

export default ActionBtn
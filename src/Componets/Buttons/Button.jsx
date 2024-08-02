import React from 'react'
import "./style.css";
import { Folder, Delete, Edit, Visibility } from '@mui/icons-material';


const Button = ({ handleClickOpen,handleDelete, handleNavigate}) => {
  return (
    <div>
        <button className='view-btn' onClick={handleNavigate}> <Visibility/></button>
        <button className='update-btn' onClick={handleClickOpen}><Edit/></button>
        <button className='delete-btn' onClick={handleDelete}><Delete/></button>

    </div>
  )
}

export default Button
import * as React from 'react';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../Componets/Buttons/Button';
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import { depCountActions } from '../../../store/depCount';
import axios from "axios";
import {handleToastSuccess, handleToastError} from "../../../store/modalState"



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ManageSettings({name,email,phone,language,currency,address,id}) {

  axios.defaults.withCredentials = true;

  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    system_name:name,
    system_email:email,
    address:address,
    currency:currency,
    phone:phone,
    language:language
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (name === undefined) {
    return null; 
  }

  const handleChange = (e) =>{
    const {name, value} = e.target
    setData((prev)=>{
        return{
            ...prev, [name]:value
        }
    })
  }

  const handleDepCount =()=>{
    dispatch(depCountActions.handleCount())
  }

  const handleUpdate = async() => {
    try {
      const response = await axios.put(`http://localhost:5000/update_setting/${id}`, data);
      if(response.status === 201){
        handleDepCount()
        handleClose()
        dispatch(handleToastSuccess("Updated Successfully"))
      }
    } catch (error) {
      dispatch(handleToastError('Error! cannot perform operation'))
    }
  };

  return (
    <React.Fragment>
     <button className='setting-btn'
      onClick={handleClickOpen}
     >
       Change Settings
    </button>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
         Update System Settings
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color:"red",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className='input-container'>
            <label htmlFor="">System Name</label>
            <input type="text"
              className='input'
              placeholder='eg Emmanuel Yidana' 
              name='system_name'
              onChange={handleChange}
              value={data.system_name}
            />
          </div>
          <div className='input-container'>
          <label htmlFor="">System Email</label>
          <input type="text"
            className='input'
            placeholder='eg eyidana001@gmail.com'
            name='system_email'
            onChange={handleChange}
            value={data.system_email}
          />
        </div>
          <div className='input-container'>
            <label htmlFor="">Phone</label>
            <input type="text"
               className='input'
               placeholder='eg 0597893082'
               name='phone'
               onChange={handleChange}
               value={data.phone}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="" className='label'>Address</label>
            <input type="text"
               className='input'
               placeholder='University of Ghana'
               name='address'
               onChange={handleChange}
               value={data.address}
            />
          </div>
          <div className='input-container'>
          <label htmlFor="">Currency</label>
            <select name="currency" onChange={handleChange} className='dropdown'>
              <option value="">{data.currency}</option>
              <option value='USD'>USD</option>
              <option value="GHC">GHC</option>
            </select>
          </div>
          <div className='input-container'>
            <label htmlFor="" className='label'>Language</label>
            <input type="text"
               className='input'
               placeholder='English'
               name='language'
               onChange={handleChange}
               value={data.language}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button autoFocus 
            onClick={handleUpdate}
            className='modal-btn'
            >
            Save changes
          </button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
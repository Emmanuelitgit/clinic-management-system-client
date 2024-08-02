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
import Button from '../Buttons/Button';
import { Link, useNavigate, useLocation } from "react-router-dom"
import { data } from 'autoprefixer';
import { useEffect, useState } from 'react';
import { depCountActions } from '../../store/depCount';
import axios from "axios";
import { getBloodGroup } from '../../store/data';
import {handleToastSuccess, handleToastError} from "../../store/modalState"


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ManageDonor({name, id}) {

  axios.defaults.withCredentials = true;

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const route = location.pathname.split("/")[1]

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({
    blood_donor_id:'', 
    name:'', 
    email:'', 
    address:'', 
    phone:'', 
    sex:'', 
    age:'', 
    blood_group:'', 
    last_donation_date:''
  });

  const bloodGroup = useSelector((state)=>state.data?.bloodBank)||[]

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleNavigate = () =>{
    navigate(`/${route}/view-donor/${id}`)
  }

  const handleClose = () => {
    setOpen(false);
  };
  
  if (id === undefined) {
    return null; 
  }

  if (name === undefined) {
    return null; 
  }

  const handleChange =(e)=>{
    const{name, value} = e.target
    setData((prev)=>{
      return{
        ...prev,[name]:value
      }
    })
  }

  const handleDepCount =()=>{
    dispatch(depCountActions.handleCount())
  }

  const handleUpdate = async() => {
    try {
      const response = await axios.put(`http://localhost:5000/update_blood_donor/${id}`, data);
      if(response.status === 201){
        handleDepCount()
        handleClose()
        dispatch(handleToastSuccess("Updated Successfully"))
      }
    } catch (error) {
      dispatch(handleToastError('Error! cannot perform operation'))
    }
  };

  const handleDelete = async() => {
    try {
      const response = await axios.delete(`http://localhost:5000/remove_blood_donor/${id}`);
      if(response.status === 200){
        handleDepCount()
        dispatch(handleToastSuccess("Deleted Successfully"))
      }
    } catch (error) {
      dispatch(handleToastError('Error! cannot perform operation'))
    }
  };

  return (
    <React.Fragment>
      <Button
       handleClickOpen={handleClickOpen}
       handleDelete={ handleDelete}
       handleNavigate={handleNavigate} 
      />
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
         Update {name}
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
            <label htmlFor="">Donor Name</label>
            <input type="text"
              className='input'
              placeholder='eg Mohammed Yashaw'
              name='name'
              onChange={handleChange} 
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Email</label>
            <input type="email"
              className='input'
              placeholder='eg eyidana001@gmail.com'
              name='email'
              onChange={handleChange} 
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Phone</label>
            <input type="tel"
              className='input'
              placeholder='eg 0597893082'
              name='phone'
              onChange={handleChange} 
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Address</label>
            <input type="text"
              className='input'
              placeholder='eg Unoversity of Ghana, Legon'
              name='address'
              onChange={handleChange} 
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Age</label>
            <input type="number"
              className='input'
              placeholder='eg 150'
              name='age'
              onChange={handleChange}  
            />
          </div>
          <div className='input-container'>
          <label htmlFor="">Patient</label>
            <select name="sex" onChange={handleChange} className='dropdown'>
              <option value="">--Select Gender--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className='input-container'>
          <label htmlFor="">Patient</label>
            <select name="blood_group" onChange={handleChange} className='dropdown'>
              <option value="">--Select Blood Group--</option>
              {bloodGroup?.map((item)=>(
                <option value={item.blood_group} key={item.blood_bank_id}>
                  {item.blood_group}
                </option>
              ))}
            </select>
          </div>
          <div className='input-container'>
            <label htmlFor="">Last Donation Date</label>
            <input type="date"
              className='input'
              name='last_donation_date'
              onChange={handleChange} 
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
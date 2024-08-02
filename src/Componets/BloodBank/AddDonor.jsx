import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
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

export default function AddDonor() {

  axios.defaults.withCredentials = true;

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
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
  const dep = useSelector(state => state.count?.depValue) || [2];
  
  useEffect(()=>{
    dispatch(getBloodGroup())
  }, [dep])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target; 
  
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleDepCount =()=>{
    dispatch(depCountActions.handleCount())
  }
  
  const handleSubmit = async() => {
    try {
      const response = await axios.post(`http://localhost:5000/add_blood_donor`, data);
      if(response.status === 201){
        handleDepCount()
        handleClose()
        dispatch(handleToastSuccess("Created Successfully"))
      }
    } catch (error) {
      dispatch(handleToastError('Error! cannot perform operation'))
    }
  };

  return (
    <React.Fragment>
        <button variant="outlined" 
          onClick={handleClickOpen}
          className='add-btn'
      >
       <Add style={{fontSize:'40px'}}/>
      </button>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, width:"400px" }} id="customized-dialog-title">
         Add New Donor
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
        <DialogContent dividers >
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
            onClick={handleSubmit}
            className='modal-btn'
            >
            Save changes
          </button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
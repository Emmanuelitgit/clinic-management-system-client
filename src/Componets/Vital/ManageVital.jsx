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
import { Link, useNavigate } from "react-router-dom"
import { data } from 'autoprefixer';
import { useEffect, useState } from 'react';
import { depCountActions } from '../../store/depCount';
import axios from "axios";
import { getStaff, getPatients } from '../../store/data';
import { useLocation } from 'react-router-dom';
import {handleToastSuccess, handleToastError} from "../../store/modalState"



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ManageVital({name, id, patient_id}) {

  axios.defaults.withCredentials = true;

  const navigate = useNavigate()
  const location = useLocation()
  const route = location.pathname.split("/")[1]

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({
    patient_id:null,
    nurse_id:null,
    bp_level:'',
    temperature:'',
    height:'',
    age:'',
    date:''
  });

  const dispatch = useDispatch()
  const nurses = useSelector((state)=>state.data?.staff) || []
  const patients = useSelector((state)=>state.data?.patients) || []

  useEffect(()=>{
    dispatch(getStaff('Nurse'))
  }, [dispatch])

  useEffect(()=>{
    dispatch(getPatients())
  }, [dispatch])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleNavigate = () =>{
    navigate(`/${route}/view-vital/${patient_id}`)
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

  const handleUpdate = async() => {
    try {
      const response = await axios.put(`http://localhost:5000/update_vital/${id}`, data);
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
      const response = await axios.delete(`http://localhost:5000/remove_vital/${id}`);
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
          <label htmlFor="">Patient</label>
            <select name="patient_id" onChange={handleChange} value={data.patient} className='dropdown'>
              <option value="">--Select Patient--</option>
              {patients?.map((item)=>(
                <option value={item.patient_id} key={item.patient_id}>
                  {item.name}
                </option>
              ))}
            </select>
        </div>
        <div className='input-container'>
          <label htmlFor="">Nurse</label>
            <select name="nurse_id" onChange={handleChange}  className='dropdown'>
              <option value="">--Select Nurse--</option>
              {nurses?.map((item)=>(
                <option value={item.staff_id} key={item.staff_id}>
                  {item.name}
                </option>
              ))}
            </select>
        </div>
        <div className='input-container'>
            <label htmlFor="">BP level</label>
            <input type="text"
              className='input'
              placeholder='eg 120/80 mmHg'
              name='bp_level'
              onChange={handleChange} 
            />
        </div>
        <div className='input-container'>
            <label htmlFor="">Temperature</label>
            <input type="text"
              className='input'
              placeholder='eg 37.5°C'
              name='temperature'
              onChange={handleChange}  
            />
        </div>
        <div className='input-container'>
            <label htmlFor="">Heigth</label>
            <input type="number"
              className='input'
              placeholder='eg 25'
              name='height'
              onChange={handleChange}
            />
        </div>
        <div className='input-container'>
            <label htmlFor="">Age</label>
            <input type="text"
               className='input'
               placeholder='eg 35'
               name='age'
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
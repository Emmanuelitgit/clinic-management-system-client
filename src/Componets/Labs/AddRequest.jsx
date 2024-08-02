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
import { getStaff, getPatients } from '../../store/data';
import {handleToastSuccess, handleToastError} from "../../store/modalState"


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AddRequest() {

  axios.defaults.withCredentials = true;

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({
    patient_id:null,
    doctor_id:null,
    request_type:'',
    test_name:'',
    method:'',
    date:''
  });


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch()
  const doctors = useSelector((state)=>state.data?.staff) || []
  const patients = useSelector((state)=>state.data?.patients) || []

  useEffect(()=>{
    dispatch(getStaff('Doctor'))
  }, [dispatch])

  useEffect(()=>{
    dispatch(getPatients())
  }, [dispatch])

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
      const response = await axios.post(`http://localhost:5000/add_request`, data);
      if(response.status === 201){
        handleDepCount()
        handleClose()
        dispatch(handleToastSuccess("Created Successfully"))
      }
    } catch (error) {
        console.log(error)
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
         Add New Request
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
          <label htmlFor="">Doctor</label>
            <select name="doctor_id" onChange={handleChange} value={data.doctor}  className='dropdown'>
              <option value="">--Select Doctor--</option>
              {doctors?.map((item)=>(
                <option value={item.staff_id} key={item.staff_id}>
                  {item.name}
                </option>
              ))}
            </select>
        </div>
        <div className='input-container'>
          <label htmlFor="">Request Type</label>
            <select name="request_type" onChange={handleChange} value={data.doctor}  className='dropdown'>
              <option value="">--Select request type--</option>
              <option value="Lab">Lab</option>
              <option value="Scan">Scan</option>
            </select>
        </div>
        <div className='input-container'>
          <label htmlFor="">Test Method</label>
            <select name="method" onChange={handleChange} value={data.doctor}  className='dropdown'>
              <option value="">--Select test method--</option>
              <option value="Blood Draw">Blood Draw</option>
              <option value="Urine Sample">Urine Sample</option>
              <option value="Stool Sample">Stool Sample</option>
              <option value="Saliva Swab">Saliva Swab</option>
              <option value="Hair Sample">Hair Sample</option>
            </select>
        </div>
        <div className='input-container'>
          <label htmlFor="">Test/Scan Name</label>
            <select name="test_name" onChange={handleChange} value={data.doctor}  className='dropdown'>
              <option value="">--Select test name--</option>
              <option value="Malaria">Malaria</option>
              <option value="Hepatitis B">Hepatitis B</option>
              <option value="Hepatitis A">Hepatitis A</option>
              <option value="Liver Function Test (LFT)">Liver Function Test (LFT)</option>
              <option value="Pregnancy Tes">Pregnancy Tes</option>
              <option value="Ultrasound (US)">Ultrasound (US)</option>
              <option value="X-Ray">X-Ray</option>
            </select>
        </div>
          <div className='input-container'>
            <label htmlFor="">Date</label>
            <input type="date"
              className='input'
              name='date'
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
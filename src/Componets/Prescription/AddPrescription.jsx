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
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {handleToastSuccess, handleToastError} from "../../store/modalState"
import api from '../../api';
import Swal from 'sweetalert2';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AddPrescription() {

  axios.defaults.withCredentials = true;

  const [open, setOpen] = React.useState(false);
  const[description, setDescription] = useState()
  const [data, setData] = useState({
    patient_id:null,
    doctor_id:null,
    medication:'',
    dosage:'',
    duration:'',
    description:description,
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

  useEffect(() => {
    setData((prevData) => ({ ...prevData, description }));
  }, [description]);

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
      const response = await api.post(`/add_prescription`, data);
      if(response.status === 201){
        handleDepCount()
        handleClose()
        Swal.fire({
          title: "Success!",
          text: "Prescription added successfully!",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-success",
          },
        });      }
    } catch (error) {
      handleClose()
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "bg-success",
        },
      });    }
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
         Add New Prescription
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
            <label htmlFor="">Medication</label>
            <input type="text"
              className='input'
              placeholder='eg Paracetamol'
              name='medication'
              onChange={handleChange} 
            />
        </div>
        <div className='input-container'>
            <label htmlFor="">Dosage</label>
            <input type="text"
              className='input'
              placeholder='eg 1 TAB'
              name='dosage'
              onChange={handleChange} 
            />
        </div>
        <div className='input-container'>
            <label htmlFor="">Duration</label>
            <input type="text"
              className='input'
              placeholder='eg 2 Months'
              name='duration'
              onChange={handleChange} 
            />
        </div>
        <div className='input-container'>
            <label htmlFor="">Date</label>
            <input type="date"
              className='input'
              name='date'
              onChange={handleChange}  
            />
        </div>
        <div className="editor-container">
          <label htmlFor="" className='edtor-label'>Remarks</label>
           <ReactQuill className="editor-input" 
            theme="snow" value={description} 
            onChange={setDescription} 
            placeholder='Write prescription remarks here..'
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
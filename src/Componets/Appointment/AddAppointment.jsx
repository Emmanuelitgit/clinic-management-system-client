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

export default function AddAppointment() {

  axios.defaults.withCredentials = true;

  const [open, setOpen] = useState(false);
  const[description, setDescription] = useState()
  const [data, setData] = useState({
    patient_id:null,
    doctor_id:null,
    date:'',
    description:description,
    title:''
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
    const response = await api.post(`/add_appointment`, data);
    if(response.status === 201){
      handleDepCount()
      handleClose()
      Swal.fire({
        title: "Success!",
        text: "Appointment added successfully!",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "bg-success",
        },
      }); 
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-success",
          },
    });
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
         Add New Appointment
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
            <label htmlFor="">Date</label>
            <input type="date"
              className='input'
              placeholder='eg 24/05/2000'
              name='date'
              onChange={handleChange} 
            />
          </div>
          <div className='input-container'>
          <label htmlFor="">Doctor</label>
            <select name="doctor_id" onChange={handleChange} className='dropdown'>
              <option value="">--Select Doctor--</option>
              {doctors?.map((item)=>(
                <option value={item.staff_id} key={item.staff_id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className='input-container'>
          <label htmlFor="">Patient</label>
            <select name="patient_id" onChange={handleChange}  className='dropdown'>
              <option value="">--Select Patient--</option>
              {patients?.map((item)=>(
                <option value={item.patient_id} key={item.patient_id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className='input-container'>
          <label htmlFor="">Title</label>
            <select name="title" onChange={handleChange}  className='dropdown'>
              <option value="">--Select Title--</option>
              <option value="Medical Consultation">Medical Consultation</option>
              <option value="Lab Review">Lab Review</option>
              <option value="Medical Review">Medical Review</option>
              <option value="Drug Prescription">Drug Prescription</option>
            </select>
          </div>
          <div className="editor-container">
          <label htmlFor="" className='edtor-label'>Description</label>
           <ReactQuill className="editor-input" 
            theme="snow" value={description} 
            onChange={setDescription} 
            placeholder='Write appoitnment reason here..'
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
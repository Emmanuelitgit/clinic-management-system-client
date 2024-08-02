import * as React from 'react';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../Buttons/Button';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { depCountActions } from '../../store/depCount';
import axios from "axios";
import { getStaff, getPatients } from '../../store/data';
import { useLocation } from 'react-router-dom';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {handleToastSuccess, handleToastError} from "../../store/modalState"


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ManageAppointment({name,id,patient_id,doctor_id,patient_name,date,doctor_name,desc,title}) {

  axios.defaults.withCredentials = true;

  const navigate = useNavigate()
  const location = useLocation()
  const route = location.pathname.split('/')[1]

  const [open, setOpen] = React.useState(false);
  const[description, setDescription] = useState(desc)
  const [data, setData] = useState({
    patient_id:null,
    doctor_id:null,
    date:'',
    description:description,
    title:''
  });

  const dispatch = useDispatch()
  const doctors = useSelector((state)=>state.data?.staff) || []
  const patients = useSelector((state)=>state.data?.patients) || []

  useEffect(()=>{
    dispatch(getStaff('Doctor'))
  }, [dispatch])

  useEffect(()=>{
    setDescription(desc)
  }, [open])

  useEffect(() => {
    setData((prevData) => ({ ...prevData, description }));
  }, [description]);

  useEffect(()=>{
    dispatch(getPatients())
  }, [dispatch])

  const handleClickOpen = () => {
    setOpen(true);
    setData({
      patient_id:patient_id,
      doctor_id:doctor_id,
      date:date,
      title:title
    })
  };

  const handleNavigate = () =>{
    navigate(`/${route}/view-appointment/${patient_id}`)
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
      const response = await axios.put(`http://localhost:5000/update_appointment/${id}`, data);
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
      const response = await axios.delete(`http://localhost:5000/remove_appointment/${id}`);
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
            <label htmlFor="">Date</label>
            <input type="date"
              className='input'
              placeholder='eg 24/05/2000'
              name='date'
              value={data.date}
              onChange={handleChange} 
            />
          </div>
          <div className='input-container'>
          <label htmlFor="">Doctor</label>
            <select name="doctor_id" onChange={handleChange} value={data.doctor}  className='dropdown'>
              <option value={data.doctor_id}>{doctor_name}</option>
              {doctors?.map((item)=>(
                <option value={item.staff_id} key={item.staff_id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className='input-container'>
          <label htmlFor="">Patient</label>
            <select name="patient_id" onChange={handleChange} value={data.patient} className='dropdown'>
              <option value={data.patient_id}>{patient_name}</option>
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
              <option value={data.title}>{data.title}</option>
              <option value="Medical Consultation">Medical Consultation</option>
              <option value="Lab Review">Lab Review</option>
              <option value="Medical Review">Medical Review</option>
              <option value="Drug Prescription">Drug Prescription</option>
            </select>
          </div>
          <div className="editor-container">
          <label htmlFor="" className='edtor-label'>Description</label>
           <ReactQuill className="editor-input" 
            theme="snow" 
            value={description} 
            onChange={setDescription} 
            placeholder='Write appoitnment reason here..'
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
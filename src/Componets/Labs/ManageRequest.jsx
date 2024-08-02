import * as React from 'react';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Buttons/Button';
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import { depCountActions } from '../../store/depCount';
import axios from "axios";
import { getStaff, getPatients } from '../../store/data';
import 'react-quill/dist/quill.snow.css';
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

export default function ManageRequest(
  {name, id, patient_id,doctor_id,request_type,method,test_name,date,doctor_name,patient_name}
) {

  axios.defaults.withCredentials = true;

  const navigate = useNavigate()
  const location = useLocation()
  const route = location.pathname.split("/")[1]

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({
    patient_id:null,
    doctor_id:null,
    request_type:'',
    test_name:'',
    method:'',
    date:''
  });

  const dispatch = useDispatch()
  const doctors = useSelector((state)=>state.data?.staff) || []
  const patients = useSelector((state)=>state.data?.patients) || []

  useEffect(()=>{
    dispatch(getStaff('Doctor'))
  }, [dispatch])

  useEffect(()=>{
    dispatch(getPatients())
  }, [dispatch])

  const handleClickOpen = () => {
    setOpen(true);
    setData({
      patient_id:patient_id,
      doctor_id:doctor_id,
      request_type:request_type,
      test_name:test_name,
      method:method,
      date:date
    })
  };

  const handleNavigate = () =>{
    navigate(`/${route}/view-request/${patient_id}`)
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
      const response = await axios.put(`http://localhost:5000/update_request/${id}`, data);
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
      const response = await axios.delete(`http://localhost:5000/remove_request/${id}`);
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
              <option value={data.patient_id}>{patient_name}</option>
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
              <option value={data.doctor_id}>{doctor_name}</option>
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
              <option value={data.request_type}>{request_type}</option>
              <option value="Lab">Lab</option>
              <option value="Scan">Scan</option>
            </select>
        </div>
        <div className='input-container'>
          <label htmlFor="">Test Method</label>
            <select name="method" onChange={handleChange} value={data.doctor}  className='dropdown'>
              <option value={data.method}>{method}</option>
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
              <option value={data.test_name}>{test_name}</option>
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
              value={data.date}
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
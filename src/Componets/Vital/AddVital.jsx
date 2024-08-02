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
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AddVital() {

  axios.defaults.withCredentials = true;

  const [open, setOpen] = React.useState(false);
  const[comment, setComment] = useState()
  const [data, setData] = useState({
    patient_id:null,
    nurse_id:null,
    date:'',
    bp_level:'',
    temperature:'',
    height:'',
    age:'',
    comment:comment,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch()
  const nurses = useSelector((state)=>state.data?.staff) || []
  const patients = useSelector((state)=>state.data?.patients) || []

  useEffect(() => {
    setData((prevData) => ({ ...prevData, comment }));
  }, [comment]);

  useEffect(()=>{
    dispatch(getStaff('Nurse'))
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
      const response = await axios.post(`http://localhost:5000/add_vital`, data);
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
      { !open &&
        <button variant="outlined" 
          onClick={handleClickOpen}
          className='add-btn'
      >
        <Add style={{fontSize:'40px'}}/>
      </button>}
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, width:"400px" }} id="customized-dialog-title">
         Add New Vital
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
            <select name="patient_id" onChange={handleChange} className='dropdown'>
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
            <label htmlFor="">Date</label>
            <input type="date"
              className='input'
              name='date'
              onChange={handleChange}  
            />
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
            <label htmlFor="">Height</label>
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
        <div className="editor-container">
          <label htmlFor="" className='edtor-label'>Nurse`s Comment</label>
           <ReactQuill className="editor-input" 
            theme="snow" value={comment} 
            onChange={setComment} 
            placeholder='Write vital comment here..'
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
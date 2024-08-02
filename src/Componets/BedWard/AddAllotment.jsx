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
import { getBeds, getPatients } from '../../store/data';
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

export default function AddAllotment() {

  axios.defaults.withCredentials = true;

  const [open, setOpen] = React.useState(false);
  const[description, setDescription] = useState()
  const [data, setData] = useState({
    patient_id:null,
    bed_id:null,
    allotment_date:'',
    discharge_date:'',
    description:description
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch()
  const beds = useSelector((state)=>state.data?.beds) || []
  const patients = useSelector((state)=>state.data?.patients) || []
  const dep = useSelector(state => state.count?.depValue) || [2];

  useEffect(()=>{
    dispatch(getBeds())
  }, [dep])

  useEffect(()=>{
    dispatch(getPatients())
  }, [dep])

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
      const response = await axios.post(`http://localhost:5000/add_bed_allotment`, data);
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
         Add New Bed Allotment
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
          <label htmlFor="">Bed</label>
            <select name="bed_id" onChange={handleChange} className='dropdown'>
              <option value="">--Select Bed--</option>
              {beds?.map((item)=>(
                <option value={item.bed_id} key={item.bed_id}>
                  {item.bed_type}({item.bed_number})
                </option>
              ))}
            </select>
          </div>
          <div className='input-container'>
            <label htmlFor="">Allotment Date</label>
            <input type="date"
              className='input'
              placeholder='eg 03/05/2024'
              name='allotment_date'
              onChange={handleChange} 
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Discharge Date</label>
            <input type="date"
              className='input'
              placeholder='eg 03/05/2024'
              name='discharge_date'
              onChange={handleChange} 
            />
          </div>
          <div className="editor-container">
          <label htmlFor="" className='edtor-label'>Description</label>
           <ReactQuill className="editor-input" 
            theme="snow" value={description} 
            onChange={setDescription} 
            placeholder='Write allotment description here..'
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
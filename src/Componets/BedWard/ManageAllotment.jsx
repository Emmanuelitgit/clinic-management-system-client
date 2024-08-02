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
import { Link, useNavigate } from "react-router-dom"
import Button from '../Buttons/Button';
import { useEffect, useState } from 'react';
import { depCountActions } from '../../store/depCount';
import axios from "axios";
import { getBeds, getPatients } from '../../store/data';
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

export default function ManageAllotment(
  {name,id,patient_id,allotment_date,discharge_date,bed_id,patient_name,bed_number,bed_type}
) {

  axios.defaults.withCredentials = true;

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const route = location.pathname.split('/')[1]

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({
    patient_id:null,
    bed_id:null,
    allotment_date:'',
    discharge_date:''
  });

  const beds = useSelector((state)=>state.data?.beds) || []
  const patients = useSelector((state)=>state.data?.patients) || []
  const dep = useSelector(state => state.count?.depValue) || [2];

  useEffect(()=>{
    dispatch(getBeds())
  }, [dep])

  useEffect(()=>{
    dispatch(getPatients())
  }, [dep])

  const handleClickOpen = () => {
    setOpen(true);
    setData({
      patient_id:patient_id,
      bed_id:bed_id,
      allotment_date:allotment_date,
      discharge_date:discharge_date
    })
  };

  const handleNavigate = () =>{
    navigate(`/${route}/view-allotment/${patient_id}`)
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
      const response = await axios.put(`http://localhost:5000/update_bed_allotment/${id}`, data);
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
      const response = await axios.delete(`http://localhost:5000/remove_bed_allotment/${id}`);
      if(response.status === 200){
        handleDepCount()
        dispatch(handleToastSuccess("Deleted Successfully"))
      }
      console.log(response)
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
          <label htmlFor="">Bed</label>
            <select name="bed_id" onChange={handleChange} value={data.bed} className='dropdown'>
              <option value={data.bed_id}>{bed_number+`(${bed_number})`}</option>
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
              value={data.allotment_date}
              onChange={handleChange} 
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Discharge Date</label>
            <input type="date"
              className='input'
              placeholder='eg 03/05/2024'
              name='discharge_date'
              value={data.discharge_date}
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
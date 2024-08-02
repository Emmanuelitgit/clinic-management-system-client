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
import {handleToastSuccess, handleToastError} from "../../store/modalState"


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AddBloodBank() {

  axios.defaults.withCredentials = true;

  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({
    blood_group:'',
    status:''
  });


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
      const response = await axios.post(`http://localhost:5000/add_blood_bank`, data);
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
         Add New Blood Bank
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
            <label htmlFor="">Blood Group</label>
            <input type="text"
              className='input'
              placeholder='eg AB+'
              name='blood_group' 
              onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Status</label>
            <input type="number"
              className='input'
              placeholder='eg 150'
              name='status'
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
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
import Button from '../Buttons/Button';
import { Link, useNavigate, useLocation } from "react-router-dom"
import { data } from 'autoprefixer';
import { useEffect, useState } from 'react';
import { depCountActions } from '../../store/depCount';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
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

export default function ManageBed({name, id}) {

  axios.defaults.withCredentials = true;

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const route = location.pathname.split("/")[1]

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({
    bed_type:'',
    bed_number:'',
    bed_location:'',
    bed_status:'',
    description:''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleNavigate = () =>{
    navigate(`/${route}/view-bed/${id}`)
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
      const response = await api.put(`/update_bed/${id}`, data);
      if(response.status === 201){
        handleDepCount()
        handleClose()
        Swal.fire({
          title: "Success!",
          text: "Bed updated successfully!",
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

  const handleDelete = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-success",
        cancelButton: "bg-danger",
      },
    });

    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.delete(`/remove_bed/${id}`);
          if (response.status === 200) {
            handleDepCount();
            swalWithBootstrapButtons.fire("Deleted!", "Bed deleted successfully.", "success");
          }
        } catch (error) {
          swalWithBootstrapButtons.fire("Error!", "Bed could not be deleted.", "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire("Cancelled", "Operation cancelled", "error");
      }
    });
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
          <label htmlFor="">Bed Type</label>
            <select name="bed_type" onChange={handleChange} value={data.bed_type} className='dropdown'>
              <option value="">--Select Bed Type--</option>
              <option value="Ward">Ward</option>
              <option value="Carbin">Carbin</option>
              <option value="ICU">ICU</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className='input-container'>
            <label htmlFor="">Bed Number</label>
            <input type="text"
              className='input'
              placeholder='eg HCI-002'
              name='bed_number'
              onChange={handleChange}  
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Bed Location</label>
            <input type="text"
              className='input'
              placeholder='eg Ward 002'
              name='bed_location'
              onChange={handleChange}  
            />
          </div>
          <div className='input-container'>
          <label htmlFor="">Bed Type</label>
            <select name="bed_status" onChange={handleChange} value={data.bed_type} className='dropdown'>
              <option value="">--Select Bed Status--</option>
              <option value="Not Alloted">Alloted</option>
              <option value="Not Alloted">Not Alloted</option>
            </select>
          </div>
          <div className='input-container'>
            <label htmlFor="">Bed Description</label>
            <input type="text"
              className='input'
              placeholder='eg Hello this is bed two'
              name='description'
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
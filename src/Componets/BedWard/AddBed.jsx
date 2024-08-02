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
import { useEffect, useState } from 'react';
import { depCountActions } from '../../store/depCount';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { toast, Toaster } from 'react-hot-toast';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AddBed() {

  axios.defaults.withCredentials = true;

  const [open, setOpen] = React.useState(false);
  const[description, setDescription] = useState()
  const [data, setData] = useState({
    bed_type:'',
    bed_number:'',
    bed_location:'',
    description:description
  });

  const showAddToast = () => toast.success("Created Successfully");
  const showErrorToast = () => toast.error('Error! cannot perform operation');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  const dispatch = useDispatch()

  const handleDepCount =()=>{
    dispatch(depCountActions.handleCount())
  }
  
  const handleSubmit = async() => {
    try {
      const response = await axios.post(`http://localhost:5000/add_bed`, data);
      if(response.status === 201){
        handleDepCount()
        handleClose()
        showAddToast()
      }
    } catch (error) {
        showErrorToast()
    }
  };
  return (
    <React.Fragment>
        <button variant="outlined" 
          onClick={handleClickOpen}
          className='add-btn'
      >
        <Add/>
        Add Bed
      </button>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, width:"400px" }} id="customized-dialog-title">
         Add New Bed 
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
          <label htmlFor="">Bed Type</label>
            <select name="bed_type" onChange={handleChange} className='dropdown'>
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
          <div className="editor-container">
            <label htmlFor="" className='edtor-label'>Bed Description</label>
            <ReactQuill className="editor-input" theme="snow" value={description} onChange={setDescription} />
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
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
import {handleToastSuccess, handleToastError} from "../../store/modalState"


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AddMedicine() {

  axios.defaults.withCredentials = true;

  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false);
  const[categories, setCategories] = useState()
  const[description, setDescription] = useState()
  const [data, setData] = useState({
    name:'',
    category:'',
    description:description,
    price:'',
    manufacturer:'',
    status:''
  });

  const dep = useSelector(state => state.count?.depValue) || [2];

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setData((prevData) => ({ ...prevData, description }));
  }, [description]);

  useEffect(()=>{
    const getCategories =async()=>{
      try {
        const response = await fetch('http://localhost:5000/medicine_categories', {
          method: 'GET',
          credentials: 'include', // Important for including cookies
      });
        if(!response.ok){
          throw new Error('Failed to fetch data');
        }
        const fetchedData = await response.json();
        setCategories(fetchedData)
      } catch (error) {
        console.log(error)
      }
    }
    getCategories()
  }, [dep])

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
      const response = await axios.post(`http://localhost:5000/add_medicine`, data);
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
         Add New Medicine
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
            <label htmlFor="">Medicine Name</label>
            <input type="text"
              className='input'
              placeholder='eg Tenonvovir'
              name='name'
              onChange={handleChange}
            />
          </div>
          <div className='input-container'>
          <label htmlFor="">Doctor</label>
            <select name="category" onChange={handleChange} value={data.doctor}  className='dropdown'>
              <option value="">--Select Category--</option>
              {categories?.map((item)=>(
                <option value={item.category_name} key={item.category_id}>
                  {item.category_name}
                </option>
              ))}
            </select>
        </div>
          <div className='input-container'>
            <label htmlFor="">Price</label>
            <input type="number"
              className='input'
              placeholder='eg 25'
              name='price'
              onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Manufacturer</label>
            <input type="text"
               className='input'
               placeholder='eg Himalaya'
               name='manufacturer'
               onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Status</label>
            <input type="number"
               className='input'
               placeholder='eg 50'
               name='status'
               onChange={handleChange}
            />
          </div>
          <div className="editor-container">
            <label htmlFor="" className='edtor-label'>Description</label>
            <ReactQuill className="editor-input" 
             theme="snow" value={description} 
             onChange={setDescription}
             placeholder='Write medicine description here..'  
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
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
import { useState } from 'react';
import { depCountActions } from '../../store/depCount';
import axios from "axios";
import { useDispatch} from 'react-redux';
import {handleToastSuccess, handleToastError} from "../../store/modalState"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AddPatient() {

  axios.defaults.withCredentials = true;

  const [open, setOpen] = React.useState(false);
  const[file, setFile] = useState(null);
  const [data, setData] = React.useState({
    name:'',
    email:'', 
    phone:'', 
    address:'', 
    age:'', 
    sex:'', 
    birth_date:'', 
    blood_group:'',
  })

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch()

  const handleDepCount =()=>{
    dispatch(depCountActions.handleCount())
  }

  const hadnleChange =(e)=>{
    const{name, value} = e.target
    setData((prev)=>{
      return{
        ...prev,[name]:value
      }
    })
  }

  const upload = async ()=>{
    try{
        const formData = new FormData();
        formData.append("file", file)
        const res = await axios.post("http://localhost:5000/upload", formData)
        return res.data
    }catch(err){
        console.log(err)
    }
 }

  const handleSubmit = async() => {
    const imgUrl = await upload()
    try {
      const response = await axios.post(`http://localhost:5000/add_patient`, {
        name:data.name,
        email:data.email, 
        phone:data.phone, 
        address:data.address, 
        age:data.age, 
        sex:data.sex, 
        birth_date:data.birth_date, 
        blood_group:data.blood_group,
        profile:file? imgUrl : ""
      });
      if(response.status === 201){
        handleDepCount()
        handleClose()
        dispatch(handleToastSuccess("Successfully Added"))
      }
    } catch (error) {
      dispatch(handleToastError("Error! cannot perform operation"))
      console.log(error)
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
         Add New Patient
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
            <label htmlFor="">Patient Name</label>
            <input type="text"
              className='input'
              placeholder='eg Emmanuel Yidana'
              name='name' 
              onChange={hadnleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Email</label>
            <input type="text"
              className='input'
              placeholder='eg eyidana001@gmail.com'
              name='email'
              onChange={hadnleChange} 
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Phone</label>
            <input type="number"
              className='input'
              placeholder='eg 0597893082'
              name='phone'
              onChange={hadnleChange} 
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Patient Address</label>
            <input type="text"
              className='input'
              placeholder='eg University of Ghana'
              name='address'
              onChange={hadnleChange} 
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Age</label>
            <input type="number"
              className='input'
              placeholder='eg 25'
              name='age'
              onChange={hadnleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Sex</label>
            <input type="text"
               className='input'
               placeholder='eg Male'
               name='sex'
               onChange={hadnleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Blood Group</label>
            <input type="text"
               className='input'
               placeholder='eg AB+'
               name='blood_group'
               onChange={hadnleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Birth Date</label>
            <input type="text"
               className='input'
               placeholder='eg 24/03/2000'
               name='birth_date'
               onChange={hadnleChange}
            />
          </div>
          <div className='input-container'>
              <label htmlFor="" className='label'>Profile Image</label>
              <input type="file" name="file" id="file" onChange={e=>setFile(e.target.files[0])} />
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
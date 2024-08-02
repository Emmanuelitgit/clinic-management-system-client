import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Add } from '@mui/icons-material';
import { useDispatch} from 'react-redux';
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import { depCountActions } from '../../../store/depCount';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { handleToastError, handleToastSuccess } from '../../../store/modalState';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AddStaff({name}) {
  
  axios.defaults.withCredentials = true;

  const location = useLocation();
  const role = location.pathname.split("/")[2].replace("-list", "");
  const [open, setOpen] = React.useState(false);
  const[file, setFile] = useState(null);
  const [data, setData] = React.useState({
    name:"",
    role:role,
    phone:"",
    address:"",
    email:"",
    password:"",
    department:"",
  })

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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const dispatch = useDispatch()

  const handleChange = (e) =>{
    const {name, value} = e.target
    setData((prev)=>{
      return{
        ...prev, [name]:value
      }
    })
  }

  const handleDepCount =()=>{
    dispatch(depCountActions.handleCount())
  }


  const handleSubmit = async() => {
    const imgUrl = await upload()
    try {
      const accessToken = localStorage.getItem("token")
      if(accessToken){
        const response = await axios.post(`http://localhost:5000/add_staff`, {
          name:data.name,
          role:data.role,
          phone:data.phone,
          address:data.address,
          email:data.email,
          password:data.password,
          department:data.department,
          profile:file? imgUrl : ""
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
        }
      );
        if(response.status === 201){
          handleDepCount()
          handleClose()
          dispatch(handleToastSuccess("Successfully Added"))
        }
        if(response.status === 401){
          dispatch(handleToastError('Acess denied'))
        }
      }
    } catch (error) {
      dispatch(handleToastError("Error! cannot perform operation"))
    }
  };


return (
    <React.Fragment>
      <button className='add-btn'
      onClick={handleClickOpen}
      >
        <Add style={{fontSize:'40px'}}/>
        {/* {name} */}
      </button>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
         Add New {name}
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
            <label htmlFor="">{name} Name</label>
            <input type="text"
              className='input'
              placeholder='eg Emmanuel Yidana'
              name='name'
              onChange={handleChange} 
            />
          </div>
          {name === "Doctor" &&
          <div className='input-container'>
          <label htmlFor="">Department Name</label>
          <input type="text"
            className='input'
            placeholder='eg Public Health'
            name='department'
            onChange={handleChange} 
          />
        </div>
          }
          <div className='input-container'>
            <label htmlFor="">Email</label>
            <input type="text"
              className='input'
              placeholder='eg eyidana001@gmial.com'
              name='email'
              onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="" className='label'>Password</label>
            <input type="password"
               className='input'
               placeholder='enter a strong password'
               name='password'
               onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Phone</label>
            <input type="text"
               className='input'
               placeholder='eg 0597893082'
               name='phone'
               onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="" className='label'>Address</label>
            <input type="text"
               className='input'
               placeholder='University of Ghana'
               name='address'
               onChange={handleChange}
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
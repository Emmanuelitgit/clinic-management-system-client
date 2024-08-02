import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { depCountActions } from '../../store/depCount';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { handleToastError, handleToastSuccess } from '../../store/modalState';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ManageProfile({ name,backgroundColor,padding,color,width,marginRight,btnName,handleProfileClose }) {

  axios.defaults.withCredentials = true;

  const location = useLocation();
  const role = location.pathname.split("/")[2].replace("-list", "");
  const dep = useSelector(state => state.count?.depValue) || [2];
  const [open, setOpen] = useState(false);
  const [staff, setStaff] = useState([]);
  const [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    role:staff[0]?.email,
    department:staff[0]?.department
  });


  const handleClickOpen = () => {
    setOpen(true);
    setData({
      name: staff[0]?.name,
      phone: staff[0]?.phone,
      address: staff[0]?.address,
      email: staff[0]?.email,
      password: staff[0]?.password,
      role:staff[0]?.role
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDepCount = () => {
    dispatch(depCountActions.handleCount());
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.put(`http://localhost:5000/update_staff/${userId}`, data);
      if (response.status === 201) {
        handleDepCount();
        handleClose();
        dispatch(handleToastSuccess("Successfully Updated"));
      }
    } catch (error) {
      dispatch(handleToastError("Error! Cannot perform operation"));
    }
  };

  useEffect(() => {
    const getStaff = async () => {
      const id = localStorage.getItem("userId");
      try {
        const response = await fetch(`http://localhost:5000/single_staff/${id}`, {
          method: 'GET',
          credentials: 'include', // Important for including cookies
      });
        if (!response.ok) {
          console.log("Failed to fetch data...");
        }
        const fetchedData = await response.json();
        setStaff(fetchedData);
      } catch (error) {
        console.log(error);
      }
    };
    getStaff();
  }, [dep]);

  return (
    <React.Fragment>
      <button className='add-btn'
        onClick={handleClickOpen}
        style={{
          backgroundColor: backgroundColor,
          padding: padding,
          width: width,
          color: color,
          marginRight:marginRight
        }}
      >
        {btnName}
      </button>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Update Profile
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: "red",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div>
            <div className='input-container'>
              <label htmlFor="">{name} Name</label>
              <input
                type="text"
                className='input'
                placeholder='eg Emmanuel Yidana'
                name='name'
                value={data.name}
                onChange={handleChange}
              />
            </div>
            <div className='input-container'>
              <label htmlFor="">Email</label>
              <input
                type="text"
                className='input'
                placeholder='eg eyidana001@gmial.com'
                name='email'
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className='input-container'>
              <label htmlFor="" className='label'>Password</label>
              <input
                type="password"
                className='input'
                placeholder='Enter a strong password'
                name='password'
                value={data.password}
                onChange={handleChange}
              />
            </div>
            <div className='input-container'>
              <label htmlFor="">Phone</label>
              <input
                type="text"
                className='input'
                placeholder='eg 0597893082'
                value={data.phone}
                onChange={handleChange}
              />
            </div>
            <div className='input-container'>
              <label htmlFor="" className='label'>Address</label>
              <input
                type="text"
                className='input'
                placeholder='University of Ghana'
                name='address'
                value={data.address}
                onChange={handleChange}
              />
            </div>
            <div className='input-container'>
              <label htmlFor="" className='label'>Profile Image</label>
              <input
                type="file"
                name='file'
                onChange={handleChange}
              />
            </div>
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
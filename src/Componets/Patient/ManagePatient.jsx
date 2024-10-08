import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Buttons/Button';
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { depCountActions } from '../../store/depCount';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { handleToastSuccess, handleToastError } from "../../store/modalState";
import { getPatient } from "../../store/data";
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

export default function ManagePatient({ name, id, patient, age, sex, email, blood_group, phone, birth, address, profile }) {
  
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const location = useLocation();
  const route = location.pathname.split('/')[1];
  const existingProfile = profile !== null? profile : ''

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    age: '',
    sex: '',
    birth_date: '',
    blood_group: '',
  });

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
    setData({
      name: patient,
      email: email,
      phone: phone,
      address: address,
      age: age,
      sex: sex,
      birth_date: birth,
      blood_group: blood_group,
    });
  };

  const handleDepCount = () => {
    dispatch(depCountActions.handleCount());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev, [name]: value
      };
    });
  };

  useEffect(() => {
    dispatch(getPatient(id));
  }, [id]);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    const imgUrl = await upload();
    try {
      const response = await api.put(`/update_patient/${id}`, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        age: data.age,
        sex: data.sex,
        birth_date: data.birth_date,
        blood_group: data.blood_group,
        profile: file ? imgUrl : existingProfile
      });
      if (response.status === 201) {
        handleDepCount();
        handleClose();
        Swal.fire({
          title: "Success!",
          text: "Patient record updated successfully!",
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
          const response = await api.delete(`http://localhost:5000/remove_patient/${id}`);
          if (response.status === 200) {
            handleDepCount();
            swalWithBootstrapButtons.fire("Deleted!", "Patient has been deleted.", "success");
          }
        } catch (error) {
          swalWithBootstrapButtons.fire("Error!", "Patient could not be deleted.", "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire("Cancelled", "The patient is safe", "error");
      }
    });
  };

  const handleNavigate = () => {
    navigate(`/${route}/view-patient/${id}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (id === undefined) {
    return null;
  }

  if (name === undefined) {
    return null;
  }


  return (
    <React.Fragment>
      <Button
        handleClickOpen={handleClickOpen}
        handleDelete={handleDelete}
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
            color: "red",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <div className='input-container'>
            <label htmlFor="">Patient Name</label>
            <input type="text"
              className='input'
              placeholder='eg Emmanuel Yidana'
              value={data.name}
              name='name'
              onChange={handleChange} 
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Email</label>
            <input type="text"
              className='input'
              placeholder='eg eyidana001@gmail.com'
              value={data.email}
              name='email'
              onChange={handleChange} 
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Phone</label>
            <input type="number"
              className='input'
              placeholder='eg 0597893082'
              value={data.phone}
              name='phone'
              onChange={handleChange} 
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Patient Address</label>
            <input type="text"
              className='input'
              placeholder='eg University of Ghana'
              value={data.address}
              name='address'
              onChange={handleChange}  
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Age</label>
            <input type="number"
              className='input'
              placeholder='eg 25'
              value={data.age}
              name='age'
              onChange={handleChange}  
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Sex</label>
            <input type="text"
               className='input'
               placeholder='eg Male'
               value={data.sex}
               name='sex'
               onChange={handleChange}  
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Blood Group</label>
            <input type="text"
               className='input'
               placeholder='eg AB+'
               value={data.blood_group}
               name='blood_group'
               onChange={handleChange}  
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Birth Date</label>
            <input type="text"
               className='input'
               placeholder='eg 24/03/2000'
               value={data.birth_date}
               name='birth_date'
               onChange={handleChange}  
            />
          </div>
          <div className='input-container'>
              <label htmlFor="" className='label'>Profile Image</label>
              <input type="file" 
              name="file" id="file" 
              onChange={e=>setFile(e.target.files[0])}
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
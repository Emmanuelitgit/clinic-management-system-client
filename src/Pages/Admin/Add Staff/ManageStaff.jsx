import React, { useState} from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch} from 'react-redux';
import Button from '../../../Componets/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { depCountActions } from '../../../store/depCount';
import { handleToastError, handleToastSuccess } from '../../../store/modalState';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ManageStaff({ name,id,profile,role,phone,address,email,password,department, staff_name}) {

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const existingProfile = profile !== null? profile : ''
  const[file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: "",
    role: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    department: "",
  });

  console.log(profile)
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
    setData({
      name:staff_name,
      role:role,
      phone:phone,
      address:address,
      email:email,
      password:password,
      department:department,
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev, [name]: value
    }));
  };

  const handleDepCount = () => {
    dispatch(depCountActions.handleCount());
  };

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

  const handleUpdate = async () => {
    const imgUrl = await upload()
    try {
      const accessToken = localStorage.getItem("token")
      const response = await axios.put(`http://localhost:5000/update_staff/${id}`, {
        name:data.name,
        role:data.role,
        phone:data.phone,
        address:data.address,
        email:data.email,
        password:data.password,
        department:data.department,
        profile:file? imgUrl : existingProfile
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
      }
      }
    );
      if (response.status === 201) {
        handleDepCount();
        handleClose();
        dispatch(handleToastSuccess("Successfully Updated"))
      }
    } catch (error) {
      dispatch(handleToastError("Error! cannot perform operation"))
    }
  };

  const handleDelete = async () => {
    try {
      const accessToken = localStorage.getItem("token")
      const response = await axios.delete(`http://localhost:5000/remove_staff/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
      }
      });
      if (response.status === 200) {
        handleDepCount();
        dispatch(handleToastSuccess("Successfully Deleted"))
      }
    } catch (error) {
      dispatch(handleToastError("Error! cannot perform operation"))
    }
  };

  const handleNavigate = () => {
    navigate(`/admin/view-staff/${id}`);
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
            <label htmlFor="">{name} Name</label>
            <input type="text"
              className='input'
              placeholder='eg Emmanuel Yidana'
              name='name'
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Email</label>
            <input type="text"
              className='input'
              placeholder='eg eyidana001@gmial.com'
              name='email'
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="" className='label'>Password</label>
            <input type="password"
              className='input'
              placeholder='enter a strong password'
              name='password'
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Phone</label>
            <input type="text"
              className='input'
              placeholder='eg 0597893082'
              name='phone'
              value={data.phone}
              onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="" className='label'>Address</label>
            <input type="text"
              className='input'
              placeholder='University of Ghana'
              name='address'
              value={data.address}
              onChange={handleChange}
            />
          </div>
          <div className='input-container'>
          <label htmlFor="">Role</label>
            <select name="role" onChange={handleChange} className='dropdown'>
              <option value="">{data.role}</option>
              <option value='Doctor'>Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="Pharmacist">Pharmacist</option>
              <option value="Laboratorist">Laboratorist</option>
              <option value="Radiographer">Radiographer</option>
              <option value="Accountant">Accountant</option>
            </select>
          </div>
          {name === "Doctor" &&
            <div className='input-container'>
              <label htmlFor="">Department Name</label>
              <input type="text"
                className='input'
                placeholder='eg Public Health'
                name='department'
                value={data.department}
                onChange={handleChange}
              />
            </div>
          }
           <div className='input-container'>
              <label htmlFor="" className='label'>Profile Image</label>
              <input type="file" name="file" id="file" onChange={e=>setFile(e.target.files[0])} />
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

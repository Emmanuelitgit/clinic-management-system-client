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
import { getStaff, getPatients } from '../../store/data';
import { v4 as uuidv4 } from 'uuid'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
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

export default function AddInvoice() {

  axios.defaults.withCredentials = true;

  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);
  const [reference, setReference] = useState()
  const [open, setOpen] = React.useState(false);
  const[description, setDescription] = useState()
  const [data, setData] = useState({
    title:'',
    amount:'',
    method:'',
    patient_id:null,
    email:'',
    accountant_id:'',
    date:'',
    status:'',
    transaction_id:uuidv4(),
    description:description
  });


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch()
  const patients = useSelector((state)=>state.data?.patients) || []
  const accountants = useSelector((state)=>state.data?.staff) || []
  const dep = useSelector(state => state.count?.depValue) || [2];

  useEffect(()=>{
    dispatch(getStaff('Accountant'))
  }, [dispatch])

  useEffect(()=>{
    dispatch(getPatients())
  }, [dispatch])

  useEffect(()=>{
    setData(prev => ({
      ...prev,
      transaction_id:uuidv4()
    }));
  }, [dep]);

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
  
  const handleDepCount =()=>{
    dispatch(depCountActions.handleCount())
  }

//   const handlePayment = async () => {
//     try {
//         const response = await axios.post('http://localhost:5000/initialize-payment', {
//           email:"eyidana001@gmail.com",
//           amount:25 
//         });
//         const { authorization_url } = response.data.data;
//         const { reference } = response.data.data;
//         setReference(reference)
//         window.location.href = authorization_url;
//     } catch (error) {
//        console.log(error);
//     }
// };


useEffect(() => {
  const verifyPayment = async () => {
      try {
          if(reference){
            const response = await api.get(`/verify-payment/${reference}`);
            setPaymentStatus(response.data.data.status);
          }
      } catch (error) {
        console.log(error)
          setError(error.response ? error.response.data : 'An error occurred');
      } finally {
          setLoading(false);
      }
  };
  verifyPayment();
}, [reference]);

  
  const handleSubmit = async() => {
    try {
      const response = await api.post(`/add_invoice`, {
        ...data, amount:parseFloat(data.amount)
      });
      console.log(response)
      if(response.status === 201){
        handleDepCount()
        handleClose()
        Swal.fire({
          title: "Success!",
          text: "Invoice created successfully!",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-success",
          },
        });
        
       if(data.method === "MOMO"){
        const { authorization_url } = response.data.data;
        const { reference } = response.data.data;
        window.location.href = authorization_url;
       }
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
         Add New Invoice
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
            <label htmlFor="">Title</label>
           <select name="title" id="" onChange={handleChange} className='dropdown'>
            <option value="">--Select Ttitle--</option>
            <option value="Consultation">Medical Consulatiton</option>
            <option value="Review">Medical Review</option>
            <option value="Hepatities Test">Hepatities Test</option>
            <option value="Malaria Test">Malaria Test</option>
           </select>
          </div>
          <div className='input-container'>
            <label htmlFor="">Ammount</label>
            <input type="number"
              className='input'
              placeholder='eg 100'
              name='amount'
              onChange={handleChange}  
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Paymenet Method</label>
            <select name="method" id="" className='dropdown' onChange={handleChange} >
              <option value="">--Select Payment Method--</option>
              <option value="Cash">Cash</option>
              <option value="MOMO">MOMO</option>
            </select>
          </div>
          <div className='input-container'>
          <label htmlFor="">Patient</label>
            <select name="patient_id" onChange={handleChange} value={data.patient} className='dropdown'>
              <option value="">--Select Patient--</option>
              {patients?.map((item)=>(
                <option value={item.patient_id} key={item.patient_id}>
                  {item.name}
                </option>
              ))}
            </select>
        </div>
        <div className='input-container'>
            <label htmlFor="">Email</label>
            <input type="email"
              className='input'
              placeholder='eg eyidana001@gmail.com'
              name='email'
              onChange={handleChange}  
            />
          </div>
        <div className='input-container'>
          <label htmlFor="">Accountant</label>
            <select name="accountant_id" onChange={handleChange} value={data.doctor}  className='dropdown'>
              <option value="">--Select Accountant--</option>
              {accountants?.map((item)=>(
                <option value={item.staff_id} key={item.staff_id}>
                  {item.name}
                </option>
              ))}
            </select>
        </div>
          <div className='input-container'>
            <label htmlFor="">Date</label>
            <input type="date"
              className='input'
              name='date'
              onChange={handleChange} 
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Paymenet Status</label>
            <select name="status" id="" className='dropdown' onChange={handleChange} >
              <option value="">--Select Status--</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
          <div className="editor-container">
            <label htmlFor="" className='edtor-label'>Invoice Description</label>
            <ReactQuill className="editor-input" 
             theme="snow" value={description} 
             onChange={setDescription} 
             placeholder='Write your description here'
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
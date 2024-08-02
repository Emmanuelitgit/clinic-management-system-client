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
import { Link, useNavigate } from "react-router-dom"
import { data } from 'autoprefixer';
import { useDispatch, useSelector } from 'react-redux';
import { handleResultModal } from '../../store/modalState';
import { useEffect, useState } from 'react';
import { depCountActions } from '../../store/depCount';
import axios from "axios";
import { getStaff, getPatients } from '../../store/data';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';
import {handleToastSuccess, handleToastError} from "../../store/modalState"



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ManageResult({name, id, date, laboratorist_name, test_report, patient_id}) {

  axios.defaults.withCredentials = true;

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation()
  const route = location.pathname.split("/")[1]

  const laboratorist = useSelector((state)=>state.data?.staff) || []
  const result_id = useSelector((state)=>state.modal?.lab_report_id) || []

  const [open, setOpen] = React.useState(false);
  const[report, setReport] = useState(test_report || "")
  const [data, setData] = useState({
    date:'',
    laboratorist_id:null,
    patient_id:result_id,
    test_report:report
  });

  useEffect(()=>{
    setData(prev => ({
      ...prev,
      patient_id: result_id
    }));
  }, [result_id]);
  
  
    useEffect(()=>{
      dispatch(getStaff('Laboratorist'))
    }, [dispatch])

    useEffect(() => {
      setData((prevData) => ({ ...prevData, report }));
    }, [report]);

  const handleClickOpen = () => {
    setOpen(true);
    setData({
      date,
      laboratorist_id: laboratorist_name,
      patient_id: result_id,
      test_report:test_report
    });
  };

  const handleNavigate = () =>{
    navigate(`/${route}/view-result/${patient_id}`)
  }
  console.log(patient_id)

  const handleClose = () => {
    setOpen(false);
  };
  
  if (id === undefined) {
    return null; 
  }

  if (name === undefined) {
    return null; 
  }

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

  const handleUpdate = async() => {
    try {
      const response = await axios.put(`http://localhost:5000/update_lab_result/${id}`, data);
      if(response.status === 201){
        handleDepCount()
        handleClose()
        dispatch(handleToastSuccess("Updated Successfully"))
      }
    } catch (error) {
      dispatch(handleToastError('Error! cannot perform operation'))
    }
  };

  const handleDelete = async() => {
    try {
      const response = await axios.delete(`http://localhost:5000/remove_lab_result/${id}`);
      if(response.status === 200){
        handleDepCount()
        dispatch(handleToastSuccess("Deleted Successfully"))
      }
    } catch (error) {
      dispatch(handleToastError('Error! cannot perform operation'))
    }
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
            <label htmlFor="">Date</label>
            <input type="date"
              className='input'
              name='date'
              value={data.date}
              onChange={handleChange} 
            />
        </div>
         <div className="editor-container">
            <label htmlFor="" className='edtor-label'>Description</label>
            <ReactQuill className="editor-input" 
             theme="snow" value={report} 
             onChange={setReport}
             placeholder='Write test report here..'  
             />
          </div> 
        <input type="hidden"
        name='patient_id'
        value={result_id}
         />
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
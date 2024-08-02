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
import { handleResultModal } from '../../store/modalState';
import { useEffect, useState } from 'react';
import { depCountActions } from '../../store/depCount';
import axios from "axios";
import { getStaff, getPatients } from '../../store/data';
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

export default function AddResult() {

  axios.defaults.withCredentials = true;
  
  const dispatch = useDispatch();

  const open = useSelector((state) => state.modal.resultModal);
  const laboratorist = useSelector((state) => state.data?.staff) || [];
  const result_id = useSelector((state) => state.modal?.lab_report_id) || [];
  const dep = useSelector((state) => state.count?.depValue) || [2];

  const [report, setReport] = useState('');
  const [data, setData] = useState({
    date: '',
    laboratorist_id: null,
    patient_id: result_id,
    test_report: report,
  });


  useEffect(() => {
    setData((prev) => ({
      ...prev,
      patient_id: result_id,
    }));
  }, []);


  useEffect(() => {
    dispatch(getStaff('Laboratorist'));
  }, [dispatch]);

  useEffect(() => {
    setData((prevData) => ({ ...prevData, test_report: report }));
  }, [report]);

  
  const handleOpen = () => {
    dispatch(handleResultModal());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleDepCount = () => {
    dispatch(depCountActions.handleCount());
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/add_lab_result`, data);
      if (response.status === 201) {
        handleDepCount();
        handleOpen();
        dispatch(handleToastSuccess("Created Successfully"))
      } else {
        dispatch(handleToastError('Error! cannot perform operation'))
      }
      console.log(response);
    } catch (error) {
      dispatch(handleToastError('Error! cannot perform operation'))
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2, width: "400px" }} id="customized-dialog-title">
          Add New Result
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleOpen}
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
            <label htmlFor="">Date</label>
            <input
              type="date"
              className='input'
              name='date'
              onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Laboratorist</label>
            <select name="laboratorist_id" onChange={handleChange} className='dropdown'>
              <option value="">--Select Laboratorist--</option>
              {laboratorist?.map((item) => (
                <option value={item.staff_id} key={item.staff_id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="editor-container">
            <label htmlFor="" className='edtor-label'>Result Case</label>
            <ReactQuill
              className="editor-input"
              theme="snow"
              value={report}
              onChange={setReport}
              placeholder='Write a test report here..'
            />
          </div>
          <input type="hidden" name='patient_id' value={result_id} />
        </DialogContent>
        <DialogActions>
          <button
            autoFocus
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
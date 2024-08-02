import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { depCountActions } from '../../store/depCount';
import { ArrowDropDown } from '@mui/icons-material';
import {handleToastSuccess, handleToastError} from "../../store/modalState"


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function StatusDropdown({ statusValue, name, id, option1, option2, width, padding, backgroundColor, url }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ status: '' });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ [name]: value });
  };

  const dispatch = useDispatch();

  const handleDepCount = () => {
    dispatch(depCountActions.handleCount());
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/update_${url}_status/${id}`, { status: data.status });
      if (response.status === 201) { 
        handleDepCount();
        handleClose();
        dispatch(handleToastSuccess("Updated Successfully"))
      }
    } catch (error) {
      dispatch(handleToastError('Error! cannot perform operation'))
    }
  };


  return (
    <React.Fragment>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button
          onClick={handleClickOpen}
          style={{
            width: width,
            padding: padding,
            backgroundColor: backgroundColor,
            color: 'white',
            borderRadius: '3px',
            outline: 'none',
          }}
        >
          {statusValue}<ArrowDropDown/>
        </button>
      </div>
      <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2, width: '330px' }} id="customized-dialog-title">
          Change {name} status here
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'red',
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="status-dropdown-container">
            <select name="status" onChange={handleChange} className="status-dropdown-input">
              <option value="">--select status--</option>
              <option value={option1}>{option1}</option>
              <option value={option2}>{option2}</option>
            </select>
          </div>
        </DialogContent>
        <DialogActions>
          <button onClick={handleSubmit} className="modal-btn">
            Save changes
          </button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast} from 'react-toastify';


export const modalSlice = createSlice({
    name:"modal",
    initialState:{
        resultModal:false,
        lab_report_id:null,
        sidebar_toggle:false
    },
    reducers:{
        handleResultModal:(state)=>{
            state.resultModal = !state.resultModal
        },
        handleLabReport:(state, action)=>{
            state.lab_report_id = action.payload
        },
        handleSidebarToggle:(state)=>{
            state.sidebar_toggle = !state.sidebar_toggle
        },
        handleToastSuccess:(state, action)=>{
            toast.success(action.payload)
        },
        handleToastError:(state,action)=>{
            toast.error(action.payload)
        },
    }
})

export const {
              handleResultModal, 
              handleLabReport, 
              handleSidebarToggle,
              handleToastSuccess,
              handleToastError
            } = modalSlice.actions;
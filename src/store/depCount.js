import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const depCountSlice = createSlice({
    name:'count',
    initialState:{
        depValue:1
    },
    reducers:{
        handleCount:(state, action)=>{
            state.depValue = state.depValue+1;
        }
    }
})

export const depCountActions = depCountSlice.actions;
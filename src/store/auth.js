import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Link, useNavigate, } from "react-router-dom"




export const login = createAsyncThunk("login", async(credential)=>{
    try {
        const response = await axios.post("http://localhost:5000/login", credential);
        console.log(response)
        if (response.status === 200) {
          const { role } = response.data?.data[0]; 
          const {name} = response.data?.data[0];
          const {token} = response?.data;
  
          localStorage.setItem("role", role);
          localStorage.setItem("user", name);
          localStorage.setItem("token", token);
        }

        return [response.data, credential];
        
      } catch (error) {
        if (error.response.status === 404) {
          console.log("user not found")
        }
      }
})


export const authSlice = createSlice({
    name:"auth",
    initialState:{
    },
    reducers:{
        logout:(state)=>{
            localStorage.removeItem("user")
            localStorage.removeItem("role")
            localStorage.removeItem("token")
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.fulfilled, (state, action)=>{
            // localStorage.setItem("token", action.payload[0]?.token)
            // localStorage.setItem("user", action.payload[0]?.data[0].name)
            // localStorage.setItem("role", action.payload[0]?.data[0].role)
        })
    }
})

export const {logout} = authSlice.actions;
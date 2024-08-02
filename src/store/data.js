import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




axios.defaults.withCredentials = true;

export const getStaff = createAsyncThunk("doctors", async (role) => {
    try {
      const accessToken = localStorage.getItem("token")
      const response = await axios.get(`http://localhost:5000/all_staff`, {
        headers: {
          // 'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
      }
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getSingleStaff = createAsyncThunk("staff", async (id) => {
    try {
      const accessToken = localStorage.getItem("token")
      const response = await axios.get(`http://localhost:5000/single_staff/${id}`, {
        headers: {
          // 'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
      }
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getPatients = createAsyncThunk("patients", async () => {
    try {
      const accessToken = localStorage.getItem("token")
      const response = await axios.get(`http://localhost:5000/patients`, {
        headers: {
          // 'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
      }
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getPatient = createAsyncThunk("patient", async (id) => {
    try {
      const accessToken = localStorage.getItem("token")
      const response = await axios.get(`http://localhost:5000/patient/${id}`, {
        headers: {
          // 'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
      }
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getBeds = createAsyncThunk("beds", async () => {
    try {
      const response = await axios.get(`http://localhost:5000/beds`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getBloodGroup = createAsyncThunk("blood_group", async () => {
    try {
      const response = await axios.get(`http://localhost:5000/blood_bank_list`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getReports = createAsyncThunk("reports", async () => {
    try {
      const response = await axios.get(`http://localhost:5000/reports`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getAppointmentList = createAsyncThunk("appointments", async () => {
    try {
      const response = await axios.get(`http://localhost:5000/appointments`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getPrescription = createAsyncThunk("prescription", async () => {
    try {
      const response = await axios.get(`http://localhost:5000/prescriptions`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getBedAllotment = createAsyncThunk("allotment", async () => {
    try {
      const response = await axios.get(`http://localhost:5000/bed_allotments`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getMedicineCategories = createAsyncThunk("categories", async () => {
    try {
      const response = await axios.get(`http://localhost:5000/medicine_categories`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getMedicineList = createAsyncThunk("medicineList", async () => {
    try {
      const response = await axios.get(`http://localhost:5000/medicine_list`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getPrescriptionCountForPharmacist = createAsyncThunk("presPharCount", async () => {
    try {
      const response = await axios.get(`http://localhost:5000/prescriptions/count`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getInvoiceList = createAsyncThunk("invoice", async () => {
    try {
      const response = await axios.get(`http://localhost:5000/invoice_list`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getLabResult = createAsyncThunk("lab", async (type) => {
    try {
      const response = await axios.get(`http://localhost:5000/lab_result_list/${type}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getBloodDonors = createAsyncThunk("donor", async () => {
    try {
      const response = await axios.get(`http://localhost:5000/blood_donors`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

export const dataSlice = createSlice({
    name:"data",
    initialState:{
        staff:[],
        singleStaff:[],
        patients:[],
        patient:[],
        beds:[],
        bloodBank:[],
        reports:[],
        appointments:[],
        prescriptions:[],
        bedAllotment:[],
        medicineCategories:[],
        medicineList:[],
        prescCountPharmacist:[],
        invoiceList:[],
        labResult:[],
        bloodDonors:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder     
          .addCase(getStaff.fulfilled, (state,action)=>{
            state.staff = action.payload
           })
          .addCase(getPatients.fulfilled, (state,action)=>{
            state.patients = action.payload
          })
          .addCase(getBeds.fulfilled, (state,action)=>{
            state.beds = action.payload
          })
          .addCase(getBloodGroup.fulfilled, (state,action)=>{
            state.bloodBank = action.payload
          })
          .addCase(getReports.fulfilled, (state,action)=>{
            state.reports = action.payload
          })
          .addCase(getAppointmentList.fulfilled, (state,action)=>{
            state.appointments = action.payload
          })
          .addCase(getBedAllotment.fulfilled, (state,action)=>{
            state.bedAllotment = action.payload
          })
          .addCase(getMedicineCategories.fulfilled, (state,action)=>{
            state.medicineCategories = action.payload
          })
          .addCase(getMedicineList.fulfilled, (state,action)=>{
            state.medicineList = action.payload
          })
          .addCase(getPrescriptionCountForPharmacist.fulfilled, (state,action)=>{
            state.prescCountPharmacist = action.payload
          })
          .addCase(getInvoiceList.fulfilled, (state,action)=>{
            state.invoiceList = action.payload
          })
          .addCase(getLabResult.fulfilled, (state,action)=>{
            state.labResult = action.payload
          })
          .addCase(getBloodDonors.fulfilled, (state,action)=>{
            state.bloodDonors = action.payload
          })
          .addCase(getPatient.fulfilled, (state,action)=>{
            state.patient = action.payload
          })
          .addCase(getSingleStaff.fulfilled, (state,action)=>{
            state.singleStaff = action.payload
          })
          .addCase(getPrescription.fulfilled, (state,action)=>{
            state.prescriptions= action.payload
          })                               
    }
})


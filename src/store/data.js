// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";




// axios.defaults.withCredentials = true;
// export const getStaff = createAsyncThunk("doctors", async (role, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(`/all_staff`, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     return response.data;
//   } catch (err) {
//     console.log(err);
//     return rejectWithValue(err.response.data);
//   }
// });

//   export const getSingleStaff = createAsyncThunk("staff", async (id) => {
//     try {
//       const response = await axios.get(`/single_staff/${id}`, {
//         headers: {
//           'Content-Type': 'application/json'
//       }
//       });
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   export const getPatients = createAsyncThunk("patients", async () => {
//     try {
//       const response = await axios.get(`/patients`, {
//         headers: {
//           'Content-Type': 'application/json'
//       }
//       });
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   export const getPatient = createAsyncThunk("patient", async (id) => {
//     try {
//       const response = await axios.get(`/patient/${id}`, {
//         headers: {
//           'Content-Type': 'application/json'
//       }
//       });
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   export const getBeds = createAsyncThunk("beds", async () => {
//     try {
//       const response = await axios.get(`/beds`);
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   export const getBloodGroup = createAsyncThunk("blood_group", async () => {
//     try {
//       const response = await axios.get(`/blood_bank_list`);
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   export const getReports = createAsyncThunk("reports", async () => {
//     try {
//       const response = await axios.get(`/reports`);
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   export const getAppointmentList = createAsyncThunk("appointments", async () => {
//     try {
//       const response = await axios.get(`/appointments`);
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   export const getPrescription = createAsyncThunk("prescription", async () => {
//     try {
//       const response = await axios.get(`/prescriptions`);
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   export const getBedAllotment = createAsyncThunk("allotment", async () => {
//     try {
//       const response = await axios.get(`/bed_allotments`);
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   export const getMedicineCategories = createAsyncThunk("categories", async () => {
//     try {
//       const response = await axios.get(`/medicine_categories`);
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   export const getMedicineList = createAsyncThunk("medicineList", async () => {
//     try {
//       const response = await axios.get(`/medicine_list`);
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   export const getPrescriptionCountForPharmacist = createAsyncThunk("presPharCount", async () => {
//     try {
//       const response = await axios.get(`/prescriptions/count`);
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   export const getInvoiceList = createAsyncThunk("invoice", async () => {
//     try {
//       const response = await axios.get(`/invoice_list`);
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   export const getLabResult = createAsyncThunk("lab", async (type) => {
//     try {
//       const response = await axios.get(`/lab_result_list/${type}`);
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   export const getBloodDonors = createAsyncThunk("donor", async () => {
//     try {
//       const response = await axios.get(`/blood_donors`);
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   });

// export const dataSlice = createSlice({
//     name:"data",
//     initialState:{
//         staff:[],
//         singleStaff:[],
//         patients:[],
//         patient:[],
//         beds:[],
//         bloodBank:[],
//         reports:[],
//         appointments:[],
//         prescriptions:[],
//         bedAllotment:[],
//         medicineCategories:[],
//         medicineList:[],
//         prescCountPharmacist:[],
//         invoiceList:[],
//         labResult:[],
//         bloodDonors:[]
//     },
//     reducers:{},
//     extraReducers:(builder)=>{
//         builder     
//           .addCase(getStaff.fulfilled, (state,action)=>{
//             state.staff = action.payload
//            })
//           .addCase(getPatients.fulfilled, (state,action)=>{
//             state.patients = action.payload
//           })
//           .addCase(getBeds.fulfilled, (state,action)=>{
//             state.beds = action.payload
//           })
//           .addCase(getBloodGroup.fulfilled, (state,action)=>{
//             state.bloodBank = action.payload
//           })
//           .addCase(getReports.fulfilled, (state,action)=>{
//             state.reports = action.payload
//           })
//           .addCase(getAppointmentList.fulfilled, (state,action)=>{
//             state.appointments = action.payload
//           })
//           .addCase(getBedAllotment.fulfilled, (state,action)=>{
//             state.bedAllotment = action.payload
//           })
//           .addCase(getMedicineCategories.fulfilled, (state,action)=>{
//             state.medicineCategories = action.payload
//           })
//           .addCase(getMedicineList.fulfilled, (state,action)=>{
//             state.medicineList = action.payload
//           })
//           .addCase(getPrescriptionCountForPharmacist.fulfilled, (state,action)=>{
//             state.prescCountPharmacist = action.payload
//           })
//           .addCase(getInvoiceList.fulfilled, (state,action)=>{
//             state.invoiceList = action.payload
//           })
//           .addCase(getLabResult.fulfilled, (state,action)=>{
//             state.labResult = action.payload
//           })
//           .addCase(getBloodDonors.fulfilled, (state,action)=>{
//             state.bloodDonors = action.payload
//           })
//           .addCase(getPatient.fulfilled, (state,action)=>{
//             state.patient = action.payload
//           })
//           .addCase(getSingleStaff.fulfilled, (state,action)=>{
//             state.singleStaff = action.payload
//           })
//           .addCase(getPrescription.fulfilled, (state,action)=>{
//             state.prescriptions= action.payload
//           })                               
//     }
// })


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api";

axios.defaults.withCredentials = true;

export const getStaff = createAsyncThunk(
  "doctors",
  async (role, { rejectWithValue }) => {
    try {
      const response = await api.get(`/all_staff`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response ? err.response.data : 'Server error');
    }
  }
);

export const getSingleStaff = createAsyncThunk(
  "staff",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/single_staff/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response ? err.response.data : 'Server error');
    }
  }
);

export const getPatients = createAsyncThunk(
  "patients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/patients`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response ? err.response.data : 'Server error');
    }
  }
);

export const getPatient = createAsyncThunk(
  "patient",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/patient/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response ? err.response.data : 'Server error');
    }
  }
);

export const getBeds = createAsyncThunk(
  "beds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/beds`);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response ? err.response.data : 'Server error');
    }
  }
);

export const getBloodGroup = createAsyncThunk(
  "blood_group",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/blood_bank_list`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response ? err.response.data : 'Server error');
    }
  }
);

export const getReports = createAsyncThunk(
  "reports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/reports`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response ? err.response.data : 'Server error');
    }
  }
);

export const getAppointmentList = createAsyncThunk(
  "appointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/appointments`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response ? err.response.data : 'Server error');
    }
  }
);

export const getPrescription = createAsyncThunk(
  "prescription",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/prescriptions`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response ? err.response.data : 'Server error');
    }
  }
);

export const getBedAllotment = createAsyncThunk(
  "allotment",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/bed_allotments`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response ? err.response.data : 'Server error');
    }
  }
);

export const getMedicineCategories = createAsyncThunk(
  "categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/medicine_categories`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response ? err.response.data : 'Server error');
    }
  }
);

export const getMedicineList = createAsyncThunk(
  "medicineList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/medicine_list`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response ? err.response.data : 'Server error');
    }
  }
);

export const getPrescriptionCountForPharmacist = createAsyncThunk(
  "presPharCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/prescriptions/count`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response ? err.response.data : 'Server error');
    }
  }
);

export const getInvoiceList = createAsyncThunk(
  "invoice",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/invoice_list`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response ? err.response.data : 'Server error');
    }
  }
);

export const getLabResult = createAsyncThunk(
  "lab",
  async (type, { rejectWithValue }) => {
    try {
      const response = await api.get(`/lab_result_list/${type}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response ? err.response.data : 'Server error');
    }
  }
);

export const getBloodDonors = createAsyncThunk(
  "donor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/blood_donors`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response ? err.response.data : 'Server error');
    }
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    staff: [],
    singleStaff: [],
    patients: [],
    patient: [],
    beds: [],
    bloodBank: [],
    reports: [],
    appointments: [],
    prescriptions: [],
    bedAllotment: [],
    medicineCategories: [],
    medicineList: [],
    prescCountPharmacist: [],
    invoiceList: [],
    labResult: [],
    bloodDonors: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder     
      .addCase(getStaff.fulfilled, (state, action) => {
        state.staff = action.payload;
      })
      .addCase(getStaff.rejected, (state, action) => {
        console.error("Failed to fetch staff:", action.payload);
      })
      .addCase(getSingleStaff.fulfilled, (state, action) => {
        state.singleStaff = action.payload;
      })
      .addCase(getSingleStaff.rejected, (state, action) => {
        console.error("Failed to fetch single staff:", action.payload);
      })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.patients = action.payload;
      })
      .addCase(getPatients.rejected, (state, action) => {
        console.error("Failed to fetch patients:", action.payload);
      })
      .addCase(getPatient.fulfilled, (state, action) => {
        state.patient = action.payload;
      })
      .addCase(getPatient.rejected, (state, action) => {
        console.error("Failed to fetch patient:", action.payload);
      })
      .addCase(getBeds.fulfilled, (state, action) => {
        state.beds = action.payload;
      })
      .addCase(getBeds.rejected, (state, action) => {
        console.error("Failed to fetch beds:", action.payload);
      })
      .addCase(getBloodGroup.fulfilled, (state, action) => {
        state.bloodBank = action.payload;
      })
      .addCase(getBloodGroup.rejected, (state, action) => {
        console.error("Failed to fetch blood bank:", action.payload);
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.reports = action.payload;
      })
      .addCase(getReports.rejected, (state, action) => {
        console.error("Failed to fetch reports:", action.payload);
      })
      .addCase(getAppointmentList.fulfilled, (state, action) => {
        state.appointments = action.payload;
      })
      .addCase(getAppointmentList.rejected, (state, action) => {
        console.error("Failed to fetch appointments:", action.payload);
      })
      .addCase(getBedAllotment.fulfilled, (state, action) => {
        state.bedAllotment = action.payload;
      })
      .addCase(getBedAllotment.rejected, (state, action) => {
        console.error("Failed to fetch bed allotment:", action.payload);
      })
      .addCase(getMedicineCategories.fulfilled, (state, action) => {
        state.medicineCategories = action.payload;
      })
      .addCase(getMedicineCategories.rejected, (state, action) => {
        console.error("Failed to fetch medicine categories:", action.payload);
      })
      .addCase(getMedicineList.fulfilled, (state, action) => {
        state.medicineList = action.payload;
      })
      .addCase(getMedicineList.rejected, (state, action) => {
        console.error("Failed to fetch medicine list:", action.payload);
      })
      .addCase(getPrescription.fulfilled, (state, action) => {
        state.prescriptions = action.payload;
      })
      .addCase(getPrescription.rejected, (state, action) => {
        console.error("Failed to fetch prescription count for pharmacist:", action.payload);
      })
      .addCase(getInvoiceList.fulfilled, (state, action) => {
        state.invoiceList = action.payload;
      })
      .addCase(getInvoiceList.rejected, (state, action) => {
        console.error("Failed to fetch invoice list:", action.payload);
      })
      .addCase(getLabResult.fulfilled, (state, action) => {
        state.labResult = action.payload;
      })
      .addCase(getLabResult.rejected, (state, action) => {
        console.error("Failed to fetch lab result:", action.payload);
      })
      .addCase(getBloodDonors.fulfilled, (state, action) => {
        state.bloodDonors = action.payload;
      })
      .addCase(getBloodDonors.rejected, (state, action) => {
        console.error("Failed to fetch blood donors:", action.payload);
      });
  }
});

export default dataSlice.reducer;

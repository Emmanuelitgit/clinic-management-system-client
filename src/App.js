import React, { useEffect, useState } from 'react';
import "../src/Componets/Style/style.css"
import {createBrowserRouter, Outlet, RouterProvider, Navigate} from "react-router-dom";
import AdminNavs from "./Componets/Navs/AdminNavs"
import Login from "./Pages/Login/Login";
import AdminDashboard from "./Pages/Admin/Dashboard/AdminDashboard"
import Register from "./Pages/Register/Register";
import Payment from "./Componets/Payment/Payment"
import PatientList from "./Componets/Patient/PatientList"
import DoctorList from "./Pages/Admin/Doctor/DoctorList"
import DepartmentList from './Pages/Admin/Department/DepartmentList';
import NurseList from "./Pages/Admin/Nurse/NurseList"
import AppointmentList from "./Componets/Appointment/AppointmentList"
import AccountantList from "./Pages/Admin/Accountant/AccountantList"
import PharmacistList from "./Pages/Admin/Pharmacist/PharmacistList"
import LaboratoristList from "./Pages/Admin/Laboratorist/LaboratoristList"
import RadiographerList from "./Pages/Admin/Radiographer.jsx/RadiographerList"
import BedAllotmentList from "./Componets/BedWard/BedAllotmentList"
import BirthReport from "./Componets/Report/BirthReport"
import DeathReport from "./Componets/Report/DeathReport"
import BloodBank from "./Componets/BloodBank/BloodBank"
import BloodDonorList from "./Componets/BloodBank/BloodDonorList"
import BedList from "./Componets/BedWard/BedList"
import OperationReport from "./Componets/Report/OperationReport"
import MedicineList from "./Componets/Medicine/MedicineList"
import DoctorNavs from './Componets/Navs/DoctorNavs';
import DoctorDashboard from "./Pages/Doctor/DoctorDashboard"
import PrescriptionList from './Componets/Prescription/PrescriptionList';
import RequestList from './Componets/Labs/RequestList';
import ResultList from './Componets/Labs/ResultList';
import NurseDashboard from './Pages/Nurse/NurseDashboard';
import NurseNavs from './Componets/Navs/NurseNavs';
import InvoiceList from './Componets/Payment/InvoiceList';
import VitalList from './Componets/Vital/VitalList';
import Profile from './Componets/Profile/Profile';
import Settings from './Pages/Admin/Settings/Settings';
import PharmacistNavs from './Componets/Navs/PharmacistNavs';
import PharmacistDashboard from './Pages/Pharmacist/PharmacistDashboard';
import MedicineCategory from './Componets/Medicine/MedicineCategory';
import LaboratoristNavs from './Componets/Navs/LaboratoristNavs';
import AccountantNavs from './Componets/Navs/AccountantNavs';
import AccountantDashboard from './Pages/Accountant/AccountantDashboard';
import RadiographerNavs from './Componets/Navs/RadiographerNavs';
import RadiographerDashboard from './Pages/Radiographer/RadiographerDashboard';
import ViewStaff from './Pages/Admin/Add Staff/ViewStaff';
import ViewPatient from './Componets/Patient/ViewPatient';
import ViewResult from './Componets/Labs/ViewResult';
import ViewReport from './Componets/Report/ViewReport';
import ViewPrescription from './Componets/Prescription/ViewPrescription';
import ViewAppointment from './Componets/Appointment/ViewAppointment';
import ViewAllotment from './Componets/BedWard/ViewAllotment';
import ViewBloodBank from './Componets/BloodBank/ViewBloodBank';
import ViewVital from './Componets/Vital/ViewVital';
import ViewBed from './Componets/BedWard/ViewBed';
import ViewDonor from './Componets/BloodBank/ViewDonor';
import ViewMedCategory from './Componets/Medicine/ViewMedCategory';
import ViewMedicine from './Componets/Medicine/ViewMedicine';
import ViewInvoice from './Componets/Payment/ViewInvoice';
import ViewRequest from './Componets/Labs/ViewRequest';
import ViewDepartment from './Pages/Admin/Department/ViewDepartment';
import Diabetes from './Componets/Prediction/Diabetes';
import LiverDisease from './Componets/Prediction/LiverDisease';
import HeartDisease from './Componets/Prediction/HeartDisease';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@coreui/coreui/dist/css/coreui.min.css'
import Chat from "./Componets/Chat/ChatContainer/Chat"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin =()=>{
 return(
  <> 
  <AdminNavs/>
  <Outlet/>
  </>
 )
}

const Doctor =()=>{
  return(
   <> 
   <DoctorNavs/>
   <Outlet/>
   </>
  )
 }

 const Nurse =()=>{
  return(
   <> 
   <NurseNavs/>
   <Outlet/>
   </>
  )
 }

 const Pharmacist =()=>{
  return(
   <> 
   <PharmacistNavs/>
   <Outlet/>
   </>
  )
 }

 const Laboratorist =()=>{
  return(
   <> 
   <LaboratoristNavs/>
   <Outlet/>
   </>
  )
 }

 const Radiographer =()=>{
  return(
   <> 
   <RadiographerNavs/>
   <Outlet/>
   </>
  )
 }

 const Accountant =()=>{
  return(
   <> 
   <AccountantNavs/>
   <Outlet/>
   </>
  )
 }

const router = createBrowserRouter([

    // ADMIN MODULE NAVOGATION HERE
  {
    path: "/admin",
    element: <Admin/>,
    children: [
      { path: "/admin/dashboard", element: <AdminDashboard /> },
      { path: "/admin/department-list", element: <DepartmentList /> },
      { path: "/admin/doctor-list", element: <DoctorList /> },
      { path: "/admin/payment-list", element: <Payment /> },
      { path: "/admin/patient-list", element: <PatientList /> },
      { path: "/admin/nurse-list", element: <NurseList /> },
      { path: "/admin/pharmacist-list", element: <PharmacistList /> },
      { path: "/admin/laboratorist-list", element: <LaboratoristList /> },
      { path: "/admin/radiographer-list", element: <RadiographerList /> },
      { path: "/admin/accountant-list", element: <AccountantList /> },
      { path: "/admin/operation-report", element: <OperationReport /> },
      { path: "/admin/medicine-list", element: <MedicineList /> },
      { path: "/admin/bed-list", element: <BedList /> },
      { path: "/admin/bed-allotment-list", element: <BedAllotmentList /> },
      { path: "/admin/blood-bank", element: <BloodBank /> },
      { path: "/admin/blood-donor-list", element: <BloodDonorList /> },
      { path: "/admin/birth-report", element: <BirthReport /> },
      { path: "/admin/death-report", element: <DeathReport /> },
      { path: "/admin/appointment-list", element: <AppointmentList /> },
      { path: "/admin/view-staff/:id", element: <ViewStaff /> },
      { path: "/admin/view-department/:id", element: <ViewDepartment /> },
      { path: "/admin/profile", element: <Profile /> },
      { path: "/admin/settings", element: <Settings /> },
      { path: "/admin/chat", element: <Chat /> },
    ]
  },

  // DOCTOR MODULE NAVIGATION HERE
  {  
    path: "/doctor",
    element: <Doctor/>,
    children:[
      {path: "/doctor/dashboard",element: <DoctorDashboard/>},
      {path: "/doctor/patient-list",element: <PatientList/>},
      {path: "/doctor/prescription-list",element: <PrescriptionList/>},
      {path: "/doctor/appointment-list",element: <AppointmentList/>},
      { path: "/doctor/bed-allotment-list", element: <BedAllotmentList /> },
      { path: "/doctor/bed-list", element: <BedList /> },
      { path: "/doctor/blood-bank", element: <BloodBank /> },
      { path: "/doctor/blood-donor-list", element: <BloodDonorList /> },
      { path: "/doctor/birth-report", element: <BirthReport /> },
      { path: "/doctor/death-report", element: <DeathReport /> },
      { path: "/doctor/operation-report", element: <OperationReport /> },
      { path: "/doctor/lab-result", element: <ResultList /> },
      { path: "/doctor/lab-request", element: <RequestList /> },
      { path: "/doctor/view-patient/:id", element: <ViewPatient /> },
      { path: "/doctor/view-result/:id", element: <ViewResult /> },
      { path: "/doctor/view-report/:id", element: <ViewReport /> },
      { path: "/doctor/view-prescription/:id", element: <ViewPrescription /> },
      { path: "/doctor/view-appointment/:id", element: <ViewAppointment /> },
      { path: "/doctor/view-allotment/:id", element: <ViewAllotment /> },
      { path: "/doctor/view-blood-bank/:id", element: <ViewBloodBank /> },
      { path: "/doctor/predict/heart-disease", element: <HeartDisease /> },
      { path: "/doctor/predict/liver-disease", element: <LiverDisease /> },
      { path: "/doctor/predict/diabetes", element: <Diabetes /> },
      { path: "/doctor/view-request/:id", element: <ViewRequest /> },
      { path: "/doctor/profile", element: <Profile /> },
      { path: "/doctor/chat", element: <Chat /> },
    ]
  },

  // NURSE MODULE NAVIGATION HERE
  {  
    path: "/nurse",
    element: <Nurse/>,
    children:[
      {path: "/nurse/dashboard",element: <NurseDashboard/>},
      {path: "/nurse/patient-list",element: <PatientList/>},
      {path: "/nurse/appointment-list",element: <AppointmentList/>},
      { path: "/nurse/bed-allotment-list", element: <BedAllotmentList /> },
      { path: "/nurse/bed-list", element: <BedList /> },
      { path: "/nurse/blood-bank", element: <BloodBank /> },
      { path: "/nurse/blood-donor-list", element: <BloodDonorList /> },
      { path: "/nurse/birth-report", element: <BirthReport /> },
      { path: "/nurse/death-report", element: <DeathReport /> },
      { path: "/nurse/operation-report", element: <OperationReport /> },
      { path: "/nurse/vital-list", element: <VitalList /> },
      { path: "/nurse/view-blood-bank/:id", element: <ViewBloodBank /> },
      { path: "/nurse/view-patient/:id", element: <ViewPatient /> },
      { path: "/nurse/view-appointment/:id", element: <ViewAppointment /> },
      { path: "/nurse/view-allotment/:id", element: <ViewAllotment /> },
      { path: "/nurse/view-report/:id", element: <ViewReport /> },
      { path: "/nurse/view-blood-bank/:id", element: <ViewBloodBank /> },
      { path: "/nurse/view-vital/:id", element: <ViewVital /> },
      { path: "/nurse/view-bed/:id", element: <ViewBed /> },
      { path: "/nurse/view-donor/:id", element: <ViewDonor /> },
      { path: "/nurse/predict/heart-disease", element: <HeartDisease /> },
      { path: "/nurse/predict/liver-disease", element: <LiverDisease /> },
      { path: "/nurse/predict/diabetes", element: <Diabetes /> },
      { path: "/nurse/profile", element: <Profile /> },
      { path: "/nurse/chat", element: <Chat /> },
    ]
  },

  // PHARMACIST MODULE NAVIGATION HERE
  {  
    path: "/pharmacist",
    element: <Pharmacist/>,
    children:[
      {path: "/pharmacist/dashboard",element: <PharmacistDashboard/>},
      {path: "/pharmacist/medicine-list",element: <MedicineList/>},
      {path: "/pharmacist/prescription-list",element: <PrescriptionList/>},
      {path: "/pharmacist/medicine-category",element: <MedicineCategory/>},
      {path: "/pharmacist/view-medicine-category/:id",element: <ViewMedCategory/>},
      {path: "/pharmacist/view-medicine/:id",element: <ViewMedicine/>},
      { path: "/pharmacist/view-prescription/:id", element: <ViewPrescription /> },
      { path: "/pharmacist/profile", element: <Profile /> },
      { path: "/pharmacist/chat", element: <Chat /> },
    ]
  },

    // LABORATORIST MODULE NAVIGATION HERE
    {  
      path: "/laboratorist",
      element: <Laboratorist/>,
      children:[
        {path: "/laboratorist/dashboard",element: <PharmacistDashboard/>},
        {path: "/laboratorist/blood-bank",element: <BloodBank/>},
        {path: "/laboratorist/blood-donor",element: <BloodDonorList/>},
        {path: "/laboratorist/request-list",element: <RequestList/>},
        {path: "/laboratorist/lab-result",element: <ResultList/>},
        { path: "/laboratorist/view-result/:id", element: <ViewResult /> },
        { path: "/laboratorist/view-blood-bank/:id", element: <ViewBloodBank /> },
        { path: "/laboratorist/view-donor/:id", element: <ViewDonor /> },
        { path: "/laboratorist/heart-disease", element: <HeartDisease /> },
        { path: "/laboratorist/liver-disease", element: <LiverDisease /> },
        { path: "/laboratorist/diabetes", element: <Diabetes /> }, 
        { path: "/laboratorist/profile", element: <Profile /> },
        { path: "/laboratorist/chat", element: <Chat /> },
      ]
    },

        // RADIOGRAPHER MODULE NAVIGATION HERE
        {  
          path: "/radiographer",
          element: <Radiographer/>,
          children:[
            {path: "/radiographer/dashboard",element: <RadiographerDashboard/>},
            {path: "/radiographer/request-list",element: <RequestList/>},
            {path: "/radiographer/scan-reports",element: <ResultList/>},
            { path: "/radiographer/view-result/:id", element: <ViewResult /> },
            { path: "/radiographer/profile", element: <Profile /> },
            { path: "/radiographer/chat", element: <Chat /> },
          ]
        },

   // ACCOUNTANT MODULE NAVIGATION HERE
  {  
    path: "/accountant",
    element: <Accountant/>,
    children:[
      {path: "/accountant/dashboard",element: <AccountantDashboard/>},
      {path: "/accountant/payment-list",element: <Payment/>},
      {path: "/accountant/invoice-list",element: <InvoiceList/>},
      {path: "/accountant/view-invoice/:id",element: <ViewInvoice/>},
      { path: "/accountant/profile", element: <Profile /> },
      { path: "/accountant/chat", element: <Chat /> },
    ]
  },

  {path: "/register",element: <Register/>},
  {path: "/login",element: <Login/>},
  { path: "/chat", element: <Chat /> },
  {
    path: "/*",
    element: <Navigate to="/login" replace />
  }
])


function App() {

  axios.defaults.withCredentials = true;

  return (
    <div className="App">
      <div className=''>
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}



export default App;



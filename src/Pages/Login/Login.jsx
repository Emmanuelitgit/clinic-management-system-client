import React from 'react';
import "./style.css"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import 'semantic-ui-css/semantic.min.css';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { login } from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { handleToastError, handleToastSuccess } from '../../store/modalState';
import api from '../../api';


const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [credential, setCrdential] = useState({
    email:'',
    password:'',
    role:''
  });
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState();
  const [showPassword, setShowPassword] = useState(false)


  const handleChange = (e, data) => {
    const { name, value } = data || e.target; 
  
    setCrdential(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  };

  axios.defaults.withCredentials=true;
  
  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await api.post("/login", credential, {
        withCredentials: true,
      });
  
      if (response?.status === 200) {
        const { role } = response.data.data[0]; 
        const { name } = response.data.data[0];
        const { token } = response.data;
        const { staff_id } = response.data.data[0];
        const { profile } = response.data.data[0];
  
        localStorage.setItem("role", role)
        localStorage.setItem("user", name);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", staff_id)
        localStorage.setItem("profile", profile)
  
        dispatch(handleToastSuccess("Login Success"))
  
        // Delay navigation by 2 seconds
        setTimeout(() => {
          if (role === 'Admin' || role === "admin") {
            navigate("/admin/dashboard");
          } else if (role === 'Doctor' || role === "doctor") {
            navigate("/doctor/dashboard");
          } else if (role === 'Nurse' || role === "nurse") {
            navigate("/nurse/dashboard");
          } else if (role === 'Pharmacist' || role === "pharmacist") {
            navigate("/pharmacist/dashboard");
          } else if (role === 'Accountant' || role === "accountant") {
            navigate("/accountant/dashboard");
          } else if (role === 'Laboratorist' || role === "laboratorist") {
            navigate("/laboratorist/dashboard");
          }else if (role === 'Radiographer' || role === "radiographer") {
            navigate("/radiographer/dashboard");
          }
        }, 1000);
      }
    } catch (error) {
      console.log(error)
      if (error.response?.status === 404) {
        dispatch(handleToastError("Account not found"))
      }else if(error.response?.status === 400){
        dispatch(handleToastError("Wrong username or password"))
      }
    }finally{
      setLoading(false)
    }
  };  
  
const handleShowPassword = () => {
  setShowPassword(!showPassword)
}

  return (
    <div className='login-container'>
      <div className="login-input-container">
      <div className="header-container">
        <span className='welcome-text'>Welcome, Zangu-Vuga Community Clinic</span>
        <h3 className='login-title'>LOGIN PANEL</h3>
      </div>
       <div className="input-field">
       <select name="role" onChange={handleChange} className='login-input'>
          <option value="">--select role--</option>
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
          <option value="pharmacist">Pharmacist</option>
          <option value="accountant">Accountant</option>
          <option value="laboratorist">Laboratorist</option>
          <option value="radiographer">Radiographer</option>
        </select>
       </div>
        <div className="input-field">
          <input type="email" 
          className='login-input' 
          placeholder='Email Address' 
          name="email"
          onChange={handleChange}
          autoComplete="true"
          style={{marginRight:"35px"}}
          />
        </div>
        <div className="input-field">
          <input type={showPassword? "text" : "password"} 
          className='login-input' 
          placeholder='Password'
          name="password"
          onChange={handleChange}
          autoComplete="true"
          />
          {!showPassword &&
           <Visibility 
           onClick={handleShowPassword}
            style={{
             marginRight:"6px",
             fontSize:'20px',
             cursor:'pointer'
           }}
         /> 
          }
          {showPassword &&
            <VisibilityOff 
            onClick={handleShowPassword}
             style={{
              marginRight:"6px",
              fontSize:'20px',
              cursor:'pointer'
            }}
          /> 
          }
        </div>
        <div className="button-container">
          {/* <input type="submit" 
          title='Sigin' 
          className='button' 
          onClick={handleLogin} 
          /> */}
          <button 
            className="button" type="button" 
            onClick={handleLogin}
            >
             {loading && 
              <div>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Loading...</span>
              </div>
              }
              {!loading && <span>Login</span>}
           </button>
        </div>
        <p className='copyright'>@2024 Clinic Management System. Developed by Emmanuel Yidana</p>
      </div>
    </div>
  )
}

export default Login;
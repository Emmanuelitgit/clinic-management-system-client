import React from 'react';
import "./style.css";
import { Dashboard,Person, Money, AccountBalance, Logout, ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const PredictionSidebar = () => {

    const location = useLocation()
    // const route = location.pathname.split('/')[1]
    const role = localStorage.getItem("role").toLocaleLowerCase()

    const route = role === "doctor" ? "/doctor/dashboard" : "/laboratorist/dashboard"

  return (
    <div className='sidebar-container'>
      <div className='sidebar-items-container'>
        <br /><br />
        <div className='item'>
          <Link className='link' to={`/${role}/predict/heart-disease`}>
          <Dashboard className='sidebar-icon'/>
          <span className='item-name'>Heart Disease</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={`/${role}/predict/diabetes`}>
          <Money className='sidebar-icon'/>
          <span className='item-name'>Diabetes</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={`/${role}/predict/liver-disease`}>
          <AccountBalance className='sidebar-icon'/>
          <span className='item-name'>Liver Disease</span>
          </Link>
        </div>
        <div className='item' style={{
          marginTop:'270%'
        }}>
         <Link className='link' to={`/${role}/dashboard`}>
         <ArrowBack className='sidebar-icon'/>
         <span className='item-name'>Back</span>
         </Link>
        </div>
      </div>
      <div style={{
          marginTop:'10%',
          marginRight:'10%'
        }}>
            <button>Back</button>
      </div>
    </div>
  )
}

export default PredictionSidebar;
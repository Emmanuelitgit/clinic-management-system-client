import React from 'react';
import "./style.css";
import { Dashboard,Person, Money, AccountBalance } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const PredictionSidebar = () => {

    const location = useLocation()
    const route = location.pathname.split('/')[1]
    const role = localStorage.getItem("role").toLocaleLowerCase()

  return (
    <div className='sidebar-container'>
      <div className='sidebar-items-container'>
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
        <div className='item'>
         <Link className='link' to={`/${role}/predict/dna-test`}>
         <Person className='sidebar-icon'/>
         <span className='item-name'>HB DNA Test</span>
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
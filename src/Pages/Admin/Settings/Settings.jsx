import React from 'react'
import ManageSettings from './ManageSettings';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Settings = () => {

  const [settings, setSettings] = useState()
  const dep = useSelector(state => state.count?.depValue) || [2];


  useEffect(()=>{
    const getsettings = async()=>{
      try {
        const response = await fetch('http://localhost:5000/settings', {
          method: 'GET',
          credentials: 'include', // Important for including cookies
      });
        if(!response.ok){
          console.log('faild to fetch data..')
        }
        const fetchedData = await response.json();
        setSettings(fetchedData)
      } catch (error) {
        console.log(error)
      }
    }
    getsettings()
  }, [dep])



  return (
    <div className=''>
      {settings?.map((setting)=>(
        <div className='settings-container' key={setting.setting_id}>
          <div className='setting-item'>
        <div className="setting-title">
        <span >Sytem Name:</span>
        </div>
       <div className="setting-value">
       <span>{setting.system_name}</span>
       </div>
      </div>
        <div className='setting-item'>
        <span className='setting-title'>Sytem Email:</span>
        <span className='setting-value'>{setting.system_email}</span>
      </div>
      <div className='setting-item'>
        <span className='setting-title'>Address:</span>
        <span className='setting-value'>{setting.address}</span>
      </div>
      <div className='setting-item'>
        <span className='setting-title'>Phone:</span>
        <span className='setting-value'>{setting.phone}</span>
      </div>
      <div className='setting-item'>
        <span className='setting-title'>Currency:</span>
        <span className='setting-value'>{setting.currency}</span>
      </div>
      <div className='setting-item'>
        <span className='setting-title'>Language:</span>
        <span className='setting-value'>{setting.language}</span>
      </div>
      <div className='setting-item-btn'>
        <ManageSettings
        id={setting.setting_id}
        name={setting.system_name}
        email={setting.system_email}
        address={setting.address}
        phone={setting.phone}
        currency={setting.currency}
        language={setting.language}
        />
      </div>
        </div>
      ))}
    </div>
  )
}

export default Settings
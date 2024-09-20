import React from 'react';
import Navbar from "../NavBar/Navbar";
import Panelbar from '../Panelbar/Panelbar';
import PharmacistSidebar from '../Sidebar/PharmacistSidebar';
import { useLocation } from 'react-router-dom';


const PharmacistNavs = () => {

  const location = useLocation();
  const route = location.pathname;

  return (
    <div>
      <Navbar/>
      {route !== "/pharmacist/chat" && <Panelbar/>}
      {route !== "/pharmacist/chat" && <PharmacistSidebar/>}
    </div>
  )
}

export default PharmacistNavs;
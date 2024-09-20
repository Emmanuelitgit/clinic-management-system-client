import React from 'react';
import Navbar from "../NavBar/Navbar";
import Panelbar from '../Panelbar/Panelbar';
import RadiographerSidebar from '../Sidebar/RadiographerSidebar';
import { useLocation } from 'react-router-dom';


const RadiographerNavs = () => {

  const location = useLocation();
  const route = location.pathname;

  return (
    <div>
      <Navbar/>
      {route !== "/radiographer/chat" && <Panelbar/>}
      {route !== "/radiographer/chat" && <RadiographerSidebar/>}
    </div>
  )
}

export default RadiographerNavs;
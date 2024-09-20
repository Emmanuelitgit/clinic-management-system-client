import React from 'react';
import Navbar from "../NavBar/Navbar";
import Panelbar from '../Panelbar/Panelbar';
import NurseSidebar from '../Sidebar/NurseSidebar';
import { useLocation } from 'react-router-dom';


const NurseNavs = () => {

  const location = useLocation();
  const route = location.pathname;

  return (
    <div>
      <Navbar/>
      {route !== "/nurse/chat" && <Panelbar/>}
      {route !== "/nurse/chat" && <NurseSidebar/>}
    </div>
  )
}

export default NurseNavs;
import React from 'react';
import Navbar from "../NavBar/Navbar";
import Panelbar from '../Panelbar/Panelbar';
import LaboratoristSidebar from '../Sidebar/LaboratoristSidebar';
import { useLocation } from 'react-router-dom';


const LaboratoristNavs = () => {

  const location = useLocation();
  const route = location.pathname;

  return (
    <div>
      <Navbar/>
      {route !== "/laboratorist/chat" && <Panelbar/>}
      {route !== "/laboratorist/chat" && <LaboratoristSidebar/>}
    </div>
  )
}

export default LaboratoristNavs;
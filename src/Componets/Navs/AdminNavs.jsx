import React from 'react';
import Navbar from "../NavBar/Navbar";
import AdminSidebar from "../Sidebar/AdminSidebar"
import Panelbar from '../Panelbar/Panelbar';
import { useLocation } from 'react-router-dom';


const AdminNavs = () => {

  const location = useLocation();
  const route = location.pathname;
  return (
    <div>
      <Navbar/>
      {route !== "/admin/chat" && <Panelbar/>}
      {route !== "/admin/chat" && <AdminSidebar/>}
    </div>
  )
}

export default AdminNavs
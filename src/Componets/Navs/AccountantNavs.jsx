import React from 'react';
import Navbar from "../NavBar/Navbar";
import Panelbar from '../Panelbar/Panelbar';
import AccountantSidebar from '../Sidebar/AccountantSidebar';
import { useLocation } from 'react-router-dom';


const AccountantNavs = () => {

  const location = useLocation();
  const route = location.pathname;

  return (
    <div>
      <Navbar/>
      {route !== "/accountant/chat" && <Panelbar/>}
      {route !== "/accountant/chat" && <AccountantSidebar/>}
    </div>
  )
}

export default AccountantNavs;
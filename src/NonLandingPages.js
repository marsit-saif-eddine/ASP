import React, { useState } from "react";
import { BrowserRouter as Router ,Route} from "react-router-dom";
import SideBar from './components/content/sidebar/SideBar';
import Content from "./components/content/Content";

import "./App.css";



  
  function NonLandingPages() {
    const [sidebarIsOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
    return (
      <Router>

        <div className="App wrapper">
        <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
        <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
        
      </div>
      </Router>
      
      
    )
  }
  
  export default NonLandingPages
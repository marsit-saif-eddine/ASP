import React, { useState } from "react";
import { Navigate,BrowserRouter as Router , Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from './components/content/sidebar/SideBar';
import Content from "./components/content/Content";
import "./App.css";
import Login from "./pages/login/Login"

const accessToken = localStorage.getItem("accesstoken");
const App = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
    <Router>
      {!accessToken ?
      <Routes>
      <Route exact path="log" element={<Login />} />
      <Route  path="*"
        element={<Navigate to="/log" replace
/>} />


      </Routes>
      
      :
        <div className="App wrapper">
        <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
        <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
        
      </div>
     }
      
      
    </Router>
  );
};

export default App;
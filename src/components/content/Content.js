import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import {
  Switch,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Topbar from "./Topbar";
import Utilisateur from './../../pages/utilisateur/Utilisateur';
import Activite from '../../pages/activite/Activite';
import Login from "./../../pages/login/Login";
import Groupes from "./../../pages/Groupes/Groupes";
import Enfants from "./../../pages/Enfants/Enfants";
import AfficherEnfant from "./../../pages/Enfants/AfficherEnfant";
import CalendarPage from "./calendar/CalendarPage";
import { useLocation } from "react-router-dom";
 

const Content = ({ sidebarIsOpen,toggleSidebar }) => {
  const {pathname} = useLocation();
  const location = pathname.replace("/", " " )
  return(
    
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar name={location} toggleSidebar={toggleSidebar} />


    <Routes>
      <Route exact path="/" element={() => "Hello"} />




      <Route exact path="/Pages" element={<Utilisateur />} />
      

      <Route exact path="/faq" element={() => "FAQ"} />
      <Route exact path="/contact" element={() => "Contact"} />
      <Route exact path="/activite" element={<Activite />} />
      <Route exact path="/calendar" element={<CalendarPage />} />

      
      <Route exact path="/groupes" element={<Groupes />} />
      <Route exact path="/enfants" element={<Enfants />} />
      <Route exact path="/enfants/afficher" element={<AfficherEnfant />} />
      <Route exact path="/Page-2" element={() => "Page-2"} />
      <Route exact path="/page-1" element={() => "page-1"} />
      <Route exact path="/page-2" element={() => "page-2"} />
      <Route exact path="/page-3" element={() => "page-3"} />
      <Route exact path="/page-4" element={() => "page-4"} />
      <Route  path="*"
        element={<Navigate to="/" replace
/>} />
    </Routes>

  </Container>
  )
};

export default Content;


import React , { useState, useEffect }from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link , Navigate} from "react-router-dom";
import utilisateur from "./../../../assets/images/utilisateur.png";
import tableau from "./../../../assets/images/tableau.png";
import groupe from "./../../../assets/images/groupe.png";
import act from "./../../../assets/images/act.png";
import calendrier from "./../../../assets/images/calendrier.png";
import docum from "./../../../assets/images/docum.png";
import tel from "./../../../assets/images/tel.png";
import message from "./../../../assets/images/message.png";
import rapport from "./../../../assets/images/rapport.png";
import logo from "./../../../assets/images/logo.png";
import compte from "./../../../assets/images/compte.png";
import Axios from "axios" ;
import parametre from "./../../../assets/images/parametre.png";
import classes from './SideBar.module.css'


const accessToken = localStorage.getItem("accesstoken");
const SideBar = ({ isOpen, toggle }) => {
  const[name,setName]=useState('');
  const[role,setRole]=useState('');
  const [navigate, setNavigate] = useState(false);
  useEffect(() => {
    (async () => {
        
            const {data} = await Axios.get('auth/me', {
              headers: {
                
                Authorization : `Bearer ${accessToken}`
              }
            });

            setName(data.username);
            setRole(data.role);
       
    })();
}, []);

if (navigate  ) {
  return <Navigate to="/log"/>;
  
}
   return(
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className={classes.sidebarheader}>



      <img
        src={logo}
        alt="logo"
        height="90px"
        width="90px"
        className={classes.center}
      ></img>
    </div>

    <div>
      <div style={{ backgroundColor: "#CCEDF2" }}>
        <div className={classes.box}>
          <div className={classes.userContainer}></div>
          <div className={classes.containerUser}>
            <p className={classes.style}> 
            {name}
             </p>
             {role}
          </div>
        </div>
      </div>

      <div className={classes.sidemenu}>
        <Nav vertical className="list-unstyled pb-3">
          <div className={classes.divbox}>
            <NavItem className={classes.navelement} >
              <NavLink tag={Link} to={"/faq"}>
                <img
                  src={tableau}
                  alt="tab"
                  className={classes.icon}
                  style={{ marginRight: "10px" }}
                ></img>
                tableau de bord
              </NavLink>
            </NavItem >
            <NavItem className={classes.navelement} >
              <NavLink tag={Link} to={"/Pages"}>
                <img src={utilisateur} alt="utilisateur" className={classes.icon} style={{ marginRight: "10px" }}></img>
                Utilisateur
              </NavLink>
            </NavItem>
            <NavItem className={classes.navelement} >
              <NavLink tag={Link} to={"/groupes"}>
                <img src={groupe} alt="grp" className={classes.icon} style={{ marginRight: "10px" }}></img>
                Groupes
              </NavLink>
            </NavItem>
            <NavItem className={classes.navelement} >
              <NavLink tag={Link} to={"/enfants"}>
                <img src={utilisateur} alt="utilisateur" className={classes.icon} style={{ marginRight: "10px" }}></img>
                Enfants
              </NavLink>
            </NavItem>
            <NavItem className={classes.navelement} >
              <NavLink tag={Link} to={"/activite"}>
                <img src={act} alt="act" className={classes.icon} style={{ marginRight: "10px" }}></img>
                Activité
              </NavLink>
            </NavItem>
            <NavItem className={classes.navelement} >
              <NavLink tag={Link} to={"/calendar"}>
                <img src={calendrier} alt="cld" className={classes.icon} style={{ marginRight: "10px" }}></img>
                Calendrier
              </NavLink>
            </NavItem>
            <NavItem className={classes.navelement} >
              <NavLink tag={Link} to={"/contact"}>
                <img src={docum} alt="cld" className={classes.icon} style={{ marginRight: "10px" }}></img>
                Documents
              </NavLink>
            </NavItem>
            <NavItem className={classes.navelement} >
              <NavLink tag={Link} to={"/contact"}>
                <img src={tel} alt="tel" className={classes.icon} style={{ marginRight: "10px" }}></img>
                Contact
              </NavLink>
            </NavItem >
            <NavItem className={classes.navelement} >
              <NavLink tag={Link} to={"/contact"}>
                <img src={message} alt="msg" className={classes.icon} style={{ marginRight: "10px" }}></img>
                Messagerie
              </NavLink>
            </NavItem>

            <NavItem className={classes.navelement} >
              <NavLink tag={Link} to={"/contact"}>
                <img src={rapport} alt="rpt" className={classes.icon} style={{ marginRight: "10px" }}></img>
                Rapport
              </NavLink>
            </NavItem>
            <div className={classes.containerdiv}>
              <NavItem className={classes.navelement} >
                <NavLink tag={Link} to={"/contact"}>
                  <img src={compte} alt="compte" className={classes.icon} style={{ marginRight: "10px" }}></img>
                  compte
                </NavLink>
              </NavItem>
              <NavItem className={classes.navelement}>
                <NavLink tag={Link} to={"/contact"}>
                  <img src={parametre} alt="para" className={classes.icon} style={{ marginRight: "10px" }}></img>
                  paramétre
                </NavLink>
              </NavItem>
            </div>
          </div>
        </Nav>




      </div>
    </div>
  </div>



)};

export default SideBar;
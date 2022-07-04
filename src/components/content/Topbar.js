import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import notif1 from "./../../assets/images/bell-fill.png";
import notif2 from "./../../assets/images/Notifications.png";
import account from "./../../assets/images/compte2.png";
import mail1 from "./../../assets/images/email-fill.png";
import mail2 from "./../../assets/images/Messages.png";
import {
  Navbar,
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  NavbarBrand,
} from "reactstrap";
import { Link } from "react-router-dom";


const Topbar = ({ toggleSidebar , name }) => {
  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);
  

  return (
    <Navbar
      color="light"
      light
      className="navbar shadow-sm p-3 mb-5 bg-white rounded"
      expand="md"
    >
      <Button color="info" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <Nav className="ml-auto" navbar>
      <NavItem style={{paddingLeft:"1em"}}>
        <NavbarBrand style={{ textTransform: "capitalize" }} >{name}</NavbarBrand>
        </NavItem>
      </Nav>
      <NavbarToggler onClick={toggleTopbar} />
      <Collapse isOpen={topbarIsOpen} navbar>
        <Nav className="ml-auto" navbar>
        
        <UncontrolledDropdown style={{paddingLeft:"1em"}} nav inNavbar>
                <DropdownToggle nav caret>
                  Language
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

        <UncontrolledDropdown style={{paddingLeft:"1em"}} nav inNavbar>
                <DropdownToggle nav caret>
                  Rapports
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

        <UncontrolledDropdown style={{paddingLeft:"1em"}} nav inNavbar>
                <DropdownToggle nav caret>
                  Projects
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
          <NavItem>
            <NavLink tag={Link} style={{paddingLeft:"1em"}} to={"/page-2"}>
            <img src={mail1} alt="stylo" height="20px" width="20px" ></img> 
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} style={{paddingLeft:"1em"}} to={"/page-3"}>
            <img src={notif1} alt="notif" height="20px" width="17px" ></img>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} style={{paddingLeft:"1em"}} to={"/page-4"}>
            <img src={account} alt="notif" height="20px" width="16px" ></img>
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Topbar;

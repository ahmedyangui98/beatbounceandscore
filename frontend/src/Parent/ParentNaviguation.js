import React from 'react'
import { useNavigate } from 'react-router-dom';

import { useDispatch } from "react-redux";
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,UncontrolledTooltip,Button
 
} from "reactstrap";
import { logout } from '../redux/Action/authAction';
export default function ParentNaviguation() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  return (
    <Navbar className="bg-success" expand="lg">
              <Container>
                <div className="navbar-translate">
                  <NavbarBrand
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Success Color
                  </NavbarBrand>
                  <button
                    onClick={() => {
                      document.documentElement.classList.toggle("nav-open");
                      setCollapseOpen(!collapseOpen);
                    }}
                    aria-expanded={collapseOpen}
                    className="navbar-toggler"
                    type="button"
                  >
                    <span className="navbar-toggler-bar bar1"></span>
                    <span className="navbar-toggler-bar bar2"></span>
                    <span className="navbar-toggler-bar bar3"></span>
                  </button>
                </div>
                <Collapse isOpen={collapseOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem className="active">
                      <NavLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="now-ui-icons objects_globe"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="now-ui-icons users_circle-08"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="now-ui-icons ui-1_settings-gear-63"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                  <Button
                    className="nav-link "
                    color="info"
                    onClick={() => {
                      dispatch(logout());
                      navigate("/");
                      window.location.reload()
                    }}
                    id="upgrade-to-pro"
                    target="_blank"
                  >
                    <i className="now-ui-icons arrows-1_share-66 mr-1"></i>
                   deconnexion
                  </Button>
                  <UncontrolledTooltip target="#upgrade-to-pro">
                    Cooming soon!
                  </UncontrolledTooltip>
                </NavItem>
                  </Nav>
                </Collapse>
              </Container>
            </Navbar>
  )
}

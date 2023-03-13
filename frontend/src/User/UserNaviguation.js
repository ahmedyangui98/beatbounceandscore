import React from "react";

// reactstrap components
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
  Container,
  UncontrolledTooltip,Button
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/Action/authAction";
export default function UserNaviguation() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  return (
    <Navbar className="bg-info" expand="lg">
                <Container>
                  <NavbarBrand
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Icons
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
                  <Collapse isOpen={collapseOpen} navbar>
                    <Nav className="ml-auto" navbar>
                      <NavItem>
                        <NavLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i
                            aria-hidden={true}
                            className="now-ui-icons ui-1_send"
                          ></i>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i
                            aria-hidden={true}
                            className="now-ui-icons users_single-02"
                          ></i>
                        </NavLink>
                      </NavItem>
                      <UncontrolledDropdown nav>
                        <DropdownToggle
                          caret
                          color="default"
                          href="#pablo"
                          nav
                          onClick={(e) => e.preventDefault()}
                        >
                          <i
                            aria-hidden={true}
                            className="now-ui-icons ui-1_settings-gear-63"
                          ></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem header tag="a">
                            Dropdown header
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                          <div className="divider"></div>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Separated link
                          </DropdownItem>
                          <div className="divider"></div>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            One more separated link
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
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

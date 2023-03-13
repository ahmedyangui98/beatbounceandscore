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
  Container,UncontrolledTooltip
 ,Button
} from "reactstrap";
import { logout } from "../redux/Action/authAction";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function CoachNavigation() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  return (
    <Navbar className="bg-primary" expand="lg">
    <Container>
      <NavbarBrand
        href="#pablo"
        onClick={(e) => e.preventDefault()}
      >
        Menu
      </NavbarBrand>
      <button
        onClick={() => {
          document.documentElement.classList.toggle("nav-open");
          setCollapseOpen(!collapseOpen);
        }}
        aria-expanded={collapseOpen}
        className="navbar-toggler"
      >
        <span className="navbar-toggler-bar bar1"></span>
        <span className="navbar-toggler-bar bar2"></span>
        <span className="navbar-toggler-bar bar3"></span>
      </button>
      <Collapse isOpen={collapseOpen} navbar>
        <Nav navbar>
          <NavItem className="active">
            <NavLink
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <p>Link</p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <p>Link</p>
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav>
            <DropdownToggle
              aria-haspopup={true}
              caret
              color="default"
              href="http://example.com?ref=creativetim"
              nav
            >
              <p>Dropdown</p>
            </DropdownToggle>
            <DropdownMenu>
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

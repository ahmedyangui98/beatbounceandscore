import React from 'react'
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
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/Action/authAction';
import { useDispatch } from 'react-redux';
export default function AdminNaviguation() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  return (
    <Navbar className="bg-danger" expand="lg">
    <Container>
      <div className="navbar-translate">
        <NavbarBrand
          href="#pablo"
          onClick={(e) => e.preventDefault()}
        >
          Danger Color
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
          <NavItem>
            <NavLink
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <i className="fab fa-facebook-square"></i>
              <p>Share</p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <i className="fab fa-twitter"></i>
              <p>Tweet</p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <i className="fab fa-pinterest"></i>
              <p>Pin</p>
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

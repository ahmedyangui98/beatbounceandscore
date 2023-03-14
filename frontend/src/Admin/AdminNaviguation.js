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
  Container,
  UncontrolledTooltip,
} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/Action/authAction';
import { useDispatch } from 'react-redux';
import Logo from "../assets/img/logo.png"

export default function AdminNaviguation() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  return (
    <Navbar className="bg-danger" expand="lg">
    <Container>
      <div className="navbar-translate">

      <NavbarBrand
              
              target="_blank"
              id="navbar-brand"
            >
                <img
          variant="top" 
          src={Logo} alt="okk" style={ {height: " 70px ", width: "70px"}}
        />
            </NavbarBrand>
            <UncontrolledTooltip target="#navbar-brand">
              Designed by Coders Breed
            </UncontrolledTooltip>
        <NavbarBrand
          href="#pablo"
          onClick={(e) => e.preventDefault()}
        >
          <h5>Beat Bounce & Score</h5>
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
                      <NavLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                       
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
                          <i aria-hidden="true" class="now-ui-icons ui-1_settings-gear-63"></i>
                          <p>Settings</p>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
                            onClick={() => {
                              dispatch(logout());
                              navigate("/");
                              window.location.reload()
                            }} 
                          >
                            <i className="now-ui-icons arrows-1_share-66 mr-1"></i>
                              Logout
                          </DropdownItem>
                    
      
                        </DropdownMenu>
              </UncontrolledDropdown>

        </Nav>
      </Collapse>
    </Container>
  </Navbar>
  )
}

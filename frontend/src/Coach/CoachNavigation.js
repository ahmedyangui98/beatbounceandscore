
// Initialize Firebase

import React from "react";
import firepadRef from '../server/firebase';
import { addParticipant } from "../redux/Action/actioncreator";
import { MDBIcon } from 'mdbreact';

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
 
} from "reactstrap";

import { logout } from "../redux/Action/authAction";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/img/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faPersonChalkboard } from '@fortawesome/free-solid-svg-icons';

export default function CoachNavigation() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const cu=useSelector((state)=>state.Authreducer.user)
  const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get("id");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const handleButtonClick = () => {
    let newRoomId;
    if (roomId) {
      newRoomId = roomId;
    } else {
      newRoomId = firepadRef.push().key;
      window.history.replaceState(null, "Meet", `?id=${newRoomId}`);
    }
   
    navigate(`/room?id=${newRoomId}`);
  }
  return (
    <Navbar className="bg-primary" expand="lg">
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
             to="/profile"
              onClick={(e) => {e.preventDefault();navigate("/profile")}}
            >
              <FontAwesomeIcon icon={faHome} />
              <p>Home</p>
            </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink   onClick={() => {  navigate("/quizResults");}} >
          <MDBIcon icon="book" />



<p>Quiz Results</p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
             to="/quizManagment"
              onClick={(e) => {e.preventDefault();navigate("/quizManagment")}}
            >
              <FontAwesomeIcon icon={faPersonChalkboard} />
              <p>Quiz</p>
            </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/room"  onClick={handleButtonClick} >
          <MDBIcon icon="fa fa-video" />
                          <p>meet</p>
          </NavLink>
        </NavItem>
      

<NavItem>
          <NavLink   onClick={() => {
                              navigate("/sound");
                             
                            }}   >
          <MDBIcon icon="fa fa-music" />
                          <p>correction</p>
          </NavLink>
        </NavItem>
        <UncontrolledDropdown nav>
                        <DropdownToggle
                          aria-haspopup={true}
                          caret
                          color="default"
                          nav
                        >
                          <i aria-hidden="true" class="now-ui-icons education_paper"></i>
                          <p>Courses</p>
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem
                            onClick={() => {
                              navigate("/admincourses");
                              window.location.reload()
                            }} 
                          >
                              List of courses
                          </DropdownItem>

                          <DropdownItem
                            onClick={() => {
                              navigate("/addcourse");
                              window.location.reload()
                            }} 
                          >
                              Add course
                          </DropdownItem>

                          <DropdownItem
                            onClick={() => {
                              navigate("/addchapter");
                              window.location.reload()
                            }} 
                          >
                              Add chapter
                          </DropdownItem>
                    
      
                        </DropdownMenu>
              </UncontrolledDropdown>
                    <UncontrolledDropdown nav>
                        <DropdownToggle
                          aria-haspopup={true}
                          caret
                          color="default"
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

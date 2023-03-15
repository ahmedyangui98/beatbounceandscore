



import Logo from "../src/assets/img/logo.png"
import React from "react";
import { Link } from "react-router-dom";

import {
 
  Collapse,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

function DefaultNavigation() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
//  const user = useSelector((state) => state.Authreducer.user);
 
  const token = localStorage.getItem("token");
  console.log("token"+!token)
  

    return (
      <>
        {collapseOpen ? (
          <div
            id="bodyClick"
            onClick={() => {
              document.documentElement.classList.toggle("nav-open");
              setCollapseOpen(false);
            }}
          />
        ) : null}
        <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
          <Container>
            <div className="navbar-translate">
              <NavbarBrand
                href="https://demos.creative-tim.com/now-ui-kit-react/#/index?ref=nukr-index-navbar"
                target="_blank"
                id="navbar-brand"
                
              >
               <img
          variant="top" 
          src={Logo} alt="okk" style={ {height: " 100px ", width: "100px"}}
        />
              </NavbarBrand>
              <UncontrolledTooltip target="#navbar-brand">
                Designed by Invision. Coded by Creative Tim
              </UncontrolledTooltip>
              <button
                className="navbar-toggler navbar-toggler"
                onClick={() => {
                  document.documentElement.classList.toggle("nav-open");
                  setCollapseOpen(!collapseOpen);
                }}
                aria-expanded={collapseOpen}
                type="button"
              >
                <span className="navbar-toggler-bar top-bar"></span>
                <span className="navbar-toggler-bar middle-bar"></span>
                <span className="navbar-toggler-bar bottom-bar"></span>
              </button>
            </div>
            <Collapse
              className="justify-content-end"
              isOpen={collapseOpen}
              navbar
            >
              <Nav navbar>

              <NavItem>
                  <NavLink
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("download-section")
                        .scrollIntoView();
                    }}
                   >
                    <i className="now-ui-icons business_globe"></i>
                  <Link to ="/">Home</Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("download-section")
                        .scrollIntoView();
                    }}
                   >
                    <i className="now-ui-icons arrows-1_cloud-download-93"></i>
                  <Link to ="/register">register</Link>
                  </NavLink>
                </NavItem>
                
                <UncontrolledDropdown nav>
                  <NavLink
                    caret
                    color="default"
                    href="#pablo"
                    nav
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="now-ui-icons design_app mr-1"></i>
                    <Link to ="/login">login</Link>
                  </NavLink>
                 
              
                </UncontrolledDropdown>
              
                <NavItem>
                  <NavLink
                    href="https://twitter.com/CreativeTim?ref=creativetim"
                    target="_blank"
                    id="twitter-tooltip"
                  >
                    <i className="fab fa-twitter"></i>
                    <p className="d-lg-none d-xl-none">Twitter</p>
                  </NavLink>
                  <UncontrolledTooltip target="#twitter-tooltip">
                    Follow us on Twitter
                  </UncontrolledTooltip>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://www.facebook.com/CreativeTim?ref=creativetim"
                    target="_blank"
                    id="facebook-tooltip"
                  >
                    <i className="fab fa-facebook-square"></i>
                    <p className="d-lg-none d-xl-none">Facebook</p>
                  </NavLink>
                  <UncontrolledTooltip target="#facebook-tooltip">
                    Like us on Facebook
                  </UncontrolledTooltip>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
                    target="_blank"
                    id="instagram-tooltip"
                  >
                    <i className="fab fa-instagram"></i>
                    <p className="d-lg-none d-xl-none">Instagram</p>
                  </NavLink>
                  <UncontrolledTooltip target="#instagram-tooltip">
                    Follow us on Instagram
                  </UncontrolledTooltip>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <br></br>
      </>)
  }

export default DefaultNavigation;

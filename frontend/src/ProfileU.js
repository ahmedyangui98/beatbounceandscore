import {
    Button,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
    Modal,
    ModalBody,
  } from "reactstrap";

import {BsFillDashCircleFill} from "react-icons/bs"
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_current,deleteusers } from "./redux/Action/authAction";

const ProfileU = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_current())
  }, );
 
  const user = useSelector((state) => state.Authreducer.user);
  

  const [pills, setPills] = React.useState("2");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);



  function handleDelete() {
    dispatch(deleteusers(user._id));
  }

  const [modal1, setModal1] = React.useState(false);

  return (
    



    <div>
      <div className="wrapper">
        <div
        className="page-header clear-filter page-header-small"
        filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("./assets/img/bg5.jpg") + ")"
          }}
        ></div>
        <Container>
          <div className="photo-container">
            <img alt=""  src={`https://firebasestorage.googleapis.com/v0/b/beatbounceandscore.appspot.com/o/${user.image}?alt=media&token=894834e1-f47f-4826-b6dc-8801bcae91aa`}></img>
          </div>



          <h3 className="title">{user.firstname}  {user.lastname}</h3>
          <p className="category"><h2>{user.role}</h2></p>
          
        </Container>
      </div>
        <div className="section">
          <Container>
            <div className="button-container">
              <Button className="btn-round" color="warning" size="lg">
                Edit
              </Button>
          
            
      <Button
              className="btn-round" color="danger" size="lg"
                onClick={() => setModal1(true)}
              >
                Delete
              </Button>  

    <Col md="6">
              <h4>Modal</h4>
              <Modal
                modalClassName="modal-mini modal-info"
                toggle={() => setModal1(false)}
                isOpen={modal1}
              >
                
                <ModalBody>
                 
                  <p> <BsFillDashCircleFill color="danger"/> {user.firstname} {user.lastname}, 
                  Are you sure  to delete your account ?  <BsFillDashCircleFill color="danger"/></p>
                </ModalBody>
                <div className="modal-footer">
                  <Button className="btn-neutral" color="link" type="button" onClick={handleDelete}>
                    Confirm
                  </Button>
                  <Button
                    className="btn-neutral"
                    color="link"
                    type="button"
                    onClick={() => setModal1(false)}
                  >
                    Close
                  </Button>
                </div>
              </Modal>
            </Col>

            </div>
            <h3 className="title">About me</h3>
            <div className="description">
               <h3>About me:</h3>
               <h4>Email: {user.email}</h4>
               <h4>Gender: {user.gender}</h4>
               <h4>birthdate: {user.birthdate}</h4>
            </div>

            
            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <h4 className="title text-center">My Portfolio</h4>
                <div className="nav-align-center">
                  <Nav
                    className="nav-pills-info nav-pills-just-icons"
                    pills
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={pills === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("1");
                        }}
                      >
                        <i className="now-ui-icons design_image"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("2");
                        }}
                      >
                        <i className="now-ui-icons location_world"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "3" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("3");
                        }}
                      >
                        <i className="now-ui-icons sport_user-run"></i>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>



  );
};

export default ProfileU;
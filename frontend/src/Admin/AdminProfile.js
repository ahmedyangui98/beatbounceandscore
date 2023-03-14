import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getusers,get_current } from "../redux/Action/authAction"
import Usercard from "./Usercard";
import axios from "axios";
import { deleteusers } from "../redux/Action/authAction"
import { useRef } from "react";
import {
  FaFacebookF,
  FaFacebookMessenger,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import {Button} from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import {FormSelect} from "react-bootstrap";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { useState } from "react";
const AdminProfile = () => {const navigate = useNavigate();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState("user");
  const handleSelectChange = (e) => {
    console.log(e.target.value);
    setSelectedId(e.target.value);
  };
  useEffect(() => {
    dispatch(getusers());
    dispatch(get_current())
  }, []);
  
  const user = useSelector((state) => state.Authreducer.user);
 
 
  const editUserProfile = async (e) => {
    const config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    const data = new FormData();
    data.append("image", e.target.files[0]);
    try {
      await axios.put("/users/uploadimage", data, config);
      dispatch(get_current());
    } catch (error) {
    
    }
  };


  return (
    <div>
      <br></br>
      <div className="card_profile p-3 py-4">
        <div className="text-center">
          
          
          <h3 className="mt-2">{user?.firstname}</h3>
          <span className="mt-1 clearfix">{user?.email}</span>
          <span className="mt-1 clearfix">{user?.role}</span>
          {/* <div className="row mt-3 mb-3">
          <div className="col-md-4">
            <h5>Projects</h5>
            <span className="num">10</span>
          </div>
          <div className="col-md-4">
            <h5>Projects</h5>
            <span className="num">10</span>
          </div>
          <div className="col-md-4">
            <h5>Projects</h5>
            <span className="num">10</span>
          </div>
        </div> */}
       
        
         <Button
                variant="danger"
                onClick={() => dispatch(deleteusers(user._id),navigate("/"),console.log("clicked"))}
              >
                DELETE
              </Button>
          <hr className="line" />

          <div className="social-buttons mt-5">
            <Button className="neo-button">
              <FaFacebookF />
            </Button>
            <Button className="neo-button">
              <FaFacebookMessenger />
            </Button>
            <Button className="neo-button">
              {" "}
              <FaRegEnvelopeOpen />
            </Button>
            <Button className="neo-button">
              <FaInstagram />
            </Button>
            <Button className="neo-button">
              <FaTwitter />
            </Button>
          </div>
        
        </div>
        
      </div>
    </div>
  );
};

export default AdminProfile;
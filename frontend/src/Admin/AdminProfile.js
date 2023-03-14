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

import { FaRegEnvelopeOpen } from "react-icons/fa";
const AdminProfile = () => {const navigate = useNavigate();
  const inputRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getusers());
    dispatch(get_current())
  }, );
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
  const user = useSelector((state) => state.Authreducer.user);
  const users = useSelector((state) => state.Authreducer.users);

  return (
    <div>
      <br></br>
      <div className="card_profile p-3 py-4">
        <div className="text-center">
          <img
            src={
              user?.image
                ? `uploads/${user?.image}`
                : "https://i.pinimg.com/736x/c9/e3/e8/c9e3e810a8066b885ca4e882460785fa.jpg"
            }
            width={100}
            className="rounded-circle"
          />
          
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
            <button className="neo-button">
              <FaFacebookF />
            </button>
            <button className="neo-button">
              <FaFacebookMessenger />
            </button>
            <button className="neo-button">
              {" "}
              <FaRegEnvelopeOpen />
            </button>
            <button className="neo-button">
              <FaInstagram />
            </button>
            <button className="neo-button">
              <FaTwitter />
            </button>
          </div>
          <div className="profile mt-5">
            <button
              className="profile_button px-5"
              onClick={() => inputRef.current.click()}
            >
              upload image
            </button>
            
            <input
              type="file"
              ref={inputRef}
              hidden
              onChange={editUserProfile}
            />
          </div>
        </div>
        
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {users?.map((el) => (
          <div key={el._id}>
            <Usercard el={el} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProfile;
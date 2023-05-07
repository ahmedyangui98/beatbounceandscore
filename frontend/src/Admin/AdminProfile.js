import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getusers, get_current } from "../redux/Action/authAction";
import { deleteYourAccount } from "../redux/Action/authAction";
import { FaFacebookF, FaFacebookMessenger, FaInstagram, FaTwitter } from "react-icons/fa";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { getPicture, getProfilePicture } from "../features/dashboard/userSlice";
import DarkFooter from "../Footers/DarkFooter";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const AdminProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Select profile picture from the store
  const profilePicture = useSelector(getPicture);

  // Get user details from the store
  const user = useSelector((state) => state.Authreducer.user);

  // Fetch user details and current user on component mount
  useEffect(() => {
    dispatch(getusers());
    dispatch(get_current());
  }, []);

  // Fetch profile picture when user changes
  useEffect(() => {
    dispatch(getProfilePicture({ email: user.email, token: user.token }));
  }, [dispatch, user.email, user.token]);

  const handleDeleteAccount = () => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to delete your account?",
      buttons: [
        {
          label: "Yes",
          className: 'btn btn-success', 
          onClick: () => {
            dispatch(deleteYourAccount(user._id));
            navigate("/");
            console.log("Account deleted");
          },
        },
        {
          label: "No",
          className: 'btn btn-danger', 
          onClick: () => {
            console.log("Account deletion canceled");
          },
        },
      ],
    });
  };

  return (
    <>

        <div className="page-header clear-filter page-header-small">
        <div className="page-header-image" style={{ backgroundImage: "url(" + require("../assets/img/bg5.jpg") + ")"
                  }}></div>
          <div className="card_profile">
            <div className="text-center">
              <div className="wrapper">
                {/* Profile Picture */}
                
                <div className="photo-container">
                  <img alt="" src={profilePicture} style={{ borderRadius: '75%', overflow: 'hidden', border: "solid", }}></img>
                </div>

                {/* User Details */}
                <h3 className="mt-2">{user?.firstname}</h3>
                <span className="mt-1 clearfix">{user?.email}</span>
                <span className="mt-1 clearfix"><h1>{user?.role}</h1></span>

                {/* Delete Account Button */}
                <Button variant="danger" onClick={handleDeleteAccount}>
                  DELETE
                </Button>
                
              </div>
            </div>
          </div>
        </div>
      <DarkFooter/>


    </>
  );
};

export default AdminProfile;

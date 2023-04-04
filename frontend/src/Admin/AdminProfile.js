import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getusers,get_current } from "../redux/Action/authAction"
import { deleteYourAccount } from "../redux/Action/authAction"
import { FaFacebookF,FaFacebookMessenger,FaInstagram,FaTwitter} from "react-icons/fa";
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { getPicture, getProfilePicture } from "../features/dashboard/userSlice";
import DarkFooter from "../Footers/DarkFooter";
const AdminProfile = () => {
  
  
  const navigate = useNavigate();
  //const inputRef = useRef();
  const dispatch = useDispatch();
  const profilePicture = useSelector(getPicture);

  /*const [selectedId, setSelectedId] = useState("user");
  const handleSelectChange = (e) => {
    console.log(e.target.value);
    setSelectedId(e.target.value);
  }; */

  useEffect(() => {
    dispatch(getusers());
    dispatch(get_current())
  }, /*[]*/);
  
  const user = useSelector((state) => state.Authreducer.user);
 


  useEffect(() => {
    dispatch(getProfilePicture({email:user.email,token:user.token}))
},[dispatch, user.email, user.token])

  return (
    <>
    <div>
      <br></br>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue">
      <div className="card_profile p-3 py-4">
        
        <div className="text-center">
        <div className="wrapper">
       
        <div className="photo-container">
            <img alt=""  src={profilePicture}></img>
          </div>
       
          
          <h3 className="mt-2">{user?.firstname}</h3>
          <span className="mt-1 clearfix">{user?.email}</span>
          <span className="mt-1 clearfix"><h1>{user?.role}</h1></span>
        
         <Button
                variant="danger"
                onClick={() => dispatch(deleteYourAccount(user._id),navigate("/"),console.log("clicked"))}
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
      </div>
    </div>
    <DarkFooter/>
    </>
    

  );
};

export default AdminProfile;
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getusers,get_current } from "../redux/Action/authAction"
import Usercard from "./Usercard";
import axios from "axios";
import { deleteusers } from "../redux/Action/authAction"
import { useRef } from "react";

import { Input } from "reactstrap";

import {FormSelect} from "react-bootstrap";

import { useState } from "react";
import DarkFooter from "../Footers/DarkFooter";
const UserManagement = () => {


  const inputRef = useRef();
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState("user");
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };


 


  const handleSelectChange = (e) => {
    //console.log(e.target.value);
    setSelectedId(e.target.value);
  };
  useEffect(() => {
    dispatch(getusers());
    dispatch(get_current())
  }, []);
 
  const user = useSelector((state) => state.Authreducer.user);
  const users = useSelector((state) => state.Authreducer.users);
  console.log("user: "+user.email)
  //console.log(users);
  const filtredusers = users.filter((el) => {
    //if no input the return the original
    if (searchInput === '') {
        return el;
    }
    //return the item which contains the user input
    else {
        return el.firstname.includes(searchInput)
    }
})
    if(!searchInput){return (
    <>
    <div>
      <br></br>
      
      <Input type="search" name="name" id="nameInput" placeholder="Enter your name" className="my-2" style={{ color: 'red',width:"375px" ,marginLeft:"480px"}} onChange={handleChange}/>
      
      <FormSelect onChange={handleSelectChange} name="ids" id="ids" className="customselect"style={{width:"375px",display:"flex",justifyContent:"center",marginLeft:"480px"}} >
     
    
            
            
             <option value="user">User</option>
             
             <option value="admin">Admin</option>

             <option value="parent">Parent</option>
             <option value="coach">Coach</option>
     </FormSelect>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {users.map((el) => el.role===String(selectedId) && (
            <div key={el._id}>
              <Usercard el={el}  />
            </div>
          ))} 
      </div>
    </div>
    <DarkFooter/>
    </>
  )}
  else  { return (
    <>
    <div>
      <br></br>
      
      <Input type="search" name="name" id="nameInput" placeholder="Enter your name" className="my-2" style={{ color: 'red',width:"375px",marginLeft:"480px" }} onChange={handleChange}/>
      
      <FormSelect onChange={handleSelectChange} name="ids" id="ids" className="customselect"style={{width:"375px",display:"flex",justifyContent:"center",marginLeft:"480px"}} >
     
    
            
            
             <option value="user">User</option>
             
             <option value="admin">Admin</option>

             <option value="parent">Parent</option>
             <option value="coach">Coach</option>
     </FormSelect>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {filtredusers.map((el) => el.role===String(selectedId) && (
            <div key={el._id}>
              <Usercard el={el}  />
            </div>
          ))} 
      </div>
    </div>
    <DarkFooter/>
    </>
  )}
};

export default UserManagement;
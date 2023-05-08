import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getusers, get_current } from "../redux/Action/authAction";
import Usercard from "./Usercard";
import axios from "axios";
import { deleteusers } from "../redux/Action/authAction";
import { useRef } from "react";

import { Input } from "reactstrap";

import { FormSelect } from "react-bootstrap";

import { useState } from "react";
import DarkFooter from "../Footers/DarkFooter";

const UserManagement = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState("user");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(4);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedId(e.target.value);
  };

  useEffect(() => {
    dispatch(getusers());
    dispatch(get_current());
  }, []);

  const user = useSelector((state) => state.Authreducer.user);
  const users = useSelector((state) => state.Authreducer.users);

  const filtredusers = users?.filter((el) => {
    if (searchInput === "") {
      return el;
    } else {
      return el.firstname.includes(searchInput);
    }
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filtredusers.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filtredusers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!searchInput) {
    return (
      <>
        <div>
          <br></br>

          <Input
            type="search"
            name="name"
            id="nameInput"
            placeholder="Enter your name"
            className="my-2"
            style={{ color: "red", width: "375px", marginLeft: "480px" }}
            onChange={handleChange}
          />

          <FormSelect
            onChange={handleSelectChange}
            name="ids"
            id="ids"
            className="customselect"
            style={{
              width: "375px",
              display: "flex",
              justifyContent: "center",
              marginLeft: "480px",
            }}
          >
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
            {currentUsers.map(
              (el) =>
                el.role === String(selectedId) && (
                  <div key={el._id}>
                    <Usercard el={el} />
                  </div>
                )
            )}
          </div>
          <div className="start">
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <button onClick={() => paginate(number)} className="page-link">
                  {number}
                </button>
              </li>
            ))}
          </ul>
          </div>
          <br/>
          <br/>

    </div>
    <DarkFooter/>
    </>
  )}
};

export default UserManagement;
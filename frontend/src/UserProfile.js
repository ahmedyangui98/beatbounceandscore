import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getusers,get_current } from "./redux/Action/authAction";
import Usercard from "./Usercard";

const UserProfile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getusers());
    dispatch(get_current())
  }, []);
 
  const user = useSelector((state) => state.Authreducer.user);
  const users = useSelector((state) => state.Authreducer.users);
  console.log("user"+user.email)
  console.log(users);
  return (
    <div>
      <br></br>
<<<<<<< HEAD
      <Card style={{
            width: "20rem",
            margin: " 4rem auto ",
            display: "flex",
          }}>
=======
      <Card style={{ width: "18rem", margin: "auto", marginTop: "100px" ,float:"center"}}>
>>>>>>> 0fcb7300e3c1db3b909abb57aab29a0f7277badf
    
          
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
<<<<<<< HEAD
          <Card.Text style={{ color: "black" }}>Hello {user?.email}</Card.Text>
=======
          <Card.Text style={{ color: "black" }}>{user?.name}</Card.Text>
>>>>>>> 0fcb7300e3c1db3b909abb57aab29a0f7277badf
        </Card.Body>
      </Card>
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

export default UserProfile;

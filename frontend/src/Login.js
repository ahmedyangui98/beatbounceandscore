import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login,updateusers } from "./redux/Action/authAction";
import Alerterrors from "./Alerterrors";


import { useSelector } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const [firstFocus, setFirstFocus] = useState(false); 
  const [lastFocus, setLastFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const[isActivated,setIsActivated]=useState(false)
  const user = useSelector((state) => state.Authreducer.user);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
const[role,setRole]=useState(user.role)
  const handleClick = (e) => {

    e.preventDefault();
    dispatch(login({ email, password }, navigate));
    setIsActivated(true)
   updateusers(user._id, { email,password,role,firstname,isActivated,lastname})
  
 
  }

  
  return (<>
    <div
      className="page-header-image"
      style={{
        backgroundImage: "url(" + require("./assets/img/bg4.jpg") + ")",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        minHeight: "1000px"
      }}
    >
      <div className="content">
      <Container>
        <Col className="ml-auto mr-auto" md="4">
          <Card className="card-login card-plain" >
            <Form action="" className="form" method="">
            <CardHeader className="text-center">
                    <div className="logo-container">
                      <img
                        alt="..."
                        src={require("./assets/img/now-logo.png")}
                      ></img>
                    </div>
                  </CardHeader>
              <CardBody>
                
            
                <InputGroup
                  className={
                    "no-border" + (emailFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons ui-1_email-85"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email..."
                    type="email"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}               ></Input>
                </InputGroup>
                <InputGroup
                  className={
                    "no-border" + (lastFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons text_caps-small"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password..."
                    type="password"
                    onFocus={() => setLastFocus(true)}
                    onBlur={() => setLastFocus(false)
                    }
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  ></Input>
                </InputGroup>
              </CardBody>
              <CardFooter className="text-center">
                <Button
                  className="btn-neutral btn-round"
                  color="info"
                  href="#pablo"
                  onClick={handleClick}
                  size="lg"
                >
                 Login
                </Button>
              </CardFooter>
            </Form>
          </Card>
        <div className="col text-center">
          <Button
            className="btn-round btn-white"
            color="default"
            to="/login-page"
            outline
            size="lg"
            tag={Link}
          >
            View Login Page
          </Button>
        </div>
        </Col>
      </Container>
      <Alerterrors/>
    </div>  
      <Alerterrors/>
    </div>
  </>
  );
};

export default Login;

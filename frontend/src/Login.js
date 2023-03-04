import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./redux/Action/authAction";
import Alerterrors from "./Alerterrors";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }, navigate));
  };
  return (<>
    <div
      className="section section-signup"
      style={{
        backgroundImage: "url(" + require("./assets/img/bg11.jpg") + ")",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        minHeight: "700px"
      }}
    >
      <Container>
        <Row>
          <Card className="card-signup" data-background-color="blue">
            <Form action="" className="form" method="">
              <CardHeader className="text-center">
                <CardTitle className="title-up" tag="h3">
                  Sign Up
                </CardTitle>
                <div className="social-line">
                  <Button
                    className="btn-neutral btn-icon btn-round"
                    color="facebook"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fab fa-facebook-square"></i>
                  </Button>
                  <Button
                    className="btn-neutral btn-icon btn-round"
                    color="twitter"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="lg"
                  >
                    <i className="fab fa-twitter"></i>
                  </Button>
                  <Button
                    className="btn-neutral btn-icon btn-round"
                    color="google"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fab fa-google-plus"></i>
                  </Button>
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
        </Row>
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
      </Container>
      <Alerterrors/>
    </div>
  </>
  );
};

export default Login;

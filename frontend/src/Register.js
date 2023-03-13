
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "./redux/Action/authAction";
// reactstrap components
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
  Row,
} from "reactstrap";
import Alerterrors from "./Alerterrors";
import { useSelector } from "react-redux";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const [image, setImage] = useState("");
  const [firstnameFocus, setFirstnameFocus] = useState(false);
  const [lastnameFocus, setLastnameFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [birthdateFocus, setBirthdateFocus] = useState(false);
  const user = useSelector((state) => state.Authreducer.user);
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(register({ firstname,lastname, email, password,image }, navigate));
   
  };

  return(    <>
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
                    "no-border" + (firstnameFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons users_circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="First Name..."
                    type="text"
                    onFocus={() => setFirstnameFocus(true)}
                    onBlur={() => setFirstnameFocus(false)}
                    onChange={(e) => setFirstname(e.target.value)}
                    value={firstname}
                  ></Input>
                </InputGroup>
                <InputGroup
                  className={
                    "no-border" + (lastnameFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons users_circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Last Name..."
                    type="text"
                    onFocus={() => setLastnameFocus(true)}
                    onBlur={() => setLastnameFocus(false)}
                    onChange={(e) => setLastname(e.target.value)}
                    value={lastname}
                  ></Input>
                </InputGroup>

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
                    placeholder="img"
                    type="file" name="img"
                    onChange={(e) => setImage({...image,image:e.target.files[0].name})}
                    value={image}
                    onFocus={() => setLastFocus(true)}
                    onBlur={() => setLastFocus(false)
                    }
                   
                 
                  ></Input>
                </InputGroup>

                <InputGroup
                  className={
                    "no-border" + (birthdateFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons users_circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder=""
                    type="date"
                    onFocus={() => setBirthdateFocus(true)}
                    onBlur={() => setBirthdateFocus(false)}
                    onChange={(e) => setBirthdate(e.target.value)}
                    value={birthdate}
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
                 Register
                </Button>
              </CardFooter>
            </Form>
          </Card> 
        </Row>
      </Container>
      <Alerterrors/>
    </div>
  </>)
};

export default Register;


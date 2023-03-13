
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "./redux/Action/authAction";
import Datetime from "react-datetime";
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
  Label,
  Col,

} from "reactstrap";
import Alerterrors from "./Alerterrors";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "./firebase";


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [imagee, setImagee] = useState("");


  const [firstnameFocus, setFirstnameFocus] = useState(false);
  const [lastnameFocus, setLastnameFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [birthdateFocus, ] = useState(false);
  const [imageFocus, ] = useState(false);


  const handleClick = (e) => {
    e.preventDefault();
    dispatch(register({ firstname,lastname, email, password,image,birthdate,gender }, navigate));
    console.log(image.name);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const uploadFile = () => {
    if (imagee == null) return;
    const imageRef = ref(storage, `${imagee.name}`);
    uploadBytes(imageRef, imagee).then((snapshot) => {
      getDownloadURL(snapshot.ref);
    });
    alert("Uploaded successfully");
   // image.setImage(image.name);
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
                
              </CardHeader>
              <CardBody>
                <InputGroup
                  className={
                    "no-border" + (firstnameFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons text_caps-small"></i>
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
                      <i className="now-ui-icons text_caps-small"></i>
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
                    "no-border" + (imageFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    
                    
                   
                  </InputGroupAddon>
                 
                
      <Input
        type="file"
        onChange={(event) => {
          setImagee(event.target.files[0]);
          setImage(event.target.files[0].name);
        }}
      />
      <Button className="btn-round" onClick={uploadFile}>Upload </Button>


                </InputGroup>

                <InputGroup
                  className={
                    "no-border" + (birthdateFocus ? " input-group-focus" : "")
                  }
                >
                  
                  <div className="datepicker-container">
                  <Datetime
                    placeholder=""
                    type="date"
          

                    selected={birthdate} onChange={birthdate => setBirthdate(birthdate)}
                    timeFormat={false}
                    inputProps={{ placeholder: "Birthdate Here" }}
                  />
                  </div>
                </InputGroup>
                
              <Col>
                <InputGroup check className="input-group-focus">
                <Label>
                  <Input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={handleGenderChange}
                  />
                  Male
                </Label>
              </InputGroup>
              <InputGroup check className="input-group-focus">
              <Label>
                  <Input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={handleGenderChange}
                  />
                  Female
                </Label>
              </InputGroup>
              </Col>

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


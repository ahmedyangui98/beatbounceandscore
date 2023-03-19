import React, { useState } from 'react'
import { Container,Card,Row,Form,Label,Input,Button } from "reactstrap";
import DarkFooter from './Footers/DarkFooter';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendPasswordLink } from "./redux/Action/authAction";



const PasswordReset = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");


    const setVal = (e) => {
        setEmail(e.target.value)
    }

    const sendLink =  (e) => {
        e.preventDefault();

        dispatch(sendPasswordLink({email}, navigate));

        
    }

    return (
    <>

    <div
      className="section section-signup"
      style={{
        backgroundImage: "url(" + require("./assets/img/bg3.jpg") + ")",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        minHeight: "700px"
      }}
    >
      <Container>
        <Row>
          <Card className="card-signup" data-background-color="blue" >
          <div className="form_data">
                    <div >
                        <h2>Enter Your Email</h2>
                    </div>
                    <Form>
                        <div className="form_input">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" value={email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>

                        <Button className="btn-neutral btn-round"
                  color="info"
                  size="lg" onClick={sendLink}>Send</Button>
                    </Form>
                </div>

          </Card> 
        </Row>
      </Container>

    </div>
    <DarkFooter />

    </>
    
    )
}

export default PasswordReset
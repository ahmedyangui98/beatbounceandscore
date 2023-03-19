import React, {  useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Button, Input, Label ,Form,Row,Container,Card} from 'reactstrap';
import { ChangePasswordWithIdandToken } from './redux/Action/authAction';

const ForgotPassword = () => {

    const { id, token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
  /*  useEffect(() => {
      dispatch(ForgotPass(id,token,navigate))
    }, ); */


    const setval = (e) => {
        setPassword(e.target.value)
    }

    const sendpassword = async (e) => {
        e.preventDefault();

        dispatch(ChangePasswordWithIdandToken(id,token,{password},navigate))

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
                        <h2>Enter Your NEW Password</h2>
                    </div>
                    <Form>
                                    <div className="form_input">
                                        <Label htmlFor="password">New password</Label>
                                        <Input type="password" value={password} onChange={setval} name="password" id="password" placeholder='Enter Your new password' />
                                    </div>

                                    <Button className="btn-neutral btn-round"
                  color="info"
                  size="lg" onClick={sendpassword}>Send</Button>
                
                    </Form>
                </div>

          </Card> 
        </Row>
      </Container>

    </div>
        </>
        
    )
}

export default ForgotPassword
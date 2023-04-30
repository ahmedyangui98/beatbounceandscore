import { useDispatch, useSelector } from "react-redux"
import {  useNavigate } from "react-router-dom";
import { getActiveTab, getAuthError, getRequest, getScreenshot, loginUser, setAuthError, setLoginEmail, setLoginPassword } from "../../features/auth/authSlice"
import { getFaces } from "../../features/auth/facenetSlice";
import { PictureControls } from "./PictureControls"


export const Login = ({enableInput}) => {

    const isFirefox = typeof InstallTrigger !== 'undefined';

    const activeTab = useSelector(getActiveTab)
    const dispatch = useDispatch()
    const request = useSelector(getRequest)
    const email = request.login.email
    const password = request.login.password
    const screenshot = useSelector(getScreenshot)
    const error = useSelector(getAuthError)
    const faces = useSelector(getFaces)

    const navigate = useNavigate();
    //const user = useSelector((state) => state.Authreducer.user);

    const manageForm = (e) => {
        e.preventDefault()
        dispatch(setAuthError({login:{serverErr:null}}))
        validateInputs() 
        
            const user = {email, password, screenshot, descriptor: Object.values(faces[0].descriptor)}
            dispatch(loginUser(user)).then(payload => {
                if (payload.meta.requestStatus === 'fulfilled') {
                    navigate("/users");
                }
            }) 
            //dispatch(login({ email, password }, navigate));
           
           
        
    }

    const validateInputs = () => {
        // if(email == null){
        //     dispatch(setAuthError({login:{email: 'The EMAIL field is required.'}}))
        // } else if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        //     dispatch(setAuthError({login:{email: 'The EMAIL field is not in the standard form.'}}))
        // } else {
        //     dispatch(setAuthError({login:{email:null}}))
        // }
        // if(password == null){
        //     dispatch(setAuthError({login:{password: 'The PASSWORD field is required.'}}))
        // } else {
        //     dispatch(setAuthError({login:{password:null}}))
        // }
        if(screenshot == null){
            dispatch(setAuthError({login:{screenshot: 'A face IMAGE is required.'}}))
        } else {
            dispatch(setAuthError({login:{screenshot:null}}))
        }
    }

    return(
        <form className={'login100-form ' + (activeTab === 'login' ? 'active' : '')}>
                            

            <PictureControls />

            <div className="container-login100-form-btn">
                <button
                    type="button"
                    className="my-submit-btn zoom-in"
                    onClick={(e) => manageForm(e)}
                >Login</button>
            </div>

        </form>
    )
}
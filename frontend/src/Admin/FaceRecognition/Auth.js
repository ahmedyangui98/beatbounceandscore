import DarkFooter from '../../Footers/DarkFooter'
import '.././../assets/css/Auth.css'
import { Camera } from './Camera'
import { FormTabs } from './FormTabs'

 const Auth = () => {

    return (
        <>
        <div
        className="section section-signup"
        style={{
          backgroundImage: "url(" + require("../../assets/img/sigupbackground.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          minHeight: "700px"
        }}
      >
        <div className="container wrap-login100">
            <div className="row">
                <div className="col-lg-6 col-md-12 l-side">
                    <Camera />                        
                </div>
                <div className="col-lg-6 col-md-12 r-side">
                    <FormTabs />
                </div>
            </div>
        </div>

        </div>

        <DarkFooter/>
        </>
    )
}


export default Auth;
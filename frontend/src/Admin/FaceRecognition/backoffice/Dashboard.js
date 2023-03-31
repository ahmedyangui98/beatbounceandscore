import "../../../assets/css/Dashboard.css"
import { Menu } from "./Menu"

export const Dashboard = () => {

    return (
        <div className="container dashboard">
            <div className="row">
                <div className="col-lg-3 my-box left-side">
                    <Menu />
                </div>
                
            </div>        
        </div>
    )
}

import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import './App.css';
function LogOut(){


    const navigate = useNavigate();
    const LogOutUser = () =>{
        alert("You are logged out");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("admin");
        window.localStorage.removeItem("group");
        window.localStorage.removeItem("emailusermgt");
        navigate('../login')
    }


    return ( <>
    <div className='.Logout'> <Button onClick={LogOutUser}>Logout</Button> </div>
    </>
    );

}
export default LogOut;
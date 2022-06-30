import {useState} from 'react';
import Axios from 'axios';
import './LoginForm.css';

import { useNavigate } from "react-router-dom";

function LoginForm(){
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const navigate = useNavigate();
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("admin");
    window.localStorage.removeItem("emailusermgt"); 
    window.localStorage.removeItem("usernameusermgt");
    window.localStorage.removeItem("userActiveStatus");
    window.localStorage.removeItem("userAdmin")

    const handleUserChange = (event) =>{
        setUsername(event.target.value);
        
    }

    const handlePassChange = (event) =>{
        setPassword( event.target.value);
        
    }

    const handSubmit=async(e)=>{
        e.preventDefault();
    //    alert("You have submitted "+username+" "+password);
        try {

            const res = await Axios.post('http://localhost:8080/login', 
            {username:""+username+ "",password:""+password+""});
            console.log("login function executed");
            const validation = res.data;
            console.log("login validation result : active: "+validation.active+" password:"+validation.repass);
            
            if (validation.active=='N'){
                alert("Your account "+username+ " is not active - please check with your admin")
            } else

            if (validation.active=='Y'){
                // get email 
               /////////////////////////////

               console.log("Query email for login user");
               // alert("You have submitted "+username+" "+password);
               
        
                    const res = await Axios.post('http://localhost:8080/email', 
                    {username:""+username+""});
                    
                    const email = res.data.email;
                    console.log("email for user "+email);
        
               /////////////////////////////////
               console.log("Query admin for login user");
               // alert("You have submitted "+username+" "+password);
               
        
                    const resadmin = await Axios.post('http://localhost:8080/admin', 
                    {username:""+username+""});
                    
                    const admin = resadmin.data.admin;
                    console.log("admin for user "+admin);
                    
               /////////////////////////////////
                window.localStorage.setItem("email", email);
                window.localStorage.setItem("username", username);
                window.localStorage.setItem("admin", admin);

                console.log("login-saved to local storage");

                console.log("user "+ username +" validation :"+validation.repass)

               // if (validation.repass==='true'){
                    //alert("Validation for password "+validation.repass)
              //  }
                if (admin==='Y' && validation.active==='Y' && validation.repass==='true'){
                    console.log("login - admin");
                    navigate('../main');
                } else if (validation.active==='Y' && validation.repass==='true'){
                    console.log("login - non admin");
                    navigate('../mainuser');
                } else if (validation.repass=='false'){
                    alert("You have entered an invalid username or password");
                }
            } 
            
            else {
                alert("You have entered an invalid username or password");
            }
            

    } catch (e){
            console.error("Login function - there was an error "+e.message);
        }
        

    }

    


    return (
        <div className='Login'>
        <form onSubmit={(e)=>{handSubmit(e)}}>
            <h1>Kanban App</h1>
           
            <hr></hr>
            <label>User Name: </label>
            <input type="text" value={username} required onChange={(e)=>{handleUserChange(e)}}/>
            <br/>
           
            <label>Password: </label>
            <input type="password" value={password} required onChange={(e)=>{handlePassChange(e)}}/>
            <br/>
            <input type="submit" value="Login"/>
        </form>
        </div>
    )
}


export default LoginForm;
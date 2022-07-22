import {useEffect,useState} from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import './LoginForm.css';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';


function UserNonAdminScreen(){
    
    const [ password, setPassword] = useState('');
    const [ email, setEmail] = useState('');
    const [ currentEmail, setCurrentEmail] = useState('');
    const [selectedusertoedit, setSelectedUserToEdit] = useState('');

    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    
    var profileEmail = window.localStorage.getItem("email");
    var admin = window.localStorage.getItem("admin");
  
   
    console.log(logged);

    //get user profile
    
    // 1.2 create function like loginForm for rest call
    // 2. display user name
    // 
   
    const LogOutUser = () =>{
        alert("You are logged out");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("admin");
        navigate('../login')
    }

    useEffect(() => {


        if (logged==null){
         navigate('../login')   
        }
        setCurrentEmail(profileEmail)
        setSelectedUserToEdit(logged)

    },[])

    
  
    
    const handleEmailChange = (event) =>{
        setEmail( event.target.value);
        
    }


    const handlePassChange = (event) =>{
        setPassword( event.target.value);
        
    }

    const goMain = () =>{
        
        
        if (admin === 0) {
          
            navigate('../login')
        } 
        else {
            navigate('../mainuser')
        }
    }

    const handUpdatePassword=async(e)=>{

        alert("You have submitted password change");
        var validPass = checkPassWord(password);
        

        validPass = checkPassWord(password);
          console.log("handlesubmit - checkPassWord");
          if (validPass.length>0) {
  
              alert(validPass);
              return 1;
          } else {
      
       
        try {
            await Axios.post('http://localhost:8080/updatepass', {username:""+selectedusertoedit+ "",password:""+password+""})
            console.log("UserProfileScreen password changed");
        alert("You have changed your password successfully"); 
    } catch (e){
            console.error("UserProfileScreen password change error "+e.error);
        }
    }

}

const checkPassWord=(password)=>{
      
       
    var regexNumber = /\d/;
    var regSpecial =  /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var passwordMsg = ''
    console.log("UserScreen - checkPassword"+password);

    var passwordLength = password.length;
    // check length of password is 8-10
    console.log("UserScreen - passwordLength : "+passwordLength);
   
    console.log("passwordLength "+8<passwordLength)


    if ( parseInt(password.length) && 10<parseInt(password.length) ){
        console.log("UserScreen - password less than 8");
        passwordMsg = passwordMsg+"Password must be between 8-10 character";
    
    }

    
    // test for special characters
    var isSpecialChar = regSpecial.test(password);
    if (!isSpecialChar){
        passwordMsg = passwordMsg+"\nPassword need to have special characters";
    }
    
    
    var isNumChar = regexNumber.test(password);
    if (!isNumChar){
        passwordMsg = passwordMsg+"\nPassword need to have numeric character";
    }
    console.log(passwordMsg);
    return passwordMsg;
};

    const handUpdateEmail=async(e)=>{
        
        e.preventDefault();
        alert("You have submitted email change");
        try {
            const res = await Axios.post('http://localhost:8080/updateemail', {username:""+selectedusertoedit+ "",email:""+email+""})
            var updateRes = res.data;
            console.log("Response from backend -updateemail "+updateRes);
            if (updateRes.length>0){
                alert("Email is already being used - "+email+"\nPlease use a different email.");
            } else {
                alert("You have changed your email successfully");
                
            }
            
         
    } catch (e){
            console.error("UserProfileScreen email there was an error"+e.error);
        }
    }

    return (
        <div>
        <header className='Header'> 
        <h1>Welcome {logged} {profileEmail}</h1>


        <h2> 
        
        <Button onClick={goMain}>Previous Screen</Button>
        <LogOutUser/>
        </h2>
         
        </header>
        <div>
        <h1>User Management</h1>
          
        </div>
        <div >
      
        <form onSubmit={(e)=>{handUpdateEmail(e)}}>
           
            <label>Current Email:{currentEmail} </label><br/>
            <label>New Email:</label>
            <input type="email" value={email} required onChange={(e)=>{handleEmailChange(e)}}/>
            <br/>
            <input type="submit" value="Update Email"/>
            
        </form>
        </div>
        <div >
        <form onSubmit={(e)=>{handUpdatePassword(e)}}>
           
            
            <label>New Password:</label>
            <input type="password" value={password} required onChange={(e)=>{handlePassChange(e)}}/>
            <br/>
            <input type="submit" value="Update Password"/>
            
        </form>
        </div>
        </div>
    )
}

export default  UserNonAdminScreen;
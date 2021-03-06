
import {useEffect,useState} from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

import './LoginForm.css';

function UserScreen(){

    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const [ isAdmin, setisAdmin] = useState(false);
    const [ email, setEmail] = useState('');
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    console.log(logged);
   
    const LogOutUser = () =>{
        alert("You are logged out");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("email");
        navigate('../login')
    }

    useEffect(() => {
        if (logged==null){
         navigate('../login')   
        }
    },[])

    const handlePassChange = (event) =>{

       // var validpass = checkPassWord(event.target.value);
       
        setPassword( event.target.value);
        
        
    }
    const handleUserChange = (event) =>{
        setUsername(event.target.value);
        
    }

    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
        
    }

    const checkHandler =()=>{
        console.log("Checkbox clicked");
        if (isAdmin){
            setisAdmin(false)
        } else {
            setisAdmin(true)
        }
    
    }

    const handSubmit=async(e)=>{
        e.preventDefault();
         var validPass = checkPassWord(password);
        
      validPass = checkPassWord(password);
        console.log("handlesubmit - checkPassWord");
        if (validPass.length>0) {

            alert(validPass);
            return 1;
        }
       
        try {
            alert("New user creation \n You have submitted "+username+" "+password+" "+email);
            const res = await Axios.post('http://localhost:8080/newuser', 
            {username:""+username+ "",password:""+password+"", email:""+email+"", admin:""+isAdmin+", active:Y"});
            console.log("UserScreen - new user creation started ");
            const duplicateResult = res.data;
            console.log("UserScreen - checking for duplicates "+duplicateResult);
            
            var showErr = false;
            var errMsg = "";
            console.log("UserScreen - "+duplicateResult.indexOf("username"));
            console.log("UserScreen - "+duplicateResult.indexOf("email"));
            if (duplicateResult.indexOf("username")>0){
                showErr=true;
                errMsg = "Username " +username+ " already taken up - please use another\n"
            }
            if (duplicateResult.indexOf("email")>0){
                showErr=true;
                errMsg = "Email " +email+ " already taken up - please use another\n"
            }

            if (showErr){
                alert (errMsg);
            }

    } catch (e){
            console.error("there was an error");
        }
    }
  
    const goMain = () =>{
        
        navigate('../main')
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
    return (

    <div>
        <header className='Header'> <h1>Welcome {logged} </h1>
        <button onClick={LogOutUser}>Logout {logged}</button>
        <button onClick={goMain}>Main Menu</button> </header>
    <div className='Login'>
    <h1>New User Creation</h1>
    <form onSubmit={(e)=>{handSubmit(e)}}>
         
            <label>Name: </label>
            <input type="text" value={username} required onChange={(e)=>{handleUserChange(e)}}/>
            <br/>
            <br/>
            <label>Password: </label>
            
            <input type="password" value={password} required onChange={(e)=>{handlePassChange(e)}}/>
            <br/>
            <label>Need to be between 8 to 10 characters have numbers and special characters</label>
            <br />
            <br />
            <label>Email: </label>
            <input type="email" value={email} required onChange={(e)=>{handleEmailChange(e)}}/>
            <br/>
            <br/>
            <label htmlFor="checkbox">Check if this user is an admin user</label>
            <input type="checkbox" 
            id="checkbox" 
            
            checked={isAdmin} 
            onChange ={checkHandler}
            />
            <br/>
            <input type="submit" value="Create User"/>
        </form>
    </div>
    </div>
);
 }

 export default UserScreen;
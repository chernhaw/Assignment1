
import {useEffect,useState} from 'react';
import { ReactDOM } from 'react-dom/client';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import {commonHeader} from "./common/CommonHeader";
import './LoginForm.css';

function UserScreen(){

    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const [ email, setEmail] = useState('');
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    console.log(logged);
   
    const LogOutUser = () =>{
        alert("You are logged out");
        window.localStorage.removeItem("username");
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

    const handSubmit=async(e)=>{
        e.preventDefault();
        var validPass = checkPassWord(password);
        console.log("handlesubmit - checkPassWord");
        if (validPass.length>0) {

            alert(validPass);
            return 1;
        }
       
        try {
            alert("New user creation \n You have submitted "+username+" "+password+" "+email);
            const res = await Axios.post('http://localhost:8080/newuser', 
            {username:""+username+ "",password:""+password+"", email:""+email+""});
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
        var regex = /^[A-Za-z0-9 ]+$/;
        var passwordMsg = ''
        console.log("UserScreen - checkPassword"+password);

        var passwordLength = password.length;
        // check length of password is 8-10
        if (8<passwordLength){
            passwordMsg = passwordMsg+"Password must be between 8-10 character";
        
        }

        if (11>passwordLength){
            passwordMsg = passwordMsg+"Password must be between 8-10 character";
        
        }

        // test for special characters
        var isSpecialChar = regex.test(password);
        if (isSpecialChar){
            passwordMsg = passwordMsg+"\nPassword need to have special characters";
        }
        const regexNumber = /\d/;
        
        var isNumChar = regexNumber.test(password);
        if (isNumChar){
            passwordMsg = password+"\nPassword need to have numeric characters";
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
            <input type="email" value={email} equired onChange={(e)=>{handleEmailChange(e)}}/>
            <br/>
            <input type="submit" value="Add"/>
        </form>
    </div>
    </div>
);
 }

 export default UserScreen;
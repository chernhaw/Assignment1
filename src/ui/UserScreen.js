
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
        
        alert("New user creation \n You have submitted "+username+" "+password+" "+email);
        try {
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
            
            // 
            

    } catch (e){
            console.error("there was an error");
        }
        

    }
  
    return (
    <div>
        <header className='Header'> <h1>Welcome {logged} <button onClick={LogOutUser}>Logout {logged}</button></h1> </header>
    <div className='Login'>
    <h1>New User Creation</h1>
    <form onSubmit={(e)=>{handSubmit(e)}}>
         
            <label>Name: </label>
            <input type="text" value={username} required onChange={(e)=>{handleUserChange(e)}}/>
            <br/>
           
            <label>Password: </label>
            <input type="password" value={password} required onChange={(e)=>{handlePassChange(e)}}/>
            <br/>
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
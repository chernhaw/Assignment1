import {useEffect,useState} from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import './LoginForm.css';
import MainScreen from './MainScreen';
import Button from '@mui/material/Button';

function UserProfileScreen(){
    
    const [ password, setPassword] = useState('');
    const [ email, setEmail] = useState('');
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var loggedProfile = null;
    var profileEmail = window.localStorage.getItem("email");
  
    const loadProfile=async(e)=>{
        
        try {
           // console.log("UserProfileScreen - loggedProfile "+loggedProfile.email);
            const res = await Axios.post('http://localhost:8080/profile', 
            {username:""+logged+ ""});
            console.log("loggedProfile.email - get user profile data for "+logged);
            loggedProfile = res.data[0];
            console.log("UserProfileScreen - profile result obtained "+ loggedProfile.email);
            console.log("UserProfileScreen - loggedProfile "+loggedProfile.email);
           
        } catch (e){
            console.error("there was an error");
        }
        console.log("UserProfileScreen - loggedProfile after try catch "+loggedProfile.email);
        var profileEmail = ""+loggedProfile.email;

        console.log("profileEmail "+profileEmail);
    }
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

        
      //  loadProfile();
        
        console.log("Profile email" +profileEmail)
        if (logged==null){
         navigate('../login')   
        }
    },[])

 
  
    
    const handleEmailChange = (event) =>{
        setEmail( event.target.value);
        
    }


    const handlePassChange = (event) =>{
        setPassword( event.target.value);
        
    }

    const goMain = () =>{
        
        var isAdmin = window.localStorage.getItem("admin");
        if (isAdmin=='Y'){
        navigate('../main')
        }
        else {
            navigate('../mainuser')
        }
    }

    const handUpdatePassword=async(e)=>{
        
        e.preventDefault();
        alert("You have submitted password change");
        try {
            await Axios.post('http://localhost:8080/updatepass', {username:""+logged+ "",password:""+password+""})
            console.log("UserProfileScreen password changed");
        alert("You have changed your password successfully"); 
    } catch (e){
            console.error("UserProfileScreen password change error "+e.error);
        }
    }


    const handUpdateEmail=async(e)=>{
        
        e.preventDefault();
        alert("You have submitted email change");
        try {
            const res = await Axios.post('http://localhost:8080/updateemail', {username:""+logged+ "",email:""+email+""})
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
        <Button onClick={LogOutUser}>Logout {logged}</Button>
        </h2>
         
        </header>
        <div>
        <h1>User Management-Profile Management</h1>
             <h2>Username : {logged} </h2>
             
        </div>
        <div >
        <form onSubmit={(e)=>{handUpdateEmail(e)}}>
           
            <label>Current Email:{profileEmail} current email</label><br/>
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

export default  UserProfileScreen;
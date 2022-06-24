import {useEffect,useState} from 'react';
import { ReactDOM } from 'react-dom/client';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import {commonHeader} from "./common/CommonHeader";
import './LoginForm.css';

function MainScreen(){

    
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var loggedEmail = window.localStorage.getItem("email");
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

   
    const goProfile = () =>{
        
        navigate('../profile')
    }

    const goUser = () =>{
        
        navigate('../user')
    }

    return (

    <div>
        <header className='Header'> <h1>Welcome {logged} {loggedEmail} <button onClick={LogOutUser}>Logout {logged}</button></h1> </header>
    <div className='Login'>
    <h1>Main Screen </h1>
    <br/>
    <button onClick ={goProfile}>Change Password and/or email </button>
    <br/>
    <button  onClick ={goUser}>Create New User </button>
    </div>
    </div>
);
 }

 export default MainScreen;
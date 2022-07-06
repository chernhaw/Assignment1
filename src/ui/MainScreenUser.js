import {useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import './LoginForm.css';

function MainScreenUser(){

    
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var loggedEmail = window.localStorage.getItem("email");
    console.log(logged);
   
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
    },[])

   
    const goProfile = () =>{
        
        navigate('../profile')
    }

    const goUser = () =>{
        
        navigate('../user')
    }

    const goGroup = () =>{
        navigate('../group')
    }
    return (

    <div>
        <header className='Header'> <h1>Welcome {logged} {loggedEmail}</h1> 
        <h2> <Button onClick ={goProfile}>Change {logged} Password/email </Button><Button  onClick={LogOutUser}>Logout {logged}</Button></h2> </header>
    <div className='Login'>
    <h1>Kanban stuff -- to do </h1>
    <br/>
   
    <br/>
    
    </div>
    </div>
);
 }

 export default MainScreenUser;
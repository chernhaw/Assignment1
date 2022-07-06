import {useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
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

    
    const goUserMgt = () =>{
        
        navigate('../usersearch')
    }

    const goGroup = () =>{
        navigate('../groupmgt')
    }
    return (

    <div>
        <header className='Header'> <h1>Welcome {logged} {loggedEmail} 
        <button onClick={LogOutUser}>Logout {logged}</button> 
        <button onClick ={goProfile}>Change Password and/or email </button>
        <button  onClick ={goUser}>Create New User </button>
        <button  onClick ={goUserMgt}>User Management</button>
        <button  onClick ={goGroup}>Group Management</button> </h1>
         </header>
    <div className='Login'>
    <h1>Kanban stuff -- to do </h1>
   
    
   
    
    </div>
    </div>
);
 }

 export default MainScreen;
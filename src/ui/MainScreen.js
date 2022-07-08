import {useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import './LoginForm.css';

function MainScreen(){

    
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var loggedEmail = window.localStorage.getItem("email");
    var admin = window.localStorage.getItem("admin")
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
        if (admin!='Y'){
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
        <header className='Header'> <h1>Welcome {logged} {loggedEmail} </h1>
       <h2> <Button onClick={LogOutUser}>Logout {logged}</Button> 
        <Button onClick ={goProfile}>Change {logged} Password/Email </Button>
        </h2>
        <div>
        <div>
        <label>User and Group Management Functions</label>
        </div>
        
        <div>
           
        <button  onClick ={goUser}>Create New User </button>
        <button  onClick ={goUserMgt}>User Management</button>
        <button  onClick ={goGroup}>Group Management</button> 
        </div>
        </div>
         </header>
    <div className='Login'>
    <h1>Kanban stuff -- to do </h1>
   
    
   
    
    </div>
    </div>
);
 }

 export default MainScreen;
import {useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import './LoginForm.css';
import Axios from 'axios';

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
        if (admin===0){
            navigate('../login')   
           }
    },[])

    const grouplist = async(e) =>{
      
        
        //  window.localStorage.setItem("groupquery", querygroup);
          var groupnames ="";
          try {
             
             
              const res = await Axios.post('http://localhost:8080/listgroup', 
              {groupname:""+groupnames+""});
             
              console.log("Query group response "+ res.data);
              
             const size = res.data.length;
             
          
             for ( var i=0; i<size; i++){
               groupnames = groupnames+res.data[i].groupname + " \n"
              
             }
  
             
  
             window.localStorage.setItem("group", groupnames);
             
            
          } catch (e){
             console.error("Query group error - "+e.message);
  
         }
         
       
      }
   
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
        grouplist();
        
       // window.localStorage.setItem("group", group);
       
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
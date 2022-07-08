import {useEffect,useState} from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import './LoginForm.css';

function UserManagement(){

    var initialActivate = window.localStorage.getItem("userActiveStatus");
    var initialAdmin = window.localStorage.getItem("userAdmin");
    const [ password, setPassword] = useState('');
    const [ email, setEmail] = useState('');
    const [ isAdmin, setisAdmin] = useState(initialAdmin);
    const [ isActive, setActive] = useState(initialActivate);
//    const [ isActive, setActive] = useState(''+window.localStorage.getItem("userActiveStatus")+'');
      
    const [ newEmail, setNewEmail ] = useState('')
    
   
   
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    var emailusermgt = window.localStorage.getItem("emailusermgt");
 //   setNewEmail(emailusermgt);
    var usernameusermgt = window.localStorage.getItem('usernameusermgt');

    console.log("logged "+logged);
    console.log("Admin is "+isAdmin)
    console.log("Active is "+isActive)
    const LogOutUser = () =>{
        alert("You are logged out");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("email");
       
        window.localStorage.removeItem("admin");
        window.localStorage.removeItem("emailusermgt");
        window.localStorage.removeItem("");
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

   

    const checkAdminHandler =()=>{
        console.log("Checkbox clicked");
        if (isAdmin=='Y'){
           
            setisAdmin('N')
        } else {
            setisAdmin('Y')
        }
        console.log("Admin right : "+isAdmin)
    }
    

    const checkUserActiveHandler =()=>{
        console.log("Checkbox clicked "+isActive);

        if (isActive=='Y'){
           
            setActive('N')
        } else {
    
        setActive('Y')
        }
        console.log("User "+usernameusermgt+" is "+isActive)
    }
    
   
    const handleEmailChange = (event) =>{
        setEmail( event.target.value);
        
    }


    const handlePassChange = (event) =>{
        setPassword( event.target.value);
        
    }

    const goMain = () =>{
        
        navigate('../main')
    }


    const handUpdateEmail=async(e)=>{
        
        e.preventDefault();
        alert("You have submitted email change");
        try {
            const res = await Axios.post('http://localhost:8080/updateemail', {username:""+usernameusermgt+ "",email:""+email+""})
            var duplicate = res.data[0].duplicateemail;
           // res.data
            console.log("Response from backend -updateemail "+duplicate);
            if (duplicate>0){
                alert("Email is already being used - "+email+"\nPlease use a different email.");
            } else {
                alert("You have changed your email successfully");
                setNewEmail(email);
            }
            
         
    } catch (e){
            console.error("UserProfileScreen email there was an error"+e.error);
        }
    }
    const handUpdateUserActivate=async(e)=>{
        
        e.preventDefault();
        alert("You have submitted user activation change");
        try {
            const res = await Axios.post('http://localhost:8080/activate', {username:""+usernameusermgt+ "",active:""+isActive+""})
            var updateRes = res.data;
            console.log("Response from backend -updateemail "+updateRes);
         
    } catch (e){
            console.error("UserProfileScreen email there was an error"+e.error);
        }
    }



    const handUserAdminRight = async(e)=>{
        e.preventDefault();
        alert("You are updated admin right to "+usernameusermgt);
        try {
            const res = await Axios.post('http://localhost:8080/updateadm', {username:""+usernameusermgt+ "",admin:""+isAdmin+""})
            var updateRes = res.data;
            console.log("Updating admin right "+updateRes)
        
        } catch ( e){

        }
    }
    const handUpdatePassword=async(e)=>{
        
        e.preventDefault();
        alert("You have submitted password change");
        try {
            await Axios.post('http://localhost:8080/updatepass', {username:""+usernameusermgt+ "",password:""+password+""})
            console.log("UserProfileScreen password changed");
        alert("You have changed your password successfully"); 
    } catch (e){
            console.error("UserProfileScreen password change error "+e.error);
        }
    }

   
    
    return (
        <div>
        <header className='Header'> <h1>Welcome {logged} </h1>
            <h3>
        <Button onClick={goMain}>Previous Page</Button>
        <Button onClick={LogOutUser}>Logout {logged}</Button>
        </h3>
        </header>
        <div>
        <h2>User Management- Management - Admin</h2>
             <h2>Username : {usernameusermgt} </h2>
             
        </div>
        <div >
        <form onSubmit={(e)=>{handUpdateEmail(e)}}>
           
            <label>Current Email {emailusermgt}</label><br/>
            <label>New Email:</label>
            <input type="email" value={email} required onChange={(e)=>{handleEmailChange(e)}}/>
            <br/>
            <input type="submit" value="Update Email"/>
            
        </form>
        </div>
        <div >
            <br/>
        <form onSubmit={(e)=>{handUpdatePassword(e)}}>
           
            
            <label>New Password:</label>
            <input type="password" value={password} required onChange={(e)=>{handlePassChange(e)}}/>
            <br/>
            <input type="submit" value="Update Password"/>
            
        </form>
        </div>
        <br/>
        <div >
        <form onSubmit={(e)=>{handUpdateUserActivate(e)}}>
           
        
        <label>{usernameusermgt} has is active : {""+isActive+""}</label>
            
        <button  onClick={(e)=>{checkUserActiveHandler(e)}}>Activate or Deactivate user</button>
            <input type="submit" value="Update user active status"/>
        </form>
        </div>
        <br/>
        <div>
        <form onSubmit={(e)=>{handUserAdminRight(e)}}>
                <label>{usernameusermgt} has admin : {""+isAdmin+""}</label>
               
                
                <button  onClick={(e)=>{checkAdminHandler(e)}}>Add or Remove admin</button>
               
               <input type="submit" value="Confirm update user admin status"/>
           </form>
        </div>
        </div>
    );
 }

 export default UserManagement;
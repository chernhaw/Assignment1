import {useEffect,useState} from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import './LoginForm.css';
import MainScreen from './MainScreen';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import LogOut from './Logout';

function UserProfileScreen(){
    
    const [ password, setPassword] = useState('');
    const [ email, setEmail] = useState('');
    const [ currentEmail, setCurrentEmail] = useState('');
    const [userlistoption, setUserListOption] = useState([])
    const [selectedusertoedit, setSelectedUserToEdit] = useState('');

    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    
    var profileEmail = window.localStorage.getItem("email");
    var admin = window.localStorage.getItem("admin");
  
   
    console.log(logged);

    useEffect(() => {

        Axios.post('http://localhost:8080/listusers')
        .then((response)=>{
        const data = response.data;
        setUserListOption(data);
        }).catch((err)=>{});
        
       
        if (admin === 0) {
          
            navigate('../login')
        } 
        if (logged==null){
         navigate('../login')   
        }
    },[])

    const disableUser=()=>{
        navigate('../disableuser')  
    }

    const handleUserCheck=async(e)=>{
        e.preventDefault();
        console.log("Search user by "+selectedusertoedit+" ");
    
        try {

            const res = await Axios.post('http://localhost:8080/byusername', 
            {username:""+selectedusertoedit+""});
            console.log("Response length:"+""+res.data+"".length)
            
            if(res.data.username===undefined){
            alert("No user found for "+selectedusertoedit + " ");
            }else {
            console.log(res.data)
            console.log("username "+res.data.username)
            console.log("active "+res.data.active)
            console.log("email "+res.data.email)
            console.log("admin "+res.data.admin)

            setCurrentEmail(res.data.email)
           
            }
         //   if (res.data.username =="undefined"){
            
            // } else {
            //     alert ("No user with "+username+" found")
            // }

    } catch (e){
            console.error("Login function - there was an error extracting email "+e.message);
        }
    }
  
    
    const handleEmailChange = (event) =>{
        setEmail( event.target.value);
        
    }


    const handlePassChange = (event) =>{
        setPassword( event.target.value);
        
    }

    const goMain = () =>{
        
        
        if (admin === 0) {
          
            navigate('../login')
        } 
        else {
            navigate('../main')
        }
    }

    const handUpdatePassword=async(e)=>{
        
        e.preventDefault();
        alert("You have submitted password change");
        try {
            await Axios.post('http://localhost:8080/updatepass', {username:""+selectedusertoedit+ "",password:""+password+""})
            console.log("UserProfileScreen password changed");
        alert("You have changed your password successfully"); 
    } catch (e){
            console.error("UserProfileScreen password change error "+e.error);
        }

        
    }

    const handleUsernameCheck=(event)=>{
        setSelectedUserToEdit(event.target.value)
    }

    const handUpdateEmail=async(e)=>{
      //  e.preventDefault();
      
       
        try {
            const res = await Axios.post('http://localhost:8080/updateemail', {username:""+selectedusertoedit+ "",email:""+email+""})
            var updateRes = res.data;
            console.log("Response from backend -updateemail "+updateRes);

            alert(updateRes)
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
        
        <Button onClick={disableUser}>Disable User </Button>
        </h2>
        <LogOut />
        </header>
        <div>
        <h1>User Management</h1>
          
        </div>
        <div >
        <form onSubmit={(e)=>{handleUserCheck(e)}}>
        <label>Select User</label>
                <Select 
                value ={selectedusertoedit}
                onChange = {handleUsernameCheck}
                input={<OutlinedInput label="User to Check" />}>
                {userlistoption.map((user) => (
                <MenuItem
                key={user.username}
                value={user.username}  >
              {user.username}
            </MenuItem>
          
          ))}
               </Select>
               <input type="submit" value="Check User" />
        </form>
        <form onSubmit={(e)=>{handUpdateEmail(e)}}>
           
            <label>Current Email:{currentEmail} </label><br/>
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
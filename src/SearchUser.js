import {useEffect,useState} from 'react';
import { ReactDOM } from 'react-dom/client';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import {commonHeader} from "./common/CommonHeader";
import './LoginForm.css';

function SearchUser(){

    const [ username, setUsername] = useState('');
    const [ email, setEmail] = useState('');
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
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


    const handleUserEmailChange = (event) =>{
        setEmail(event.target.value);
        
    }
   
    const handleUserChange = (event) =>{
        setUsername(event.target.value);
        
    }

    const handleSearchUserByEmail=async(e)=>{
        e.preventDefault();
        console.log("Search username "+username+" by email");
    
        try {

            const res = await Axios.post('http://localhost:8080/username', 
            {email:""+email+""});
            
            const username = res.data.username;
                  
            console.log("Search username - result  "+username);
            window.localStorage.setItem("emailusermgt", email); 
            window.localStorage.setItem("usernameusermgt", username);
            window.localStorage.setItem("userActiveStatus")
            navigate('../usermgt');
    } catch (e){
            console.error("Login function - there was an error extracting email "+e.message);
        }
    }


    const handleSearchEmailByUserName=async(e)=>{
        e.preventDefault();
        console.log("Search username "+username+" by email");
    
        try {

            const res = await Axios.post('http://localhost:8080/email', 
            {username:""+username+""});
            
            const email = res.data.email;
                  
            console.log("Search email - result  "+email);
            window.localStorage.setItem("emailusermgt", email);
            window.localStorage.setItem("usernameusermgt", username);
            navigate('../usermgt');
    } catch (e){
            console.error("Login function - there was an error extracting email "+e.message);
        }
    }
  
    const goMain = () =>{
        
        navigate('../main')
    }



    return (

    <div>
        <header className='Header'> <h1>Welcome {logged} </h1>
        <button onClick={LogOutUser}>Logout {logged}</button>
        <button onClick={goMain}>Main Menu</button> </header>
    <div className='Login'>
    <h2>User Management - Search By Username</h2>
    <div>
    <form onSubmit={(e)=>{handleSearchEmailByUserName(e)}}>
    <label>Username: </label>
    <input type="" value={username} required onChange={(e)=>{handleUserChange(e)}}/>
    <br/>
    <input type="submit" value="Search by Username "/>
    </form>
    <div>
    <h2>User Management - Search By Email</h2>
    <form onSubmit={(e)=>{handleSearchUserByEmail(e)}}>
    <label>Email: </label>
    <input type="" value={email} required onChange={(e)=>{handleUserEmailChange(e)}}/>
    <br/>
    <input type="submit" value="Search by User Email "/>
    </form>
    </div>
    </div>
    
    </div>
    </div>
);
 }

 export default SearchUser;
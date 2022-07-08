import {useEffect,useState} from 'react';
import { ReactDOM } from 'react-dom/client';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import './LoginForm.css';

function SearchUser(){

    const [ username, setUsername] = useState('');
    const [ email, setEmail] = useState('');
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    console.log("Logged" +logged);
    console.log("Admin" +admin);
   
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


    const handleUserEmailChange = (event) =>{
        setEmail(event.target.value);
        
    }
   
    const handleUserChange = (event) =>{
        setUsername(event.target.value);
        
    }

    const handleSearchUserByEmail=async(e)=>{
        e.preventDefault();
        console.log("Search username by email" +email);
    
        try {

            const res = await Axios.post('http://localhost:8080/byemail', 
            {email:""+email+""});
            if(res.data.username===undefined){
                alert("No user found for "+email+" :"+res.data.username);
                }else {
            console.log("username "+res.data.username)
            console.log("active "+res.data.active)
            console.log("email "+res.data.email)
            console.log("admin "+res.data.admin)

            // console.log("Search result  username :"+username+ 
            // " email :"+useremail+ 
            // " active :"+useractive +
            // " useradmin : "+useradmin);
            window.localStorage.setItem("emailusermgt", res.data.email); 
            window.localStorage.setItem("usernameusermgt", res.data.username);
            window.localStorage.setItem("userActiveStatus", res.data.active);
            window.localStorage.setItem("userAdmin", res.data.admin)
        

             navigate('../usermgt');
                }
       //   navigate('../queryresult');
            // } else {
            //     alert ("No user with "+email+" found")
            // }
    } catch (e){
            console.error("Login function - there was an error extracting email "+e.message);
        }
    }


    const handleSearchEmailByUserName=async(e)=>{
        e.preventDefault();
        console.log("Search user by "+username+" ");
    
        try {

            const res = await Axios.post('http://localhost:8080/byusername', 
            {username:""+username+""});
            console.log("Response length:"+""+res.data+"".length)
            
            if(res.data.username===undefined){
            alert("No user found for "+username + " ");
            }else {
            console.log(res.data)
            console.log("username "+res.data.username)
            console.log("active "+res.data.active)
            console.log("email "+res.data.email)
            console.log("admin "+res.data.admin)
            window.localStorage.setItem("emailusermgt", res.data.email); 
            window.localStorage.setItem("usernameusermgt", res.data.username);
            window.localStorage.setItem("userActiveStatus", res.data.active);
            window.localStorage.setItem("userAdmin", res.data.admin)
            navigate('../usermgt');
            }
         //   if (res.data.username =="undefined"){
            
            // } else {
            //     alert ("No user with "+username+" found")
            // }

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
        <h3><Button onClick={LogOutUser}>Logout {logged}</Button>
        <Button onClick={goMain}>Previous Screen</Button></h3> </header>
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
    <input type="email" value={email} required onChange={(e)=>{handleUserEmailChange(e)}}/>
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
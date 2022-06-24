import {useState} from 'react';
import Axios from 'axios';
import './LoginForm.css';

import { useNavigate } from "react-router-dom";

function LoginForm(){
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUserChange = (event) =>{
        setUsername(event.target.value);
        
    }

    const handlePassChange = (event) =>{
        setPassword( event.target.value);
        
    }

    const handSubmit=async(e)=>{
        e.preventDefault();
        
        alert("You have submitted "+username+" "+password);
        try {

            const res = await Axios.post('http://localhost:8080/login', 
            {username:""+username+ "",password:""+password+""});
            console.log("login function executed");
            const validation = res.data;
            console.log("login function validation "+validation);
           
            
            if (validation){
                window.localStorage.setItem("username", username);
                navigate('../user');
            } else {
                alert("You have entered an invalid username or password");
            }
            

    } catch (e){
            console.error("Login function - there was an error "+e.message);
        }
        

    }


    /*
const handSubmit=async(e)=>{
        e.preventDefault();
        
        alert("You have submitted "+username+ " "+password);
        try {
        await Axios.post('http://localhost:8080/login', {username:""+username+ "",password:""+password+""})
            console.log("login function executed");
           
    } catch (e){
            console.error("there was an error");
        }
        

    }

    */
    return (
        <div className='Login'>
        <form onSubmit={(e)=>{handSubmit(e)}}>
            <h1>Kanban App</h1>
           
            <hr></hr>
            <label>User Name: </label>
            <input type="text" value={username} required onChange={(e)=>{handleUserChange(e)}}/>
            <br/>
           
            <label>Password: </label>
            <input type="password" value={password} required onChange={(e)=>{handlePassChange(e)}}/>
            <br/>
            <input type="submit" value="Login"/>
        </form>
        </div>
    )
}


export default LoginForm;
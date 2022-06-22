import {useState} from 'react';
import { ReactDOM } from 'react-dom/client';
import Axios from 'axios';
import './LoginForm.css';

function UserSettingScreen(){
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const [ email, setEmail] = useState('');

    const handleUserChange = (event) =>{
        setUsername(event.target.value);
        
    }

    const handlePassChange = (event) =>{
        setPassword( event.target.value);
        
    }

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

    return (
        <div className='Login'>
        <form onSubmit={(e)=>{handSubmit(e)}}>
            <h1>Kanban App</h1>
            <h2>User Management</h2>
            <hr></hr>
            <label>User Name: </label>
            <input type="text" value={username} required onChange={(e)=>{handleUserChange(e)}}/>
            <br/>
            <label>Update Email: </label>
            <input type="email" value={email} required onChange={(e)=>{handleUserChange(e)}}/>
            <br/>
            <label>New Password: </label>
            <input type="password" value={password} required onChange={(e)=>{handlePassChange(e)}}/>
            <br/>
            <input type="submit" value="Update"/>
        </form>
        </div>
    )
}

export default UserSettingScreen;
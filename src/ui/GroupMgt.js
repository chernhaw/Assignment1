import { useNavigate } from "react-router-dom";
import {useEffect,useState} from 'react';
import './LoginForm.css';

function GroupMgt(){

    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
   
    console.log(logged);

    const [ username, setUsername] = useState('');
    const [ groupname, setGroupname] = useState('');
    
   
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

    const handleGroupNameChange = (event) =>{
        setGroupname(event.target.value);
        
    }

    const handleUserNameChange = (event) =>{
        setUsername(event.target.value);
        
    }
    
    const goMain = () =>{
        
        navigate('../main')
    }

    const handUpdateGroup = (event) =>{
        alert ("You have assigned user "+username+" to "+groupname);
        
    }
    return (
        <div>
        <header className='Header'> <h1>Welcome {logged} </h1>
        <button onClick={goMain}>Main Menu</button>
        <button onClick={LogOutUser}>Logout {logged}</button>
        
         
        </header>
        <div>
        <h2>Group Management-Assign user </h2>
             
             
        </div>
        <div >
        <form onSubmit={(e)=>{handUpdateGroup(e)}}>
           
            <label>Group Name:</label><br/>
            <input type="text" value={groupname} required onChange={(e)=>{handleGroupNameChange(e)}}/>
            <label>Username :</label>
            <input type="text" value={username} required onChange={(e)=>{handleUserNameChange(e)}}/>
            <br/>
            <input type="submit" value="Update Email"/>
            
        </form>
        </div>
       
        </div>
    );
}

export default GroupMgt;
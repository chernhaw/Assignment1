import { useNavigate } from "react-router-dom";
import {useEffect,useState} from 'react';
import Axios from 'axios';
import './LoginForm.css';

function GroupMgt(){

    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
   
    console.log(logged);

    const [ username, setUsername] = useState('');
    const [ groupname, setGroupname] = useState('');
    const [ assigngroup, setAssignGroup] = useState('');
    const [ checkgroup, setCheckGroup] = useState('');
   
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

    const handleCheckGroupChange=(event) =>{
        setCheckGroup(event.target.value);
    
    }

    const handleGroupNameChange = (event) =>{
        setGroupname(event.target.value);
        
    }

    const handleGroupAssign=(event)=>{

    //   start coding
        setAssignGroup(event.target.value);

    }
    const handleUserNameChange = (event) =>{
        setUsername(event.target.value);
        
    }
    
    const goMain = () =>{
        
        navigate('../main')
    }

    const handCreateGroup = async(e)=>{

        var res;
        alert ("You are created "+groupname);

        try {

             const res = await Axios.post('http://localhost:8080/creategroup', 
            {groupname:""+groupname+""});
            
           // alert(res);
            console.error("Create groupname response "+ res);
          
        } catch (e){
            console.error("Create groupname error - "+e.message);
        }
        console.log("res " +res)
    }

    const handCheckGroup = async(e) =>{
        try {

            var res = await Axios.post('http://localhost:8080/checkgroup', 
           {groupname:""+groupname+""});
           
       //    alert(res);
           console.log("checkgroup - Check group response "+ res.data);
           alert(res.data[0].username +" "+res.data[1].username +" length "+res.data.length);
         
       } catch (e){
           console.error("Create groupname error - "+e.message);
       }
       console.log("res " +res)

    }

    const handUpdateGroup = async(e) =>{
        alert ("You have assigned user "+username+" to "+groupname);

        try {

            const res = await Axios.post('http://localhost:8080/groupassign', 
            {username:""+username+"",groupname:""+assigngroup+""});
           //{username:""+logged+ "",password:""+password+""
          // alert(res);
           console.error("Create groupname response "+ res);
         
       } catch (e){
           console.error("Create groupname error - "+e.message);
       }
     //  console.log("res " +res)
        
    }
    return (
        <div>
        <header className='Header'> <h1>Welcome {logged} </h1>
        <button onClick={goMain}>Main Menu</button>
        <button onClick={LogOutUser}>Logout {logged}</button>
        </header>
        <div>
        <h1>Group Management </h1> 
        </div>
        <div >
        <form onSubmit={(e)=>{handCreateGroup(e)}}>
            <h3>Create new Group</h3>
            <label>New Group Name:</label><br/>
            <input type="text" value={groupname} required onChange={(e)=>{handleGroupNameChange(e)}}/>
            <br/>
            <br/>
            <input type="submit" value="Create Group"/>
        </form>

        </div>
        <div >
        <form onSubmit={(e)=>{handCheckGroup(e)}}>
            <h3>View Group</h3>
            <label>Group Name:</label><br/>
            <input type="text" value={checkgroup} required onChange={(e)=>{handleCheckGroupChange(e)}}/>
            <br/>
            <br/>
            <input type="submit" value="View Group"/>
        </form>

        </div>
        <div >
        <form onSubmit={(e)=>{handUpdateGroup(e)}}>
        <h3>Assign Group</h3>
            <label>Group Name:</label>
            <input type="text" value={assigngroup} required onChange={(e)=>{handleGroupAssign(e)}}/>
            <br/>
            <br/>
            <label>Username :</label>
            <input type="text" value={username} required onChange={(e)=>{handleUserNameChange(e)}}/>
            <br/>
            <br/>
            <input type="submit" value="Update Group"/>
            
        </form>
        </div>
       
        </div>
    );
}

export default GroupMgt;
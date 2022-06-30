import {useEffect,useState} from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

function GroupMgt(){

    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
   
    console.log(logged);

    const [ username, setUsername] = useState('');
    const [ groupname, setGroupname] = useState('');
    const [ assigngroup, setAssignGroup] = useState('');
    const [ querygroup, setQueryGroup] = useState('');
    const [ groupmembersresult, setGroupMembersResult] = useState('');
   
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

    const handleGroupQueryChange = (event) =>{
        setQueryGroup(event.target.value);
        console.log("Handle group query "+querygroup)
        
    }

    const handleGroupNameChange = (event) =>{
        setGroupname(event.target.value);
        
    }

    const handleGroupAssign=(event)=>{
        setAssignGroup(event.target.value);

    }
    const handleUserNameChange = (event) =>{
        setUsername(event.target.value);
        
    }
    
    const goMain = () =>{
        
        navigate('../main')
    }

   


    const handQueryGroup = async(e) =>{
        e.preventDefault();
        var groupmembers = "";
      //  window.localStorage.setItem("groupquery", querygroup);
        
        try {
          
            const res = await Axios.post('http://localhost:8080/checkgroup', 
            {groupname:""+querygroup+""});
           
            console.log("Query group response "+ res.data);
            
           const size = res.data.length;
           
        
           for ( var i=0; i<size; i++){
             groupmembers = groupmembers+res.data[i].username + " \n"
            
           }

           setGroupMembersResult(groupmembers);
          
        } catch (e){
           console.error("Query group error - "+e.message);
       }

       
     //  alert(data)
       //setMembers(usersFound)
    }
    const handCreateGroup = async(e)=>{
        e.preventDefault();
        var res;
        alert ("You are created "+groupname);

        try {

             const res = await Axios.post('http://localhost:8080/creategroup', 
            {groupname:""+groupname+""});
            
            console.log("Create groupname response "+ res);
 
         } catch (e){
            console.error("Create groupname error - "+e.message);
        }
        console.log("res " +res)
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
        <h1>Group Management </h1> 
        </div>

        <div>
        <form onSubmit={(e)=>{handQueryGroup(e)}}>
            <h3>Query Group</h3>
            <label>Group Name:</label><br/>
            <input type="text" value={querygroup} required onChange={(e)=>{handleGroupQueryChange(e)}}/>
            <br/>
        
            <input type="submit" value="Query Group"/>
            
        </form>
        <div>
            {groupmembersresult}
        </div>
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
        <br/>
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
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
    const [ unassignmember, setUnassignMember ] = useState('');
    const [ unassigngroup, setUnassignGroup ] = useState('');
   
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

    const handleGroupUnAssign= (event) =>{
        console.log("group unassign "+event.target.value)
        setUnassignGroup(event.target.value);

    }

    const handleUserNameChangeUnassign= (event) =>{
        setUnassignMember(event.target.value);
        
    }

    const handUpdateGroupUnassign=async(e) =>{
        e.preventDefault();
        var groupmembers = "";
      //  window.localStorage.setItem("groupquery", querygroup);
        
        try {
          
            alert( "Removing from  group "+ unassigngroup + " username "+ unassignmember)
            console.log(" "+ unassigngroup +" "+unassignmember)

            const res = await Axios.post('http://localhost:8080/groupremove', 
            {groupname:""+unassigngroup+"",username:""+unassignmember+""});
            // {groupname:""+querygroup+""});
           

          //  {groupname:""+assigngroup+"",username:""+username+""});

           
            console.log("Query group response "+ res.data);
            
           const size = res.data.length;
           
        
           for ( var i=0; i<size; i++){
             groupmembers = groupmembers+res.data[i].username + " \n"
            
           }

           setGroupMembersResult(groupmembers);
          
        } catch (e){
           console.error("Query group error - "+e.message);
       }
    }
    /*
 const [ unassignmenber, setUnassignMember ] = useState('');
    const [ unassigngroup, setUnassignGroup ] = useState('');

    */

    // handUpdateGroupUnassign(e)}}>
    //     <h3>Remove Group Assignment </h3>
    //         <label>Group Name:</label>
    //         <input type="text" value={assigngroup} required onChange={(e)=>{handleGroupUnAssign(e)}}/>
            
    //         <br/>
    //         <label>Username :</label>
    //         <input type="text" value={username} required onChange={(e)=>{handleUserNameChangeUnassign(e)}}/>
    
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
            //const email = res.data.email;
            console.log("Create group response"+ res.data.groupcount);

            if (res.data.groupcount!=0){
                alert ("Group "+ groupname + " already exist - please choose another name");
            }
           
           
         } catch (e){
            console.error("Create groupname error - "+e.message);
        }
        //console.log("res " +res)
    }
    const handUpdateGroup = async(e) =>{


            alert("Updating "+username+ " to group "+assigngroup)

            
        try {

            const res = await Axios.post('http://localhost:8080/groupassign', 
           {groupname:""+assigngroup+"",username:""+username+""});
          
           console.log("Create group assignment response - duplicate member"+ res.data.duplicate_member);
           
          if (res.data.duplicate_member!=0){
            alert("Username "+username+" is already in "+assigngroup);
          }
        } catch (e){
           console.error("Create groupname error - "+e.message);
       }
      

       ///
        
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
            
            <label>Username :</label>
            <input type="text" value={username} required onChange={(e)=>{handleUserNameChange(e)}}/>
            <br/>
            
            <input type="submit" value="Update Group"/>
            
        </form>
        </div>



        <div >
        <form onSubmit={(e)=>{handUpdateGroupUnassign(e)}}>
        <h3>Remove Group Assignment </h3>
            <label>Group Name:</label>
            <input type="text" value={unassigngroup} required onChange={(e)=>{handleGroupUnAssign(e)}}/>
            
            <br/>
            <label>Username :</label>
            <input type="text" value={unassignmember} required onChange={(e)=>{handleUserNameChangeUnassign(e)}}/>
            
            <br/>
            <input type="submit" value="Update Group"/>
            
        </form>
        </div>
       
        </div>
    );
}

export default GroupMgt;
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import { resolvePath, useNavigate } from "react-router-dom";

import LogOut from './Logout';
import './App.css';
import axios from 'axios';
function GroupEdit() {


    var groupmembers = ''
    var userlist = ''


    const [showgroupmembers, setShowGroupmembers] = useState('')
    const [group, setGroup] = useState('')
    const [showuserlist, setShowUserlist]= useState('')
    const [unassignmember, setUnassignMember]=useState('')
    const [assignmember, setAssignMember]=useState('')
    
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    

    
    useEffect( () => {

        setTimeout(refresh, 500)
        var groupedit=''
       
       
        //window.location.reload(blnReload)
        if (logged == null) {

           

            navigate('../login')
        }
        if (admin === 0) {
          
            navigate('../login')
        } 

        Axios.post('http://localhost:8080/listusers')
        .then((response)=>{
        const data = response.data;
          const size = response.data.length
          
          console.log("data" +data)
         // console.log("data" +data[0].username)
          
          console.log("data size " +size)
          
           for ( var i=0; i<size; i++){
            userlist = userlist+data[i].username + " "
                  console.log("listuser [" +i+ "]" + userlist)
              }
          console.log("final list user" +userlist)

          setShowUserlist(userlist)

        }).catch((err)=>{});
        
    
        var groupedit = ""
        groupedit = window.localStorage.getItem("group");
        getGroupMembers(groupedit)
       
       
    
        }, [])

       
        function refresh(){
            var refresh = window.localStorage.getItem("refresh")
           // alert("Refresh "+refresh)
            if (refresh=='true'){
            window.location.reload()
            window.localStorage.removeItem("refresh")
            }

        }
        const getGroupMembers =async()=>{
            var groupedit = window.localStorage.getItem("group");
            const res = await Axios.post('http://localhost:8080/groupedit', { groupname: "" + groupedit + "" })
            .then((response)=>{
            const data = response.data;
              
            const size = data.length;
            console.log("data " +data)
           // console.log("data" +data[0].username)
            
            console.log("data size " +size)
            
             for ( var i=0; i<size; i++){
                groupmembers = groupmembers+data[i].username+" " 
                    console.log("group membernames[" +i+ "]" + groupmembers)
                }

                if (size==0){
                    groupmembers ="Nil"
                    }
                console.log("final groupmember names " +groupmembers)
            console.log("final groupmember names " +groupmembers)
           setShowGroupmembers(groupmembers);
           setGroup(groupedit)
            }).catch((err)=>{});
        }
   
        const goMain = () => {

            navigate('../main')
        }
 

        const goGroup = () =>{     
               navigate('../groupmgt')    
        }

        const handleUserNameChangeAssign = (event) => {
            setAssignMember(event.target.value);
    
        }

        const handleUserNameChangeUnassign = (event) => {
            setUnassignMember(event.target.value);
    
        }


        const handleAssignGroup = async (e) => {
     
          
            var groupmembers = ""+showgroupmembers+""
            var usertoassign = ""+assignmember+""
            var userlist = ""+showuserlist+""

            var assignUser = true;
            var assignGp = true;
          


           // alert("User in group "+groupmembers.search(usertoassign))


            if (groupmembers.search(" "+usertoassign+" ")!==-1){
                assignGp=false;
                alert("User already in group")
            }
          

            if (userlist.search(" "+usertoassign+" ")==1){
                assignGp=false;
                alert("User "+ usertoassign + " does not exist")
            }
            

            // check if username exist
            try {
                const res = await Axios.post('http://localhost:8080/userexist',
                    { username: "" + assignmember + "" });
                console.log("Create group response" + res.data.usercount);
                //  alert("user count " +res.data.usercount)
    
                if (res.data.usercount === 0) {
                    alert("Cannot assign user to group " + group + " user " + assignmember + " does not exist")
                    assignUser = false
                }
            } catch (e) {
                console.error("Create groupname error - " + e.message);
            }
    
            
            
    
            
            if (assignUser && assignGp) {
                try {
                    const res = await Axios.post('http://localhost:8080/groupassign',
    
                        { groupname: "" + group + "", username: "" + assignmember + "" });
                        console.log(1,group)
                        console.log(2,assignmember )
                        console.log("Create group assignment response - duplicate member" + res.data.duplicate_member);
    
                    if (res.data.duplicate_member != 0) {
                        alert("Username " + assignmember + " is already in " + group);
                    } else {
                        window.location.reload();
                    }

                    
                    
                } catch (e) {
                    console.error("Create groupname error - " + e.message);
                }
                window.location.reload();
                
               assignUser = true;
               assignGp = true;
            }
                        
                
        }
    
       

        const handGroupUnassign = async (e) => {
            
            if(!showgroupmembers.split(" ").includes(unassignmember)){
                alert("User is not in group");
                window.location.reload();
              }else{
               
               
                    await axios.post('http://localhost:8080/groupremove',
                    { groupname: "" + group + "", username: "" + unassignmember + "" })
                    .then((res)=>{
                        alert(`${unassignmember} has been removed from ${group}`)
                        window.location.reload();
                    })
                    .catch((err)=>{console.log(err)})
                
             
              }



       
        }

    return (
        <div>
            <header className='Header'>
                <h3>Welcome {logged} </h3>
                <h3>
                    <Button onClick={goMain}>Main </Button>
                    <Button onClick={goGroup}>Group Management </Button>
                   <LogOut/>

                    <Button onClick={goGroup}>Previous Screen</Button>
                </h3>
            </header>

           <h3>Current members in {group}</h3>
          

          
           <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)", }}>
            {showgroupmembers.split(" ").map((group)=>{
                
                    return(
                        <div key={group} style={{border:"1px solid #000"}}>
                            {group}
                        </div>
                    )
            })}
            </div>    
          
           <h3>List of users that can be added to group ( if they are not members )</h3> 
          
           <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)", }}>
            {showuserlist.split(" ").map((group)=>{
                
                    return(
                        <div key={group} style={{border:"1px solid #000"}}>
                            {group}
                        </div>
                    )
                
               
            })}
            </div>    
            <h3>Assign / Unassign User</h3>
           <form onSubmit={(e) => { handleAssignGroup(e) }}>
                   
                    <label>Assign user:</label><br />
                    <input type="text" value={assignmember} required onChange={(e) => { handleUserNameChangeAssign(e) }} />
                    <br />

                    <input type="submit" value="Assign user to group" />

                </form>

                <form onSubmit={(e) => { handGroupUnassign(e) }}>
                   
                   <label>Unassign user:</label><br />
                   <input type="text" value={unassignmember} required onChange={(e) => { handleUserNameChangeUnassign(e) }} />
                   <br />

                   <input type="submit" value="Unassign User to Group" />

               </form>

            </div>


    
    );

}

export default GroupEdit
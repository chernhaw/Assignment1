import { useEffect, useState } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';

function GroupEdit() {


    var groupmembers = ''
    var userlist = ''

    var blnReload = false
    const [showusernames, setShowUsernames] = useState('')
    const [group, setGroup] = useState('')
    const [showuserlist, setShowUserlist]= useState('')
    const [unassignmember, setUnassignMember]=useState('')
    const [assignmember, setAssignMember]=useState('')

    
    
    
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    

    const LogOutUser = () => {
        alert("You are logged out");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("admin");
        window.localStorage.removeItem("group");
        navigate('../login')
    }
    useEffect( () => {
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
            userlist = userlist+" "+data[i].username + " "
                  console.log("listuser [" +i+ "]" + userlist)
              }
          console.log("final list user" +userlist)

          setShowUserlist(userlist)

        }).catch((err)=>{});


        
    
        var groupedit = ""

       
        

        groupedit = window.localStorage.getItem("group");
       
       
        getGroupMembers(groupedit)
       
        setTimeout(refresh, 20000000)
    
        }, [])

       
        function refresh(){
            
            window.location.reload()
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
                groupmembers = groupmembers+" "+data[i].username + " "
                    console.log("group membernames[" +i+ "]" + groupmembers)
                }
            console.log("final groupmember names " +groupmembers)
           setShowUsernames(groupmembers);
           setGroup(groupedit)
            }).catch((err)=>{});
        }
   
        const goMain = () => {

            navigate('../main')
        }
 

        const goGroup = () =>{
            //   grouplist();
            //  userlist();
               
              
              
               navigate('../groupmgt')
              
        }


        const refreshGroup=async()=>{

            const resupdate =  Axios.post('http://localhost:8080/groupedit', { groupname: "" + group + "" })
                
            const data = resupdate.data;
              
            const size = data.length;
            console.log("data" +data)
           // console.log("data" +data[0].username)
            
            console.log("data size " +size)
            
             for ( var i=0; i<size; i++){
                groupmembers = groupmembers+" "+data[i].username + " "
                    console.log("group membernames[" +i+ "]" + groupmembers)
                }
            console.log("final groupmember names " +groupmembers)
           setShowUsernames(groupmembers);
            
        }


        const handleUserNameChangeAssign = (event) => {
            setAssignMember(event.target.value);
    
        }

        const handleUserNameChangeUnassign = (event) => {
            setUnassignMember(event.target.value);
    
        }


        const handleAssignGroup = async (e) => {


            var groupmembers = ""+showusernames+""
            var usertoassign = ""+assignmember+""
            var userlist = ""+showuserlist+""

            var assignUser = true;
            var assignGp = true;
            alert("Assigning " + assignmember + " to group " + group)


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
                    }

                    
                } catch (e) {
                    console.error("Create groupname error - " + e.message);
                }

                
               assignUser = true;
               assignGp = true;
            }
    
            ///
    
        }
    
       

        const handGroupUnassign = async (e) => {
            e.preventDefault();
         //   var groupmembers = "";
            //  window.localStorage.setItem("groupquery", querygroup);
    
            try {
    
                alert("Unassign username " + unassignmember+ " to group " + group )
                console.log("GroupEdit unassign " +group  + " " + unassignmember  )
    
                const res = await Axios.post('http://localhost:8080/groupremove',
                    { groupname: "" + group + "", username: "" + unassignmember + "" });
                    
                console.log("Query group response " + res.data);
    
                refreshGroup()
                
            } catch (e) {
                console.error("Query group error - " + e.message);
            }
        }

    
          


          

    return (
        <div>
            <header className='Header'>
                <h1>Welcome {logged} </h1>
                <h3>
                    <Button onClick={goMain}>Main </Button>
                    <Button onClick={goGroup}>Group Management </Button>
                    <Button onClick={LogOutUser}>Logout {logged}</Button>

                    <Button onClick={goGroup}>Previous Screen</Button>
                </h3>
            </header>

           <h3>Current user in {group}</h3>
           {showusernames} 
           <h3>List of users</h3> 
           {showuserlist}
           <h3></h3>
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
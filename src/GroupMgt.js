import { useEffect, useState } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import LogOut from './Logout';


function GroupMgt() {

    
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    
   // var users =""+ window.localStorage.getItem("users")+""
   // users = users.split(',')
   
   
   var group =""
   
   
    
    var curgrouplist="";
    var currgrouplistArr =[];
   
 //  alert("users array "+users)

  //  var groupnames = ''
    console.log(logged);
    console.log("admin right " + admin);
    

    const [username, setUsername] = useState('');
    const [groupname, setGroupname] = useState('');

    const [querygroup, setQueryGroup] = useState('');
    const [grouplistresult, setGroupListsResult] = useState('');
    const [groupmembers, setGroupMembers] = useState([])

    const [groupedit, setGroupEdit] = useState('');
 
    const [grouplistoption, setGroupListOption] = useState([])

    const [showgroups, setShowGroups] = useState('');

    const [showusers, setShowUsers] = useState('');

    const [userlistoption, setUserListOption] = useState([])
    const [checkgroup, setCheckGroup] = useState('')
    

    const [groupmembersresult, setGroupMembersResult] = useState('');
    const [unassignmember, setUnassignMember] = useState('');
    const [unassigngroup, setUnassignGroup] = useState('');
    const [isAdmin, setisAdmin] = useState('N');
    const [roleusername, setRoleUsername] = useState();
    const [rolegroupname, setRolegroupname] = useState();
    const [assignadmingroup, setAssignAdminGroup] = useState();
    const [adminUserName, setAdminUserName] = useState();
    const [removeAdmingroup, setRemoveAdminGroup] = useState();
    const [removeAdminUserName, setRemoveAdminUserName] = useState();


    // const LogOutUser = () => {
    //     alert("You are logged out");
    //     window.localStorage.removeItem("username");
    //     window.localStorage.removeItem("email");
    //     window.localStorage.removeItem("admin");
    //     window.localStorage.removeItem("group");
    //     navigate('../login')
    // }

    const setAdmin = () => {
        var refresh="true"
        window.localStorage.setItem("refresh", refresh )
        navigate('../groupadmin')
    }

    useEffect( async() => {
        setTimeout(refresh, 500)

        if (logged == null) {
            navigate('../login')
        }
        if (admin === 0) {
            navigate('../login')
        }

    

async function getAllGroup(){
    const res = await Axios.post('http://localhost:8080/listgroup',
        { groupname: null });

     const data = res.data;

    console.log("Query group response "+ res.data);
          
   const size = res.data.length;

   //curgrouplist = "{"
    for ( var i=0; i<size; i++){
      
             curgrouplist = curgrouplist + res.data[i].groupname + " "
    }
     


    console.log("Current group list" +curgrouplist)
    setShowGroups(curgrouplist)
}

getAllGroup()
   
    var curruserlistArr=[]
    var curruserlist=""
    Axios.post('http://localhost:8080/listusers')
    .then((response)=>{
    const datauser = response.data;
    console.log("Query user response "+ response.data);
          
    const size = response.data.length;
 
    //curgrouplist = "{"
     for ( var i=0; i<size; i++){
       
        curruserlist = curruserlist+ " " +response.data[i].username
        console.log("current user list "+ curruserlist)
     }
      

     curruserlistArr=curruserlist.split(" ")
    // currgrouplistArr.pop()
     console.log("current grouplist array members : " +curruserlistArr) 
     setShowUsers(curruserlist)

   setUserListOption(datauser);
    }).catch((err)=>{});

    }, [])

    function refresh(){
        var refresh = window.localStorage.getItem("refresh")
       // alert("Refresh "+refresh)
        if (refresh=='true'){
        window.location.reload()
        window.localStorage.removeItem("refresh")
        }

    }

    function refresh(){
        var refresh = window.localStorage.getItem("refresh")
       // alert("Refresh "+refresh)
        if (refresh=='true'){
        window.location.reload()
        window.localStorage.removeItem("refresh")
        }

    }
    const handleGroupEditChange=(e)=>{

        setGroupEdit(e.target.value)
    }
    const handleGroupEdit = async (e) => {

        alert ("Group selected for edit "+groupedit)
       
        // setGroupEdit(e.target.value)
       

       try {
      
        console.log("Querying team member for group "+groupedit)
       
       var refresh = "true"
      window.localStorage.setItem("group", groupedit);
      window.localStorage.setItem("refresh", refresh )

      navigate('../groupedit')
     
       //setlist(...list, newItem);
      
       
      
       } catch (e) {
        console.error("Query group error - " + e.message);
    }
    }

    
   
   


    const handleGroupNameChange = (event) => {
        setGroupname(event.target.value);

    }



 
    const goMain = () => {
        var refresh="true"
        window.localStorage.setItem("refresh", refresh )

        navigate('../main')
    }


    const grouplist = async (e) => {


        //  window.localStorage.setItem("groupquery", querygroup);
        var groupnames = "";
        try {
          //  alert("group" + querygroup)

            const res = await Axios.post('http://localhost:8080/listgroup',
                { groupname: "" + groupnames + "" });

            console.log("Query group response " + res.data);

            //const size = res.data.length;


            const size = res.data.length;
            for ( var i=0; i<size; i++){
               if (i!=size-1){
              groupnames = groupnames+" "+res.data[i].groupname + ","
               } else {
                   groupnames = groupnames+" "+res.data[i].groupname+""
               }
             
            }
            setGroupListsResult(groupnames);

            alert(groupnames);


        } catch (e) {
            console.error("Query group error - " + e.message);

        }


        return groupnames
    }

   

    const handCreateGroup = async (e) => {
        e.preventDefault();
     //   alert(" current grouplist " + group)
        alert("You are created " + groupname);

        try {

            const res = await Axios.post('http://localhost:8080/creategroup',
                { groupname: "" + groupname + "" });
            //   {groupname:""+groupname+"", groupdesc:""+groupdesc+""});
            //const email = res.data.email;
            console.log("Create group response" + res.data.groupcount);

            if (res.data.groupcount != 0) {
                alert("Group " + groupname + " already exist - please choose another name");
            } else {
                Axios.get('http://localhost:8080/listgroup')
                .then((response)=>{
                const data = response.data;
                setGroupListOption(data);
                }).catch((err)=>{});
                 
            }
            window.location.reload()

        } catch (e) {
            console.error("Create groupname error - " + e.message);
        }
        //console.log("res " +res)
    }
    

    return (
        <div>
            <header className='Header'>
                <h1>Welcome <strong>{logged}</strong> </h1>
                <h3>
                    <Button onClick={goMain}>Previous Page</Button>
                   <LogOut/>
                    <Button onClick={setAdmin}>Set Admin </Button>
                </h3>
            </header>
            <div>
                <h1>Group Management </h1>
            </div>
            <h3>Current Groups</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)", }}>
            {showgroups.split(" ").map((group)=>{
                
                    return(
                        
                        
                        
                        <div key={group} style={{border:"1px solid #000"}}>
                            {group}
                        </div>
                        
                    )
                
               
            })}
            </div>
            <div >
                <form onSubmit={(e) => { handCreateGroup(e) }}>
                    <h3>Create new Group</h3>
                    <label>New Group Name:</label><br />
                    <input type="text" value={groupname} required onChange={(e) => { handleGroupNameChange(e) }} />
                    <br />

                    <input type="submit" value="Create Group" />

                </form>

       
           
            <div>

            <h4>Edit Groupmember</h4>
            <form onSubmit={(e) => {handleGroupEdit(e)}}>
            <label> Enter group from the list above to edit or check groupmembers </label>
            <input type="text" value={groupedit} required onChange={(e) => { handleGroupEditChange(e) }} />
            <input type="submit" value="Edit Group" />
                    
            </form>

         
           
                   
                   
                    
                   
                    <div>
                        {groupmembersresult}
                        
   
                      
                    </div>
                 
                
            </div>
          

            </div>
            
            


           

        </div>
    );
}

export default GroupMgt;
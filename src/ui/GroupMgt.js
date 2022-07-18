import { useEffect, useState } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

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

    const [assigngroup, setAssignGroup] = useState('');
    const [assignusertogroup, setAssignUserToGroup] = useState();

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


   

    const [roleresult, setRoleresult] = useState();

    const LogOutUser = () => {
        alert("You are logged out");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("admin");
        window.localStorage.removeItem("group");
        navigate('../login')
    }

    const setAdmin = () => {
       
        navigate('../groupadmin')
    }

    useEffect( async() => {

        if (logged == null) {
            navigate('../login')
        }
        if (admin === 0) {
            navigate('../login')
        }

        setGroupMembersResult('')


// put back asyc after groupnames show undefined
    const res = await Axios.post('http://localhost:8080/listgroup',
        { groupname: null });

     const data = res.data;

    console.log("Query group response "+ res.data);
          
   const size = res.data.length;

   //curgrouplist = "{"
    for ( var i=0; i<size; i++){
      
             curgrouplist = curgrouplist+ " " +res.data[i].groupname
    }
     


    console.log("Current group list" +curgrouplist)
    setShowGroups(curgrouplist)

    currgrouplistArr=curgrouplist.split(" ")
    currgrouplistArr.pop()
    console.log("current grouplist array members : " +currgrouplistArr) 
    setGroupListOption(currgrouplistArr)


    
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


   // <input type="text" value={checkgroup} required onChange={(e)=>{handleCheckGroupChange(e)}}/>
    const handleCheckGroupChange=(e)=>{
        setCheckGroup(e.target.value)
    }
    
    const handleGroupEdit = async (e) => {

        alert ("Group selected for edit "+e.target.value)
       
        setGroupEdit(e.target.value)
       

       try {
      
        console.log("Querying team member for group "+groupedit)

        const res = await Axios.post('http://localhost:8080/groupedit', { groupname: "" + groupedit + "" });
        console.log ("After rest call")
    
        const data = res.data;

        console.log("groupedit : "+data)

       // setGroupMembersResult(res.data)
        var groupuserlist =''
       for (var i=0; i<res.data.length; i++){
        console.log(data[i].username)
        groupuserlist=groupuserlist+ data[i].username+ " "
       }


       

    //    for ( var i=0; i<groupuserlist.length; i++){
    //     if (i!=groupuserlist.length){
    //         groupuserlist = groupuserlist+" "+data[i].username + ","
    //     } else {
    //         groupuserlist = groupuserlist+" "+data[i].username+""
    //     }
    //setGroupMembersResult(groupuserlist)
       console.log(groupuserlist)
    setGroupMembersResult(groupuserlist)

     
       //setlist(...list, newItem);
      
       
      
       } catch (e) {
        console.error("Query group error - " + e.message);
    }
    }

    
    const handleGroupToDelete = (event )=>{
        alert ("Group selected "+event.target.value)
        setUnassignGroup(event.target.value);
    }
    const handleDeleteUserToGroup = (event) =>{
        alert ("User selected "+event.target.value)
        setUnassignMember(event.target.value);
    }

    
    const handleGroupAssign = (event )=>{
        alert ("Group selected "+event.target.value)
        setAssignGroup(event.target.value);
    }
    const handleAssignUserToGroup = (event) =>{
        alert ("User selected "+event.target.value)
        setAssignUserToGroup(event.target.value);
    }
   
    const handleAdminGpRemoveChange = (event) => {
        setRemoveAdminGroup(event.target.value);
        console.log("Handle group query " + querygroup)

    }

    const handleUserNameAdminRemoveChange = (event) => {
        setRemoveAdminUserName(event.target.value);
        console.log("Handle group query " + querygroup)

    }

   


    const handleGroupQueryChange = (event) => {
        setQueryGroup(event.target.value);

    }

    const handleGroupNameChange = (event) => {
        setGroupname(event.target.value);

    }


    // const handleGroupUnAssign = (event) => {
    //     alert(event.target.value)
    //     setAssignGroup(event.target.value);

    // }
    

    const handleGroupUnAssign = (event) => {
        console.log("group unassign " + event.target.value)
        setUnassignGroup(event.target.value);

    }

    const handleUserNameChangeUnassign = (event) => {
        setUnassignMember(event.target.value);

    }




    const handleUserRolesQueryChange = async (e) => {
        setRoleUsername(e.target.value);

    }

    const handleGroupRolesQueryChange = async (e) => {
        setRolegroupname(e.target.value);
    }

    const handGroupAdmin = async (e) => {

        alert("Updating  " + username + " to admin status")
        console.log(" " + unassigngroup + " " + unassignmember)
    }

    const handUpdateGroupUnassign = async (e) => {
        e.preventDefault();
        var groupmembers = "";
        //  window.localStorage.setItem("groupquery", querygroup);

        try {

            alert("Removing from  group " + unassigngroup + " username " + unassignmember)
            console.log(" " + unassigngroup  + " " + unassignmember  )

            const res = await Axios.post('http://localhost:8080/groupremove',
                { groupname: "" + unassigngroup + "", username: "" + unassignmember + "" });

            console.log("Query group response " + res.data);

            const size = res.data.length;


            for (var i = 0; i < size-1; i++) {
                groupmembers = groupmembers + res.data[i].username + " \n"

            }

           
           

        } catch (e) {
            console.error("Query group error - " + e.message);
        }
    }
 
    const goMain = () => {

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

    const handQueryGroup = async (e) => {
        e.preventDefault();
        try {
            
            alert(querygroup)
            var groupmembers = "";
            alert("handQueryGroup")
            const res = await Axios.post('http://localhost:8080/groupmembers',
                { groupname: "" + querygroup + "" });
           
            const size = res.data.length;
            
            for (var i = 0; i < size-1; i++) {
                groupmembers = groupmembers + res.data[i].username + " \n"

            }

          
        
           

        } catch (e) {
            console.error("Query group error - " + e.message);
        }


        
        
    }

    const handUserRolesQuery = async (e) => {
        e.preventDefault();

        try {

            const res = await Axios.post('http://localhost:8080/grouprole',
                { groupname: "" + rolegroupname + "", username: "" + roleusername + "" });
            //   {groupname:""+groupname+"", groupdesc:""+groupdesc+""});
            //const email = res.data.email;
            try {

                setRoleresult("User " + roleusername + " in group " + rolegroupname + " has role of " + res.data[0].group_role)

            } catch (e) {
                setRoleresult("Cannot find role for user " + roleusername + " in " + rolegroupname)
            }





        } catch (e) {
            console.error("Check user group  error - " + e.message);
        }
    }
    const handCreateGroup = async (e) => {
        e.preventDefault();
        alert(" current grouplist " + group)
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


        } catch (e) {
            console.error("Create groupname error - " + e.message);
        }
        //console.log("res " +res)
    }
    const handUpdateGroup = async (e) => {
        var assignUser = true;
        var assignGp = true;
        alert("Updating " + assignusertogroup + " to group " + assigngroup)
        // check if username exist
        try {
            const res = await Axios.post('http://localhost:8080/userexist',
                { username: "" + assignusertogroup + "" });
            console.log("Create group response" + res.data.usercount);
            //  alert("user count " +res.data.usercount)

            if (res.data.usercount == 0) {
                alert("Cannot assign user to group " + assigngroup + " user " + username + " does not exist")
                assignUser = false
            }
        } catch (e) {
            console.error("Create groupname error - " + e.message);
        }

        try {
            const res = await Axios.post('http://localhost:8080/groupexist',
                { groupname: "" + assigngroup + "" });
            // console.log("Group" +assignGp+ " exist " +res.data.usercount);


            if (res.data.groupcount == 0) {
                alert("Cannot assign user to group " + assigngroup + " group " + assigngroup + " does not exist")
                assignGp = false
            }
        } catch (e) {
            console.error("Create groupname error - " + e.message);
        }



        if (assignUser && assignGp) {
            try {
                const res = await Axios.post('http://localhost:8080/groupassign',

                    { groupname: "" + assigngroup + "", username: "" + assignusertogroup + "", role: "" + isAdmin + "" });
                    console.log(1,assigngroup)
                    console.log(2,assignusertogroup )
                    console.log("Create group assignment response - duplicate member" + res.data.duplicate_member);

                if (res.data.duplicate_member != 0) {
                    alert("Username " + username + " is already in " + assigngroup);
                }
            } catch (e) {
                console.error("Create groupname error - " + e.message);
            }
        }

        ///

    }

   




    const handleAdminRemoveGroup = async (e) => {
        try {
            const res = await Axios.post('http://localhost:8080/groupadminremove',

                { groupname: "" + removeAdmingroup + "", username: "" + removeAdminUserName + "" });
            console.log("Remove admin to - user " + removeAdminUserName + " in group " + removeAdminUserName);


        } catch (e) {
            console.error("error in removing user as admin - " + e.message);
        }
    }

    const handleAdminGroupChange = async (e) => {
        setAssignAdminGroup(e.target.value);
    }
    const handleUserNameAdminChange = async (e) => {
        setAdminUserName(e.target.value)
    }

    return (
        <div>
            <header className='Header'>
                <h1>Welcome {logged} </h1>
                <h3>
                    <Button onClick={goMain}>Previous Page</Button>
                    <Button onClick={LogOutUser}>Logout {logged}</Button>
                    <Button onClick={setAdmin}>Set Admin </Button>
                </h3>
            </header>
            <div>
                <h1>Group Management </h1>
            </div>
            <div>
           
            </div>
            <div >
                <form onSubmit={(e) => { handCreateGroup(e) }}>
                    <h3>Create new Group</h3>
                    <label>New Group Name:</label><br />
                    <input type="text" value={groupname} required onChange={(e) => { handleGroupNameChange(e) }} />
                    <br />

                    <input type="submit" value="Create Group" />

                </form>



                
            <h4> Current Groups</h4>

            {showgroups}

            <h4> Current users</h4>
            {showusers}
            <div>

           <h4> Check user in group</h4>
            <Select
                        value={groupedit}
                        onChange={handleGroupEdit}
                        input={<OutlinedInput label="Group" />}
                             >
                        {grouplistoption.map((groupname) => (
                        <MenuItem
                        key={groupname}
                        value={groupname}  >
                       {groupname}
                        </MenuItem>
 
                        ))}
                    </Select>
                   
                   
                    
                   
                    <div>
                        {groupmembersresult}
                        
                        <div>
                            <div>
                           
        
    
                            </div>
                            <div>
                            <ul>
       
      </ul>
                            </div>
                        <ul>
       
      </ul>

                        </div>
                        <ul>
       
      </ul>
                    </div>
                 
                
            </div>
            <form onSubmit={(e) => { handUpdateGroup(e) }}>
                < h3 >Assign to Group </h3>
                <FormControl sx={{ m: 1, minWidth: 90, minHeight:70
                 }} size="small">
                    <label>Select Group</label>
                <Select
       
                  value={assigngroup}
                onChange={handleGroupAssign}
                    input={<OutlinedInput label="Group" />}
          
                 >
                  {grouplistoption.map((groupname) => (
                <MenuItem
                key={groupname}
                value={groupname}  >
              {groupname}
            </MenuItem>
         
            
          ))}
        </Select>
        
                
            <label>Select User</label>
                <Select 
                value ={assignusertogroup}
                onChange = {handleAssignUserToGroup}
                input={<OutlinedInput label="User to assign to group" />}>
                {userlistoption.map((user) => (
                <MenuItem
                key={user.username}
                value={user.username}  >
              {user.username}
            </MenuItem>
          
          ))}
               </Select>
               <input type="submit" value="Assign User" />
               </FormControl>
            
                </form>

            </div>
            <div>
                <form onSubmit={(e) => { handUpdateGroupUnassign(e) }}>

                <FormControl sx={{ m: 1, minWidth: 90, minHeight:70
                 }} size="small">
                
                
                <h3>Remove User from Group</h3>
                <label>Select Group</label>
                <Select
                        value={unassigngroup}
                onChange={handleGroupToDelete}
                        input={<OutlinedInput label="Group" />}
                             >
                        {grouplistoption.map((groupname) => (
                        <MenuItem
                        key={groupname}
                        value={groupname}  >
                       {groupname}
                        </MenuItem>
 
                        ))}
                    </Select>
                    

                    <label>Select User</label>
                    <Select 
                value ={assignusertogroup}
                onChange = {handleDeleteUserToGroup}
                input={<OutlinedInput label="User to assign to group" />}>

{userlistoption.map((user) => (
                <MenuItem
                key={user.username}
                value={user.username}  >
              {user.username}
            </MenuItem>
          
          ))}
               </Select>
                    <input type="submit" value="Unassign User" />
                    </FormControl>
                </form>
               
               
            </div>
            


           

        </div>
    );
}

export default GroupMgt;
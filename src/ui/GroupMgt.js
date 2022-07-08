import { useEffect, useState } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
function GroupMgt() {

    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    var group = window.localStorage.getItem("group");
    var groupnames = ''
    console.log(logged);
    console.log("admin right " + admin);

    const [username, setUsername] = useState('');
    const [groupname, setGroupname] = useState('');

    const [assigngroup, setAssignGroup] = useState('');
    const [querygroup, setQueryGroup] = useState('');
    const [grouplistresult, setGroupListsResult] = useState('');

    const [grouplistoption, setGroupListOption] = useState()
    const [userlistoption, setUserListOption] = useState()

    const [groupmembersresult, setGroupMembersResult] = useState();
    const [unassignmember, setUnassignMember] = useState('');
    const [unassigngroup, setUnassignGroup] = useState('');
    const [isAdmin, setisAdmin] = useState('N');
    const [roleusername, setRoleUsername] = useState();
    const [rolegroupname, setRolegroupname] = useState();
    const [assignadmingroup, setAssignAdminGroup] = useState();
    const [adminUserName, setAdminUserName] = useState();
    const [removeAdmingroup, setRemoveAdminGroup] = useState();
    const [removeAdminUserName, setRemoveAdminUserName] = useState();


    const handleAdminGpRemoveChange = (event) => {
        setRemoveAdminGroup(event.target.value);
        console.log("Handle group query " + querygroup)

    }

    const handleUserNameAdminRemoveChange = (event) => {
        setRemoveAdminUserName(event.target.value);
        console.log("Handle group query " + querygroup)

    }
    /*
    https://stackoverflow.com/questions/52428879/objects-are-not-valid-as-a-react-child-if-you-meant-to-render-a-collection-of-c
 <form onSubmit={(e)=>{handleAdminRemoveGroup(e)}}>
        <h3>Remove Admin Role in Group</h3>
            <label>Group Name:</label>
            <input type="text" value={removeAdmingroup} required onChange={(e)=>{handleAdminGpRemoveChange(e)}}/>
            <br/>
            
            <label>Username :</label>
            <input type="text" value={removeAdminUserName} required onChange={(e)=>{handleUserNameAdminRemoveChange(e)}}/>
            <br/>
            
            <input type="submit" value="Update Admin status"/>
            
        </form>


    */

    const [roleresult, setRoleresult] = useState();

    const LogOutUser = () => {
        alert("You are logged out");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("admin");
        navigate('../login')
    }

    useEffect(async () => {

        if (logged == null) {
            navigate('../login')
        }
        if (admin === 0) {
            navigate('../login')
        }


        const res = await Axios.post('http://localhost:8080/listgroup',
            { groupname: "" + groupnames + "" });

        console.log("Query group response " + res.data);
        const data = res.data;

        const options = data.map(d => ({
            "value": d.value,
            "label": d.label
        }))
        console.log(options)

        setGroupListOption(options)


        const resuser = await Axios.post('http://localhost:8080/listusers');

        console.log("Query group response " + resuser.data);
        const datauser = resuser.data;

        const useroptions = datauser.map(d => ({
            "value": d.value,
            "label": d.label
            
        }))
        console.log(useroptions)

        setUserListOption(useroptions)


        /*
 async getOptions(){
     const res = await axios.get('https://jsonplaceholder.typicode.com/users')
     const data = res.data
 
     const options = data.map(d => ({
       "value" : d.id,
       "label" : d.name
     }))
     this.setState({selectOptions: options})
   }
        */

        // setGroupListsRef(groupnames)
        //     groupnames = "["

        //    for ( var i=0; i<size; i++){
        //     if (i!=size-1){
        //      groupnames =  groupname +res.data[i] +","
        //     } else {
        //         groupnames = groupname +res.data[i]
        //     }
        //    }

        // groupnames = groupnames +"]"


        //  console.log("groupObj  "+ groupObj)

        //    setGroupListsRef(groupnames)
        //    console.log(JSON.stringify(grouplistref))

    }, [])



    const handleGroupQueryChange = (event) => {
        setQueryGroup(event.target.value);
        console.log("Handle group query " + querygroup)

    }

    const handleGroupNameChange = (event) => {
        setGroupname(event.target.value);

    }


    const handleGroupAssign = (event) => {
        setAssignGroup(event.target.value);

    }
    const handleUserNameChange = (event) => {
        setUsername(event.target.value);

    }

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
            console.log(" " + unassigngroup + " " + unassignmember)

            const res = await Axios.post('http://localhost:8080/groupremove',
                { groupname: "" + unassigngroup + "", username: "" + unassignmember + "" });

            console.log("Query group response " + res.data);

            const size = res.data.length;


            for (var i = 0; i < size; i++) {
                groupmembers = groupmembers + res.data[i].username + " \n"

            }

            setGroupMembersResult(groupmembers);

        } catch (e) {
            console.error("Query group error - " + e.message);
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

    const goMain = () => {

        navigate('../main')
    }


    const grouplist = async (e) => {


        //  window.localStorage.setItem("groupquery", querygroup);
        var groupnames = "";
        try {
            alert("group" + querygroup)

            const res = await Axios.post('http://localhost:8080/listgroup',
                { groupname: "" + groupnames + "" });

            console.log("Query group response " + res.data);

            const size = res.data.length;


            for (var i = 0; i < size; i++) {
                groupnames = groupnames + res.data[i].groupname + " \n"

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

        //  window.localStorage.setItem("groupquery", querygroup);

        try {
            alert("group" + querygroup)
            var groupnames = "";
            const res = await Axios.post('http://localhost:8080/listgroup',
                { groupname: "" + querygroup + "" });

            console.log("Query group response " + res.data);

            const size = res.data.length;


            for (var i = 0; i < size; i++) {
                groupnames = groupnames + res.data[i].groupname + " \n"

            }

            setGroupListsResult(groupnames);

            alert(groupnames);

        } catch (e) {
            console.error("Query group error - " + e.message);
        }


        //  alert(data)
        //setMembers(usersFound)
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
                // refresh grouplist option
                    const res = await Axios.post('http://localhost:8080/listgroup',
                     { groupname: "" + groupnames + "" });

                    console.log("Query group response " + res.data);
                    const data = res.data;
                     const options = data.map(d => ({
                        "value": d.value,
                        "label": d.label
                     }))
                     console.log(options)

                  setGroupListOption(options)
            }


        } catch (e) {
            console.error("Create groupname error - " + e.message);
        }
        //console.log("res " +res)
    }
    const handUpdateGroup = async (e) => {
        var assignUser = true;
        var assignGp = true;
        alert("Updating " + username + " to group " + assigngroup)
        // check if username exist
        try {
            const res = await Axios.post('http://localhost:8080/userexist',
                { username: "" + username + "" });
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

                    { groupname: "" + assigngroup + "", username: "" + username + "", role: "" + isAdmin + "" });
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

    const handleAdminUpdateGroup = async (e) => {
        try {
            const res = await Axios.post('http://localhost:8080/groupadminassign',

                { groupname: "" + assignadmingroup + "", username: "" + adminUserName + "" });
            console.log("Assign admin to - user " + adminUserName + " in group " + assignadmingroup);


        } catch (e) {
            console.error("Assign user as admin error - " + e.message);
        }
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
                </h3>
            </header>
            <div>
                <h1>Group Management </h1>
            </div>

            <div>
                <form onSubmit={(e) => { handQueryGroup(e) }}>
                    <h3>Search Group</h3>
                    <label>Group Name:</label><br />
                    <input type="text" value={querygroup} onChange={(e) => { handleGroupQueryChange(e) }} />
                    <br />

                    <input type="submit" value="Query Group" />

                </form>
                <div>
                    {grouplistresult}
                </div>
            </div>

            <div >
                <form onSubmit={(e) => { handCreateGroup(e) }}>
                    <h3>Create new Group</h3>
                    <label>New Group Name:</label><br />
                    <input type="text" value={groupname} required onChange={(e) => { handleGroupNameChange(e) }} />
                    <br />

                    <input type="submit" value="Create Group" />

                </form>
                <form>
                < h3 >Assign to Group </h3>
                <div><label>Select Group</label>
                <Select options={grouplistoption} />
                </div>
                <div><label>Select User</label>
                <Select options={userlistoption} />
                </div>
                </form>

                <form>
                    <h3>Assign Group</h3>
                    <label>Group Name:</label>
                    <input type="text" value={assigngroup} required onChange={(e) => { handleGroupAssign(e) }} />
                    <br />

                    <label>Username :</label>
                    <input type="text" value={username} required onChange={(e) => { handleUserNameChange(e) }} />
                    <br />



                    <input type="submit" value="Update Group" />

                </form>

            </div>
            <div>
                <form onSubmit={(e) => { handleAdminUpdateGroup(e) }}>
                    <h3>Assign Admin Role in Group</h3>
                    <label>Group Name:</label>
                    <input type="text" value={assignadmingroup} required onChange={(e) => { handleAdminGroupChange(e) }} />
                    <br />

                    <label>Username :</label>
                    <input type="text" value={adminUserName} required onChange={(e) => { handleUserNameAdminChange(e) }} />
                    <br />

                    <input type="submit" value="Update Admin status" />

                </form>
            </div>
            <div>
                <form onSubmit={(e) => { handleAdminRemoveGroup(e) }}>
                    <h3>Remove Admin Role in Group</h3>
                    <label>Group Name:</label>
                    <input type="text" value={removeAdmingroup} required onChange={(e) => { handleAdminGpRemoveChange(e) }} />
                    <br />

                    <label>Username :</label>
                    <input type="text" value={removeAdminUserName} required onChange={(e) => { handleUserNameAdminRemoveChange(e) }} />
                    <br />

                    <input type="submit" value="Update Admin status" />

                </form>

            </div>


            <div >
                <form onSubmit={(e) => { handUpdateGroupUnassign(e) }}>
                    <h3>Remove Group Assignment </h3>
                    <label>Group Name:</label>
                    <input type="text" value={unassigngroup} required onChange={(e) => { handleGroupUnAssign(e) }} />

                    <br />
                    <label>Username :</label>
                    <input type="text" value={unassignmember} required onChange={(e) => { handleUserNameChangeUnassign(e) }} />

                    <br />
                    <input type="submit" value="Update Group" />

                </form>
            </div>

        </div>
    );
}

export default GroupMgt;
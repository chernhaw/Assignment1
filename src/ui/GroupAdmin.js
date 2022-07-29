import { useEffect, useState } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import LogOut from './Logout';

function GroupAdmin() {



    var adminnames=""
    const [usernameAdmin, setusernameAdmin] = useState('');

    const [usernameAdminunassign, setUsernameAdminunassign] = useState('')

   
    const [adminListOption, setAdminListOption]= useState('');
    
    const [userlistoption, setUserListOption] = useState([])

    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");

   
    useEffect(() => {
        setTimeout(refresh, 500)
       
        if (logged == null) {

           

            navigate('../login')
        }
        if (admin === 0) {
          
            navigate('../login')
        } 


        Axios.post('http://localhost:8080/listusers')
        .then((response)=>{
        const data = response.data;
        setUserListOption(data);
        }).catch((err)=>{});
    
       
        
        Axios.get('http://localhost:8080/listadminusers')
        .then((response)=>{
        const data = response.data;
            var admin
        const size = data.length;
        console.log("data" +data)
       // console.log("data" +data[0].username)
        
        console.log("data size " +size)
        if (size===0){
            adminnames = "No admin users found"
        }
        
         for ( var i=0; i<size; i++){
              
           
                adminnames = adminnames+" "+data[i].username + " "
                console.log("adminnames[" +i+ "]" + adminnames)
                
               
            }


    
        console.log("final adminnames " +adminnames)
        setAdminListOption(adminnames);
        }).catch((err)=>{});
    
        }, [])

       
   
        const goMain = () => {
            var refresh="true"
            window.localStorage.setItem("refresh", refresh )

            navigate('../main')
        }
 


        function refresh(){
            var refresh = window.localStorage.getItem("refresh")
           // alert("Refresh "+refresh)
            if (refresh=='true'){
            window.location.reload()
            window.localStorage.removeItem("refresh")
            }

        }
        const goGroup = () =>{

              
               navigate('../groupmgt')
              
           }


           const handleAdminUnassignGroup = async (e) => {
           
            if (adminnames.indexOf(usernameAdmin)==-1){
            try {
                const res = await Axios.post('http://localhost:8080/adminunassign',
    
                    {  username: "" + usernameAdminunassign + "" });
               
              //  alert("unassign admin to - user " + usernameAdminunassign )
    
            } catch (e) {
                console.error("unassign user as admin error - " + e.message);
            }
            } else {
                alert ("User must be an admin user")
            }
        }
        
           const handleAdminUpdateGroup = async (e) => {

            var isadmin = false;

            try {
                const res = await Axios.post('http://localhost:8080/admin',
    
                    {  username: "" + usernameAdmin + "" });
                console.log("User ia admin admin " + res.data.rows[0].count );
                if (res.data.rows[0].count!=0){
                    alert( "User is already admin")
                }
                
            } catch (e) {
                console.error("Checking user is admin error - " + e.message);
            }
       

    


            if (!isadmin){
            try {
                const res = await Axios.post('http://localhost:8080/adminassign',
    
                    {  username: "" + usernameAdmin + "" });
                console.log("Assign admin to - user " + usernameAdmin );
    
                
            } catch (e) {
                console.error("Assign user as admin error - " + e.message);
            }
        } else {
            alert ("User is already admin")
        }
        }

        const handleUnAdminNameChange = (event)=>{
            setUsernameAdminunassign(event.target.value)
           
        }

        const handleAdminNameChange = (event)=>{
    
            setusernameAdmin(event.target.value)
        }


    return (
        <div>
            <header className='Header'>
                <h1>Welcome {logged} </h1>
                <h3>
                    <Button onClick={goMain}>Main </Button>
                    <Button onClick={goGroup}>Group Management </Button>
                </h3>
                <LogOut/>
            </header>
            <div>
                <h3>Group Admin </h3>
                <h4>Current Admin Users</h4>
               {adminListOption}
            </div>


            <div>
            <form onSubmit={(e) => { handleAdminUpdateGroup(e) }}>
                    <h4>Assign Admin Role </h4>
                    <label>Select User</label>
                    <Select 
                value ={usernameAdmin}
                onChange = {handleAdminNameChange}
                input={<OutlinedInput label="Assign Admin" />}>

{userlistoption.map((user) => (
                <MenuItem
                key={user.username}
                value={user.username}  >
              {user.username}
            </MenuItem>
          
          ))}
               </Select>

                    <input type="submit" value="Update Admin status" />

                </form>
            </div>
            <div>
            <form onSubmit={(e) => { handleAdminUnassignGroup(e) }}>
                    <h4>Un-Assign Admin Role </h4>
                    <label>Select User to Unassign</label>
                    <Select 
                value ={usernameAdminunassign}
                onChange = {handleUnAdminNameChange}
                input={<OutlinedInput label="Assign Admin" />}>

{userlistoption.map((user) => (
                <MenuItem
                key={user.username}
                value={user.username}  >
              {user.username}
            </MenuItem>
          
          ))}
               </Select>

                    <input type="submit" value="Update Admin status" />

                </form>

            </div>
            </div>

    
    );

}

export default GroupAdmin
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function GroupEdit() {

    
    const [assigngroup, setAssignGroup] = useState('');
    const [assignusertogroup, setAssignUserToGroup] = useState();

    const [groupmembers, setGroupMembers] = useState('');

    const [groupAdmin, setGroupAdmin] = useState('');

    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    var usernames=window.localStorage.getItem("usernames")
    var groupedit = window.localStorage.getItem("groupedit")

    

    const LogOutUser = () => {
        alert("You are logged out");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("admin");
        window.localStorage.removeItem("querygroup");
        navigate('../login')
    }
    useEffect(async () => {

        if (groupedit==null){
            groupedit = window.localStorage.getItem("groupedit")
        }
        if (logged == null) {
            navigate('../login')
        }
        if (admin === 0) {
            navigate('../login')
        } 

        alert ("groupedit "+groupedit)
        Axios.post('http://localhost:8080/groupedit', { groupname: "" + groupedit + "" })
    .then((response)=>{
    const data = response.data;

    setGroupMembers(data);
    }).catch((err)=>{});

    }, [])

    return (
        <div>
            <header className='Header'>
                <h1>Welcome {logged} </h1>
                <h3>
                    
                    <Button onClick={LogOutUser}>Logout {logged}</Button>
                </h3>
            </header>
            <div>
                <h3>Group Edit {groupedit}</h3>
            </div>
                {groupmembers}
            
            </div>

    
    );

}

export default GroupEdit
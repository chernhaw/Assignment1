import {useEffect,useState} from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import './LoginForm.css';
import MainScreen from './MainScreen';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import LogOut from './Logout';

function UserDisableScreen(){
    
    const [ disabledUserList, setDisabledList] = useState('');
    const [userlistoption, setUserListOption] = useState([]);
    const [userlist, setUserList]=useState('')
    const [selectedusertodisable, setSelectedUserToDisable] = useState('');
    const [selectedusertoenable, setSelectedUserEnable] = useState('');
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    
    var profileEmail = window.localStorage.getItem("email");
    var admin = window.localStorage.getItem("admin");
    var curruserlist=""
   
    console.log(logged);
   
    const goUserMgt = () =>{
      
        navigate('../profile')
    }
    

    useEffect(() => {

     
        Axios.post('http://localhost:8080/listusers')
        .then((response)=>{
        const data = response.data;
        const size = data.length
        for ( var i=0; i<size; i++){
       
            curruserlist = curruserlist+ " " +response.data[i].username
            console.log("current user list "+ curruserlist)
         }
         setUserList(curruserlist)
        setUserListOption(data);
        }).catch((err)=>{});



        
        var userlist=""
        Axios.post('http://localhost:8080/listdisabledusers')
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

          setDisabledList(userlist)

        }).catch((err)=>{});
        
       
        if (admin === 0) {
          
            navigate('../login')
        } 
        if (logged==null){
         navigate('../login')   
        }
    },[])

    const handleUserCheckEnable=async(e)=>{
        e.preventDefault();
        console.log("Enable user " +selectedusertoenable);
        alert("Enable user " +selectedusertoenable)
    
        try {

            const res = await Axios.post('http://localhost:8080/activate', 
            {username:""+selectedusertoenable+""});
            console.log("Response length:"+""+res.data+"".length)
            
            if(res.data.username===undefined){
            alert("No user found for "+selectedusertodisable + " ");
            }else {
            console.log(res.data)
            console.log("username "+res.data.username)
            console.log("active "+res.data.active)
            console.log("email "+res.data.email)
            console.log("admin "+res.data.admin)

            
           
            }
         //   if (res.data.username =="undefined"){
            
            // } else {
            //     alert ("No user with "+username+" found")
            // }

    } catch (e){
            console.error("Login function - there was an error extracting email "+e.message);
        }
    }
  

    const handleUserCheckDisable=async(e)=>{
        e.preventDefault();
        console.log("Disable user " +selectedusertodisable);
        alert("Disable user " +selectedusertodisable)
    
        try {

            const res = await Axios.post('http://localhost:8080/deactivate', 
            {username:""+selectedusertodisable+""});
            console.log("Response length:"+""+res.data+"".length)
            
            if(res.data.username===undefined){
            alert("No user found for "+selectedusertodisable + " ");
            }else {
            console.log(res.data)
            console.log("username "+res.data.username)
            console.log("active "+res.data.active)
            console.log("email "+res.data.email)
            console.log("admin "+res.data.admin)
           
            }
        

    } catch (e){
            console.error("Login function - there was an error extracting email "+e.message);
        }
    }
    
 

   

   
    const handleUsernameDisableCheck=(event)=>{
        setSelectedUserToDisable(event.target.value)
        console("name to disable "+ selectedusertodisable)
    }

    const handleUsernameEnableCheck=(event)=>{
       setSelectedUserEnable(event.target.value)
       console("name to disable "+ selectedusertoenable)
       
    }
    

    return (
        <div>
        <header className='Header'> 
        <h1>Welcome {logged} {profileEmail}</h1>


        <h2> 
        
        <Button onClick={goUserMgt}>Previous Screen</Button>
        <LogOut/>
        
        </h2>
         
        </header>
        
        <h1>User Disable/Enable</h1>
          <h4>Disabled list</h4>
        
          
            <div style={{display:"grid",gridTemplateColumns:"repeat(1,1fr)", }}>
            {disabledUserList.split(" ").map((group)=>{
                
                    return(
                        <div key={group} style={{border:"1px solid #000"}}>
                            {group}
                        </div>
                    )
            })}
            </div>    
            
    
        
        <div >
            <br/>
            <form onSubmit={(e)=>{handleUserCheckEnable(e)}}>
            <label> Enter username from the list above to enable user </label> <br/>
            <input type="text" value={selectedusertoenable} required onChange={(e) => { handleUsernameEnableCheck(e) }} />
        <input type="submit" value="Enable User" />
</form>
<h4>Below are the existing usernames </h4>
                      

                        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)", }}>
            {userlist.split(" ").map((group)=>{
                
                    return(
                        
                        
                        
                        <div key={group} style={{border:"1px solid #000"}}>
                            {group}
                        </div>
                        
                    )
                
               
            })}
            </div>
            <br/>
        <form onSubmit={(e)=>{handleUserCheckDisable(e)}}>
            <label> Enter group from the list above to disable user (if they are not in the disabled list) </label>
            <input type="text" value={selectedusertodisable} required onChange={(e) => { handleUsernameDisableCheck(e) }} />
            <input type="submit" value="Disable User" />
        </form>       
        </div>
        </div>
    )
}

export default  UserDisableScreen;
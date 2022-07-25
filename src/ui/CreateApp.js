import {useEffect,useState} from 'react';
import { ReactDOM } from 'react-dom/client';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import './LoginForm.css';
import LogOut from './Logout';

function CreateApp(){

    const [ app_acronym, setApp_acronym] = useState('');
    const [ app_description, setApp_description] = useState('');
    const [ app_rnumber, setApp_rnumbern] = useState('');
    const [ app_start_date, setApp_Start_Date] = useState('');
    const [ app_end_date, setApp_End_Date] = useState('');

    

    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    console.log("Logged" +logged);
    console.log("Admin" +admin);
   
    

    useEffect(() => {


        if (logged==null){
         navigate('../login')   
        }
        // if (admin===0){
        //     navigate('../login')   
        //    }
    },[])

    async function getAllGroup(){
        const res = await Axios.post('http://localhost:8080/listgroup',
            { groupname: null });
    
         const data = res.data;
    
        console.log("Query group response "+ res.data);
              
       const size = res.data.length;
    
      
    }
    
    getAllGroup()

   
    const handleAppAcronym =(e) =>{
        setApp_acronym(e.target.value)
    }

    const handleAppDescription =(e) =>{
        setApp_description(e.target.value)
    }

    const handleAppRnumber=(e)=>{
        setApp_rnumbern(e.target.value)
    }

    const handleAppStartDate=(e)=>{
       
        setApp_Start_Date(""+e.target.value+"")
        console.log("App "+app_acronym+" start date "+ app_start_date)
    }

    const handleAppEndDate=(e)=>{
        setApp_End_Date(""+e.target.value+"")
        console.log("App "+app_acronym+" end date "+ app_end_date)
    }

    const handleCreateApp=async(e)=>{
        e.preventDefault();
       
        console.log("Create app "+app_acronym)
        console.log("app description "+app_description)
        console.log("app start date "+app_start_date)
        console.log("app end date "+app_end_date)

        /*
         const [ app_acronym, setApp_acronym] = useState('');
    const [ app_description, setApp_description] = useState('');
    const [ app_rnumber, setApp_rnumbern] = useState('');
    const [ app_start_date, setApp_Start_Date] = useState('');
    const [ app_end_date, setApp_End_Date] = useState('');
{username:""+usernameusermgt+ "",admin:""+isAdmin+""}

        */
    
        try {

            const res = await Axios.post('http://localhost:8080/createapp', 
            {  app_acronym: "" + app_acronym + "",
            app_description: ""+app_description+"",
            app_rnumber: ""+app_rnumber+"",
            app_start_date: ""+app_start_date+"",
            app_end_date: ""+app_end_date+""

         });
            console.log("Response length:"+""+res.data+"".length)
            
            if(res.data.username===undefined){
            
            }else {
           
      //      navigate('../usermgt');
            }
         //   if (res.data.username =="undefined"){
            
            // } else {
            //     alert ("No user with "+username+" found")
            // }

    } catch (e){
            console.error("Create app function - there was an creating app "+e.message);
        }
    }
  
    return (

    <div>
        <header className='Header'> <h1>Welcome {logged} </h1>
        <LogOut/> </header>
    <div className='Login'>
    <h2>Create new App</h2>
    <div>
    <form onSubmit={(e)=>{handleCreateApp(e)}}>
    <label>App Acronym :</label>
    <input type="text" value={app_acronym} required onChange={(e) => { handleAppAcronym(e) }} />
    
    <br /><br/>
    <label>App Description :</label>
    <input type="text" value={app_description} required onChange={(e) => { handleAppDescription(e) }} />
    <br /><br/>
    <label>App R number :</label>
    <input type="text" value={app_rnumber} required onChange={(e) => { handleAppRnumber(e) }} />
    <br /><br/>
    <label>App start date :</label>
    <input type="date" value={app_start_date} required onChange={(e) => { handleAppStartDate(e) }} />
    <br/><br/>
    <label>App end date :</label>
    <input type="date" value={app_end_date} required onChange={(e) => { handleAppEndDate(e) }} />
    <br/>
    <input type="submit" value="Create App"/>
    </form>
    </div>
    </div>
    
    </div>
   
);
 }

 export default CreateApp;
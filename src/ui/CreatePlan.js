import {useEffect,useState} from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import './LoginForm.css';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import LogOut from './Logout';

function CreatePlan(){

    const [applistresult, setAppListsResult] = useState([]);
    
    const [ app_acronym, setApp_acronym] = useState('');
    const [plan_mvp_name, setPlan_MVP_Name]=useState('');
   
    const [ plan_start_date, setPlan_Start_Date] = useState('');
    const [ plan_end_date, setPlan_End_Date] = useState('');

    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    console.log("Logged" +logged);
    console.log("Admin" +admin);
   
    useEffect(() => {

        if (logged==null){
         navigate('../login')   
        }

        async function getAllApp(){
            const res = await Axios.post('http://localhost:8080/listapp');
        
             const data = res.data;
        
            console.log("Current app list" +data)
            setAppListsResult(data)
        }
        
        getAllApp()
        
    },[])

    const handlePlanMVPNameChange=(event)=>{
        setPlan_MVP_Name(event.target.value)
    }
  
    const handleAppAcronym=(event)=>{
        setApp_acronym(event.target.value)
    }


    const handlePlanStartDate=(e)=>{
       
        setPlan_Start_Date(""+e.target.value+"")
        console.log("App "+app_acronym+" start date "+ plan_start_date)
    }

    const handlePlanEndDate=(e)=>{
        setPlan_End_Date(""+e.target.value+"")
        console.log("App "+app_acronym+" end date "+ plan_end_date)
    }

    const handleCreatePlan=async(e)=>{
        e.preventDefault();
        
        console.log("Create plan for  "+app_acronym)
        console.log("plan start date "+plan_start_date)
        console.log("plan end date "+plan_end_date)
    
        try {

            const res = await Axios.post('http://localhost:8080/checkplan', 
            {  app_acronym: "" + app_acronym + "",
            plan_mvp_name: ""+plan_mvp_name+"",
         });
            console.log("Duplicate " +res.data[0].duplicate)
            
            if(res.data[0].duplicate==0){

        const res = await Axios.post('http://localhost:8080/createplan', 
            {  app_acronym: "" + app_acronym + "",
            plan_mvp_name: ""+plan_mvp_name+"",
            plan_start_date: ""+plan_start_date+"",
            plan_end_date: ""+plan_end_date+""
         });
               
            }else {
           
                alert("Plan with same name found - "+plan_mvp_name+", please use another name")
            
            }
        

    } catch (e){
            console.error("Create plan function - there was error "+e.message);
        }
    }
  
    return (

    <div>
        <header className='Header'> <h1>Welcome {logged} </h1>
        <LogOut/> </header>
    <div className='Login'>
    <h2>Create new Plan</h2>
    <div>
    <form onSubmit={(e)=>{handleCreatePlan(e)}}>
    
    <label>Select App for Plan</label>
                <Select 
                value ={app_acronym}
                onChange = {handleAppAcronym}
                input={<OutlinedInput label="User to Check" />}>
                {applistresult.map((app) => (
                <MenuItem
                key={app.app_acronym}
                value={app.app_acronym }>
              {app.app_acronym}
            </MenuItem>
          
          ))}
               </Select>
    
    <br /><br/>
    <label>App Acronym : {app_acronym}</label> <br/><br/>
    <label>Plan MVP name :</label>
    <input type="text" value={plan_mvp_name} required onChange={(e) => { handlePlanMVPNameChange(e) }} />
    <br /><br/>
    <label>Plan start date :</label>
    <input type="date" value={plan_start_date}  onChange={(e) => { handlePlanStartDate(e) }} />
    <br/><br/>
    <label>Plan end date :</label>
    <input type="date" value={plan_end_date} onChange={(e) => { handlePlanEndDate(e) }} />
    <br/>
    <input type="submit" value="Create Plan"/>
    </form>
    </div>
    </div>
    </div>
   
);
 }

 export default CreatePlan
import {useEffect,useState} from 'react';
import { ReactDOM } from 'react-dom/client';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import './LoginForm.css';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import LogOut from './Logout';

function EditPlan(){

    const [planListresult, setPlanListsResult] = useState([]);
    const [plan_app_acronym, setPlan_App_Acronym] = useState();
    
    
    const [plan_mvp_name, setPlan_MVP_Name]=useState('');
   
    const [ plan_start_date, setPlan_Start_Date] = useState('');
    const [ plan_end_date, setPlan_End_Date] = useState('');

    const [app_acronym, setAppAcronym] = useState('')
  //  const [grouplistresult, setGroupListsResult] = useState([]);

 
    
   
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    console.log("Logged" +logged);
    console.log("Admin" +admin);
   
    useEffect(() => {

        if (logged==null){
         navigate('../login')   
        }

        async function getAllPlans(){
            const res = await Axios.post('http://localhost:8080/listplans');
        
             const data = res.data;
        
            console.log("Current plans list" +data)
            setPlanListsResult(data)
        }
        
        getAllPlans()
        
    },[])

   
  const handlePlan=(e)=>{
    setPlan_App_Acronym(e.target.value)



  }
    


    const handlePlanStartDate=(e)=>{
       
        setPlan_Start_Date(""+e.target.value+"")
        console.log("Plan"+plan_app_acronym+" start date updated "+ plan_start_date)
    }

    const handlePlanEndDate=(e)=>{
        setPlan_End_Date(""+e.target.value+"")
        console.log("Plan"+plan_app_acronym+" end date updated "+ plan_end_date)
    }

    const handleUpdatePlan=async(e)=>{
      e.preventDefault();
      try{
        const res = await Axios.post('http://localhost:8080/updateplan', 
        {  
        plan_app_acronym: ""+plan_app_acronym+"",
        plan_start_date: ""+plan_start_date+"",
        plan_end_date: ""+plan_end_date+""
     });
      } catch (e){
        console.error("update plan function - there was error "+e.message);
      }
    
    }

    const handlePlanRetrieve=async(e)=>{
        e.preventDefault();
       
        console.log("Query app "+plan_app_acronym)
    
        
        try {

            const res = await Axios.post('http://localhost:8080/retrieveplan', 
            {  plan_app_acronym: "" + plan_app_acronym + ""});
            console.log("Response length:"+""+res.data+"".length)
            
            const data = res.data


                console.log("plan_app_acronym "+data[0].plan_app_acronym);
                console.log("plan_mvp_name "+data[0].plan_mvp_name);
                console.log("plan_start_date "+data[0].plan_start_date);
                console.log("plan_end_date "+data[0].plan_end_date);

                setPlan_App_Acronym(data[0].plan_app_acronym);
                setPlan_MVP_Name(data[0].plan_mvp_name);
                setPlan_Start_Date(data[0].plan_startdate);
                setPlan_End_Date(data[0].plan_enddate);    
                 


    } catch (e){
            console.error("Checking app function - there was error getting information "+e.message);
        }
    }

  
    return (

    <div>
        <header className='Header'> <h1>Welcome {logged} </h1>
        <LogOut/> </header>
    <div className='Login'>
    <h2>Edit Plan</h2>
    <div>
    <form onSubmit={(e)=>{handlePlanRetrieve(e)}}>
    
    <label>Select Plan to Edit </label>
                <Select 
                value ={plan_app_acronym}
                onChange = {handlePlan}
                input={<OutlinedInput label="User to Check" />}>
                {planListresult.map((plan) => (
                <MenuItem
                key={plan.plan_app_acronym}
                value={plan.plan_app_acronym }>
              {plan.plan_app_acronym}
            </MenuItem>
          
          ))}
               </Select>

               <input type="submit" value="Retrieve Plan" />
    </form>
    <br /><br/>
   <form onSubmit={(e)=>{handleUpdatePlan(e)}}>
    <label>Plan App Acronym : {plan_app_acronym} </label>
    <br /><br/>
    <label>Current plan start date : {plan_start_date.split('T')[0]}</label><br/>
    <label>New plan start date :</label>
    <input type="date" value={plan_start_date}  onChange={(e) => { handlePlanStartDate(e) }} />
    <br/><br/>
    <label>Current plan start date : {plan_end_date.split('T')[0]}</label><br/>
    <label>New plan end date :</label>
    <input type="date" value={plan_end_date} onChange={(e) => { handlePlanEndDate(e) }} />
    <br/>
    <input type="submit" value="Update Plan"/>
    </form>
    </div>
    </div>
    </div>
   
);
 }
 export default EditPlan;
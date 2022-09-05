import {useEffect,useState} from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import './LoginForm.css';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import LogOut from './Logout';
import GoMain from './GoMain';
import Button from '@mui/material/Button';

function CreatePlan(){

    const [applistresult, setAppListsResult] = useState([]);
    
    const [ app_acronym, setApp_acronym] = useState('');
    const [plan_mvp_name, setPlan_MVP_Name]=useState('');
   
    const [ plan_start_date, setPlan_Start_Date] = useState('');
    const [ plan_end_date, setPlan_End_Date] = useState('');
    const [hasAccess, setHasAccess]=useState()

    const [readOnly, setReadOnly]=useState()

    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    console.log("Logged" +logged);
    console.log("Admin" +admin);
   
    useEffect(() => {

        setHasAccess(false)
        setReadOnly(false)

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

    const goMain = () => {
        var refresh="true"
        window.localStorage.setItem("refresh", refresh )
  
        navigate('../main')
    }

    const handlePlanMVPNameChange=(event)=>{
        setPlan_MVP_Name(event.target.value)
    }
  
    const handleAppAcronym=async(event)=>{
        setApp_acronym(event.target.value)

        const res2 = await Axios.post('http://localhost:8080/planaccess', {  app_acronym: "" + event.target.value + ""});
         
        var data = res2.data
        var access_member_str=""
        console.log("Users able to change update this state : ")
        
        for (var i=0; i<data.length; i++){
          console.log(data[i].username)
          access_member_str= access_member_str + "" +data[i].username + " "
          
        }

        if (access_member_str.indexOf(logged)!=-1){
              console.log("Granting access "+logged)
              setHasAccess(true)
             
        } else {
          setHasAccess(false)
        }


       


    }

    const handlePlanStartDate=(e)=>{
       
        setPlan_Start_Date(""+e.target.value+"")
        console.log("App "+app_acronym+" start date "+ plan_start_date)
    }

    const handlePlanEndDate=(e)=>{
        setPlan_End_Date(""+e.target.value+"")
        console.log("App "+app_acronym+" end date "+ plan_end_date)
    }

    const anotherPlan = () =>{
        setPlan_MVP_Name("")
        setPlan_Start_Date("")
        setPlan_End_Date("")
        setReadOnly(false)
    }


    const handleCreatePlan=async(e)=>{
        e.preventDefault();
        var proceed = true

        console.log(plan_mvp_name)
        console.log("length "+plan_mvp_name.length)
        if (plan_mvp_name.length>40){
            proceed = false
            alert("Plan name must be less than 40 chars")
        }


       

        setReadOnly(true)

        if(proceed){
        console.log("Create plan for  "+app_acronym)
        console.log("plan start date "+plan_start_date)
        console.log("plan end date "+plan_end_date)
    
        try {

            const res = await Axios.post('http://localhost:8080/checkplan', 
            {  app_acronym: "" + app_acronym.replace("^","'") + "",
            plan_mvp_name: ""+plan_mvp_name.replace("^","'")+"",
         });
            console.log("Duplicate " +res.data[0].duplicate)
            
            if(res.data[0].duplicate==0){


        var app_acronymStr = "" + app_acronym + "".replace("'","^")

        const res = await Axios.post('http://localhost:8080/createplan', 
            {  app_acronym: "" + app_acronymStr + "",
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
    }
  
    return (

    <div>
        <header className='Header'> <h1>Welcome {logged} </h1>
        <LogOut/> <GoMain/> </header>
    <div className='Login'>
    <h2>Create new Plan</h2>
    <div>
    
    
    <label>Select App for Plan</label>
                <Select 
                value ={app_acronym}
                onChange = {handleAppAcronym}
                input={<OutlinedInput label="User to Check" />}>
                {applistresult.map((app) => (
                <MenuItem
                key={app.app_acronym}
                value={app.app_acronym }>
              {app.app_acronym.replace("^","'")}
            </MenuItem>
          
          ))}
               </Select>
    
    <br />
    {!hasAccess && <div>{app_acronym.replace("^","'")} : You do not have right to create plan </div>} 
    {hasAccess && 
    <div>
    <form onSubmit={(e)=>{handleCreatePlan(e)}}>
        <br/>
    <label>App Acronym : {app_acronym.replace("^","'")}</label> <br/><br/>
    <label>Plan MVP name :</label>
    <input type="text" value={plan_mvp_name.replace("^","'")} required onChange={(e) => { handlePlanMVPNameChange(e) }} />
    <br /><br/>
    <label>Plan start date :</label>
    <input type="date" value={plan_start_date} required onChange={(e) => { handlePlanStartDate(e) }} />
    <br/><br/>
    <label>Plan end date :</label>
    <input type="date" value={plan_end_date} required onChange={(e) => { handlePlanEndDate(e) }} />
    <br/>
    <div>{!readOnly&&<div><input type="submit" value="Create Plan"/></div>}</div>
    
    <div>{readOnly&&<div>Plan created - please go to Main Kanban Board access the Kanban for App <GoMain/></div>}</div>
    </form>
`   </div>}
    </div>
    <br/>
    </div>
    </div>
);
 }

 export default CreatePlan
import {useEffect,useState} from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import './LoginForm.css';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import LogOut from './Logout';
import GoMain from './GoMain';

function CreatePlan(){

    const [applistresult, setAppListsResult] = useState([]);
    
    const [ app_acronym, setApp_acronym] = useState('');
    const [plan_mvp_name, setPlan_MVP_Name]=useState('');
   
    const [ plan_start_date, setPlan_Start_Date] = useState('');
    const [ plan_end_date, setPlan_End_Date] = useState('');
    const [hasAccess, setHasAccess]=useState()

    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    console.log("Logged" +logged);
    console.log("Admin" +admin);
   
    useEffect(() => {

        setHasAccess(false)
       

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

        const res2 = await Axios.post('http://localhost:8080/taskaccess',{app_acronym:""+event.target.value+"", access_type:"Todo"});
         
        var accessData = res2.data
        var access_member_str=""
        console.log("Users able to change update this state : ")
        
        for (var i=0; i<accessData.length; i++){
          console.log(accessData[i].access)
          access_member_str= access_member_str + accessData[i].access + " "
          
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
              {app.app_acronym}
            </MenuItem>
          
          ))}
               </Select>
    
    <br />
    {!hasAccess && <div>{app_acronym} : You do not have right to create plan </div>} 
    {hasAccess && 
    <div>
    <form onSubmit={(e)=>{handleCreatePlan(e)}}>
        <br/>
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
    <br/>
    <input type="submit" value="Create Plan"/>
    </form>
`   </div>}

    </div>
    <br/>
    <br/>
    <button onClick={goMain}>Main Kanban Board</button>
    </div>
    </div>
   
);
 }

 export default CreatePlan
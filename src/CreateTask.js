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
import GoMain from './GoMain';

function CreateTask(){

    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    console.log("Logged" +logged);
    console.log("Admin" +admin);

    const [applistresult, setAppListsResult] = useState([]);
    const [planlistresult, setPlanListsResult] = useState([]);

    const [taskdescription, setTaskDescription]=useState();
    const [taskNotes, setTaskNotes] = useState();
    const [taskplan, setTaskPlan] = useState();
    const [taskName, setTaskName] = useState();
    const [app_acronym, setApp_acronym] = useState('');
    const [hasAccess, setHasAccess]=useState()

    var noOfTask = 0
   
    useEffect(() => {

        if (logged==null){
         navigate('../login')   
        }

        async function getAllApp(){
            const res = await Axios.post('http://localhost:8080/listapp');
        
             var data = res.data;
        
            console.log("Current app list" +data)
            setAppListsResult(data)
        }
        
      
        // get all plans

        async function getAllPlans(){
            const res = await Axios.post('http://localhost:8080/listplans');
        
            var data = res.data
            console.log("Current plan list ->" +data[0].plan_app_acronym)

           //  // data.push({ 'plan_app_acronym': 'none' })({ 'plan_app_acronym': 'none' })
          //  console.log("Current plan list" +data[0].object.)
            
            var none = { 'plan_app_acronym': 'none' }
            data.push(none)
            setPlanListsResult(data)
        }
        
        
        getAllApp()
        getAllPlans()
        setTaskNotes("")
       
        
    },[])

    const handleTaskNoteChange=(event)=>{

       
          var notes = ""+event.target.value+""
          console.log("Task notes "+notes)
          if (notes === undefined){
            setTaskNotes(" ")
          } else {
            setTaskNotes(event.target.value)
          }
        
          
    }

    const goMain = () => {
      var refresh="true"
      window.localStorage.setItem("refresh", refresh )

      navigate('../main')
  }

    const handleAppAcronym=async(event)=>{

       
      lasttaskid(event.target.value)
       
        setApp_acronym(event.target.value)
        // check permission to create task

      

        const res2 = await Axios.post('http://localhost:8080/taskaccess',{app_acronym:""+event.target.value+"", access_type:"Create"});
         
        var accessData = res2.data
        var access_member_str=""
        console.log("Users able to change update this state : ")
        
        for (var i=0; i<accessData.length; i++){
          console.log(accessData[i].access)
          access_member_str= access_member_str + accessData[i].access + " "
          
        }

        if (access_member_str.indexOf(logged+" ")!=-1){
              console.log("Granting access "+logged)
              setHasAccess(true)
             
        } else {
          setHasAccess(false)
        }
       
        
    }

    const handleTaskPlan=(event)=>{
        setTaskPlan(event.target.value)
    }

    const handleTaskNameChange=(event)=>{

        if (""+event.target.value+"".length >100){
          alert("Task name must be less than 100 characters")
        } else {
        setTaskName(event.target.value)
        }
    }

    const handleTaskDescriptionChange=(event)=>{
    setTaskDescription(event.target.value)
    }

    
    async function lasttaskid(app_acronym){
     
        console.log("Count for app "+app_acronym)
        try {
            const res = await Axios.post('http://localhost:8080/apptaskid', 
            {  app_acronym: "" + app_acronym + "" });
           
            var length = res.data.length

            for (var i=0; i<length-1; i++){
                console.log(res.data[i].task_id)
               
            }
              
        } catch (e){
           console.error("Create task function - there was error "+e.message);
        }

    }
    const handleCreateTask=async(event)=>{

        var proceedToCreate = true
        event.preventDefault();

        if (taskName.length>100){
          var proceedToCreate = false

        alert("Task name must be less than 100 chars")
      }

      if(proceedToCreate){
       
        console.log("Task notes "+taskNotes)
     
        setTaskNotes(taskNotes+"\n----------\nUser:"+logged+", Current State:Open, Date and Time:"+Date())
        console.log("Current no of task in "+app_acronym +" is "+ noOfTask)
        console.log("Create task for app "+app_acronym)
        console.log("Create plan for task "+taskplan)
        console.log("Task description "+taskdescription)
        console.log("Taskname "+taskName)
       
       
        console.log("Task notes "+taskNotes)
       console.log("Create user "+logged)
        console.log("No of task in "+noOfTask)
    
         const res2 = await Axios.post('http://localhost:8080/taskaccess',{app_acronym:""+app_acronym+"", access_type:"Create"});
         
         var data = res2.data

        
         try {
        const res = await Axios.post('http://localhost:8080/createtask', 
        {  app_acronym: "" + app_acronym + "",
        taskPlan: ""+taskplan+"",
        taskName: ""+taskName+"",
        taskDescription: ""+taskdescription+"",
        taskNotes:""+taskNotes+"",
        taskCreator:""+logged+""
     });
    } catch (e){
        console.error("Create task function - there was error "+e.message);
    }

  }


    ////////////////////////////////////////////////


}
    return ( 
    
        <div className='boxType'>
        <header className='Header'> <h1>Welcome {logged} </h1>
        <LogOut/> <GoMain/> </header>
    <div className='Login'>
    <h2>Create new Task</h2>

   
    <form onSubmit={(e)=>{handleCreateTask(e)}}>
    
    <label>Select App for Task</label>
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
               {!hasAccess && <div>{app_acronym} : You do not have right to create task </div>} 
                 
                <br/>
                {hasAccess && <div> 
               <label>Select Plan for Task</label>
                <Select 
                value ={taskplan}
                onChange = {handleTaskPlan}
                input={<OutlinedInput label="User to Check" />}>
                {planlistresult.map((plan) => (
                <MenuItem
                key={plan.plan_app_acronym}
                value={plan.plan_app_acronym }>
              {plan.plan_app_acronym}
            </MenuItem>
          
          ))}
               </Select>
               <br/>

               <label>Task Name :</label>
               <br/>
               <input type="text" value={taskName} required onChange={(e) => { handleTaskNameChange(e) }} />
               <br />
               <label>Task Description</label>
               <br/>
               <textarea rows="5" cols="50" value={taskdescription}  onChange={(e) => { handleTaskDescriptionChange(e) }} />
               <br/>
               <label>Task Notes</label>
               <br/>
               <textarea rows="7" cols="50" value={taskNotes}  onChange={(e) => { handleTaskNoteChange(e) }} />
                <br/>
                 <input type="submit" value="Create Task"/>
               
               </div>}
    </form>
    </div>
    
    

    <button onClick={goMain}>Main Kanban Board</button>
    </div>
   
  
    );
   
}

export default CreateTask
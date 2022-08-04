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
    const [taskcount, setTaskCount]=useState('')

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
        
    },[])

    const handleTaskNoteChange=(event)=>{

       
           
            setTaskNotes(event.target.value)
        


       // setTaskNotes(event.target.value+"\n"+"State: Open, User :"+logged+" "+currentDate)

    }

    const handleAppAcronym=(event)=>{
       
        setApp_acronym(event.target.value)
        countTask()
       
    }

    const handleTaskPlan=(event)=>{
        setTaskPlan(event.target.value)
    }

    const handleTaskNameChange=(event)=>{
        setTaskName(event.target.value)
    }

    const handleTaskDescriptionChange=(event)=>{
    setTaskDescription(event.target.value)
    }

    
    const countTask=async()=>{
     
        console.log("Count for app "+app_acronym)
        try {
            const res = await Axios.post('http://localhost:8080/counttask', 
            {  app_acronym: "" + app_acronym + "" });
            var  noOfTask = res.data[0].taskcount
                console.log("No of task for "+app_acronym+ " : " + noOfTask)
              
        } catch (e){
           console.error("Create task function - there was error "+e.message);
        }

    }
    const handleCreateTask=async(event)=>{
        event.preventDefault();
       
        // console.log("Count for app "+app_acronym)
        // try {
        //     const res = await Axios.post('http://localhost:8080/counttask', 
        //     {  app_acronym: "" + app_acronym + "" });
        //         noOfTask = res.data[0].taskcount
        //         console.log("No of task for "+app_acronym+ " : " + noOfTask)
              
        // } catch (e){
        //    console.error("Create task function - there was error "+e.message);
        // }
      
        setTaskNotes(taskNotes+"\n----------\nUser:"+logged+", Current State:Open, Date and Time:"+Date())
        console.log("Current no of task in "+app_acronym +" is "+ noOfTask)
        console.log("Create task for app "+app_acronym)
        console.log("Create task for task "+taskplan)
        console.log("Task description "+taskdescription)
        console.log("Taskname "+taskName)
       
        console.log("Task notes "+taskNotes)
       console.log("Create user "+logged)
        console.log("No of task in "+noOfTask)

        
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

    return ( 
    
        <div>
        <header className='Header'> <h1>Welcome {logged} </h1>
        <LogOut/> </header>
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

                <br/>
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
               <textarea rows="5" cols="50" value={taskdescription} required onChange={(e) => { handleTaskDescriptionChange(e) }} />
               <br/>
               <label>Task Notes</label>
               <br/>
               <textarea rows="10" cols="50" value={taskNotes} required onChange={(e) => { handleTaskNoteChange(e) }} />
                <br/>
               <input type="submit" value="Create Task"/>
    </form>
    </div>
    </div>
    );
   
}

export default CreateTask
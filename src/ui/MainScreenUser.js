import {useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import './LoginForm.css';
import Axios from 'axios';
import LogOut from './Logout';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Task from './Task';
import Typography from '@mui/material/Typography';


function MainScreenUser(){

    
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var loggedEmail = window.localStorage.getItem("email");
    console.log(logged);

    const [applistresult, setAppListsResult] = useState([]);
    const [ app_acronym, setApp_acronym] = useState('');

    const [openTask, setOpenTask] = useState([]);
    const [todoTask, setTodoTask] = useState([]);
    const [doingTask, setDoingTask] = useState([]);
    const [doneTask, setDoneTask] = useState([]);
    const [closeTask, setCloseTask] = useState([]);
    const [plan, setPlan] = useState('');
    const [planlistresult, setPlanListsResult] = useState([]);
    const [showAppPlan, setShowAppPlan] = useState('');

    var openTaskList =[]
    var todoTaskList=[]
    var doingTaskList=[]
    var doneTaskList=[]
    var closeTaskList=[]
   
  

    useEffect(() => {

        async function getAllApp(){
            const res = await Axios.post('http://localhost:8080/listapp');
        
             var data = res.data;
        
            console.log("Current app list" +data)
            setAppListsResult(data)
        }
        getAllApp()


        // async function getAllPlans(){
        //     const res = await Axios.post('http://localhost:8080/listplans');
        
        //     var data = res.data;
        //     console.log("Current plan list" +data)
        //     setPlanListsResult(data)
        // }
        
    
        // getAllPlans()
        if (logged==null){
         navigate('../login')   
        }
    },[])

    const handleAppAcronym=(event)=>{
       
        setApp_acronym(event.target.value)


      //  getAppPlans(event.target.value)
        setShowAppPlan(true)
        setPlanListsResult([])

        getAppPlans(event.target.value)

    }

    async function getAppPlans(app_acronym){
        const res = await Axios.post('http://localhost:8080/listappplan',{app_acronym:""+app_acronym+""});
    
        var data = res.data
       console.log(res)
  
       //  // data.push({ 'plan_app_acronym': 'none' })({ 'plan_app_acronym': 'none' })
         console.log("Current plan list" +data[0].plan_mvp_name)
        
       
      
        console.log(res.data)
        setPlanListsResult(data)
    }

    const handlePlanTaskQuery=async(e)=>{
        e.preventDefault();
        try {             
            const res =  await Axios.post('http://localhost:8080/listplantasks',{  plan: "" + plan + ""});
           
            console.log("Query task response for app "+plan+": "+ res.data);
            
           

            //task_id, task_name, task_sta
          const size = res.data.length
           for ( var i=0; i<size; i++){
              console.log("Task id :"+res.data[i].task_id)
              console.log("Task name :"+res.data[i].task_name)  
              console.log("Task status :"+res.data[i].task_state)             
              // alert ("User "+res.data[i].username   
             } 

             // Populate into Open list

             for ( var i=0; i<size; i++){

                if (res.data[i].task_state=="Open"){
                    console.log("Adding to Open list Task id :"+res.data[i].task_id)
                    console.log("Task name :"+res.data[i].task_name)  
                    console.log("Task status :"+res.data[i].task_state)      

                    openTaskList.push(res.data[i])
                } 
            
             }

             console.log("Open list length :"+openTaskList.length) 


             for ( var i=0; i<openTaskList.length; i++){

                    console.log("Open list Task id :"+openTaskList[i].task_id + 
                    " Task name :"+openTaskList[i].task_name +
                    " Task status :"+openTaskList[i].task_state)      

            
             }


             setOpenTask(openTaskList)
             // Populate into ToDo list

             for ( var i=0; i<size; i++){

                if (res.data[i].task_state=="Todo"){
                    console.log("Adding to Todo list Task id :"+res.data[i].task_id)
                    console.log("Task name :"+res.data[i].task_name)  
                    console.log("Task status :"+res.data[i].task_state)      

                    todoTaskList.push(res.data[i])
                } 
            
             }

             console.log("Todo list length :"+todoTaskList.length) 


             for ( var i=0; i<todoTaskList.length; i++){

                    console.log("Todo list Task id :"+todoTaskList[i].task_id + 
                    " Task name :"+todoTaskList[i].task_name +
                    " Task status :"+todoTaskList[i].task_state)      

            
             }

             setTodoTask(todoTaskList)
             // Populate into Doing list

             for ( var i=0; i<size; i++){

                if (res.data[i].task_state=="Doing"){
                    console.log("Adding to Doing list Task id :"+res.data[i].task_id)
                    console.log("Task name :"+res.data[i].task_name)  
                    console.log("Task status :"+res.data[i].task_state)      

                    doingTaskList.push(res.data[i])
                } 
            
             }

             console.log("Doing list length :"+doingTaskList.length) 


             for ( var i=0; i<doingTaskList.length; i++){

                    console.log("Doing list Task id :"+doingTaskList[i].task_id + 
                    " Task name :"+doingTaskList[i].task_name +
                    " Task status :"+doingTaskList[i].task_state)      

            
             }
          
             setDoingTask(doingTaskList)
             // Populate into Done list

             for ( var i=0; i<size; i++){

                if (res.data[i].task_state=="Done"){
                    console.log("Adding to Done list Task id :"+res.data[i].task_id)
                    console.log("Task name :"+res.data[i].task_name)  
                    console.log("Task status :"+res.data[i].task_state)      

                    doneTaskList.push(res.data[i])
                } 
            
             }

             console.log("Doing list length :"+doneTaskList.length) 


             for ( var i=0; i<doneTaskList.length; i++){

                    console.log("Done list Task id :"+doneTaskList[i].task_id + 
                    " Task name :"+doneTaskList[i].task_name +
                    " Task status :"+doneTaskList[i].task_state)      

            
             }

             setDoneTask(doneTaskList)
             
             for ( var i=0; i<size; i++){

                if (res.data[i].task_state=="Close"){
                    console.log("Adding to Close list Task id :"+res.data[i].task_id)
                    console.log("Task name :"+res.data[i].task_name)  
                    console.log("Task status :"+res.data[i].task_state)      

                    closeTaskList.push(res.data[i])
                } 
            
             }

             


             for ( var i=0; i<closeTaskList.length; i++){

                    console.log("Close list Task id :"+closeTaskList[i].task_id + 
                    " Task name :"+closeTaskList[i].task_name +
                    " Task status :"+closeTaskList[i].task_state)      

            
             }
            
             setCloseTask(closeTaskList)
             console.log("Close list length :"+closeTaskList.length) 

             
        } catch (e){
           console.error("Query group error - "+e.message);

       }
    }

    const createApp = () =>{
        navigate('../createApp')
    }

    const handlePlan=(event)=>{
       
        setPlan(event.target.value)
      //  countTask()
       
    }
    const handleAppTaskQuery=async(e)=>{
        e.preventDefault();

        console.log(111111111)
        try {             
            const res =  await Axios.post('http://localhost:8080/listapptasks',{  app_acronym: "" + app_acronym + ""});
           
            console.log("Query task response for app "+app_acronym+": "+ res.data);
            
           

            //task_id, task_name, task_sta
          const size = res.data.length
           for ( var i=0; i<size; i++){
              console.log("Task id :"+res.data[i].task_id)
              console.log("Task name :"+res.data[i].task_name)  
              console.log("Task status :"+res.data[i].task_state)             
              // alert ("User "+res.data[i].username   
             } 

             // Populate into Open list

             for ( var i=0; i<size; i++){

                if (res.data[i].task_state=="Open"){
                    console.log("Adding to Open list Task id :"+res.data[i].task_id)
                    console.log("Task name :"+res.data[i].task_name)  
                    console.log("Task status :"+res.data[i].task_state)      

                    openTaskList.push(res.data[i])
                } 
            
             }

             console.log("Open list length :"+openTaskList.length) 


             for ( var i=0; i<openTaskList.length; i++){

                    console.log("Open list Task id :"+openTaskList[i].task_id + 
                    " Task name :"+openTaskList[i].task_name +
                    " Task status :"+openTaskList[i].task_state)      

            
             }


             setOpenTask(openTaskList)
             // Populate into ToDo list

             for ( var i=0; i<size; i++){

                if (res.data[i].task_state=="Todo"){
                    console.log("Adding to Todo list Task id :"+res.data[i].task_id)
                    console.log("Task name :"+res.data[i].task_name)  
                    console.log("Task status :"+res.data[i].task_state)      

                    todoTaskList.push(res.data[i])
                } 
            
             }

             console.log("Todo list length :"+todoTaskList.length) 


             for ( var i=0; i<todoTaskList.length; i++){

                    console.log("Todo list Task id :"+todoTaskList[i].task_id + 
                    " Task name :"+todoTaskList[i].task_name +
                    " Task status :"+todoTaskList[i].task_state)      

            
             }

             setTodoTask(todoTaskList)
             // Populate into Doing list

             for ( var i=0; i<size; i++){

                if (res.data[i].task_state=="Doing"){
                    console.log("Adding to Doing list Task id :"+res.data[i].task_id)
                    console.log("Task name :"+res.data[i].task_name)  
                    console.log("Task status :"+res.data[i].task_state)      

                    doingTaskList.push(res.data[i])
                } 
            
             }

             console.log("Doing list length :"+doingTaskList.length) 


             for ( var i=0; i<doingTaskList.length; i++){

                    console.log("Doing list Task id :"+doingTaskList[i].task_id + 
                    " Task name :"+doingTaskList[i].task_name +
                    " Task status :"+doingTaskList[i].task_state)      

            
             }
          
             setDoingTask(doingTaskList)
             // Populate into Done list

             for ( var i=0; i<size; i++){

                if (res.data[i].task_state=="Done"){
                    console.log("Adding to Done list Task id :"+res.data[i].task_id)
                    console.log("Task name :"+res.data[i].task_name)  
                    console.log("Task status :"+res.data[i].task_state)      

                    doneTaskList.push(res.data[i])
                } 
            
             }

             console.log("Doing list length :"+doneTaskList.length) 


             for ( var i=0; i<doneTaskList.length; i++){

                    console.log("Done list Task id :"+doneTaskList[i].task_id + 
                    " Task name :"+doneTaskList[i].task_name +
                    " Task status :"+doneTaskList[i].task_state)      

            
             }

             setDoneTask(doneTaskList)
             
             for ( var i=0; i<size; i++){

                if (res.data[i].task_state=="Close"){
                    console.log("Adding to Close list Task id :"+res.data[i].task_id)
                    console.log("Task name :"+res.data[i].task_name)  
                    console.log("Task status :"+res.data[i].task_state)      

                    closeTaskList.push(res.data[i])
                } 
            
             }

             


             for ( var i=0; i<closeTaskList.length; i++){

                    console.log("Close list Task id :"+closeTaskList[i].task_id + 
                    " Task name :"+closeTaskList[i].task_name +
                    " Task status :"+closeTaskList[i].task_state)      

            
             }
            
             setCloseTask(closeTaskList)
             console.log("Close list length :"+closeTaskList.length) 

             
        } catch (e){
           console.error("Query group error - "+e.message);

       }
       
       Axios.post('http://localhost:8080/listappplan',{  app_acronym: "" + app_acronym + ""})
       .then((res)=>{
        let planData = []
        res.data.forEach((p)=>{
            planData.push(p.plan_mvp_name)
        })
    setPlanListsResult(planData)
        console.log(planData)
       })
       .catch((err)=>{console.log(err)});

       
     
      

    }
   
    const editApp = () =>{
        navigate('../editApp')
    }
    const goProfile = () =>{
        
        navigate('../profileuser')
    }

    const createPlan = () =>{
        navigate('../createplan')
    }

    const editPlan = () =>{
        navigate('../editPlan')
    }

    const createTask=() =>{
        navigate('../createTask')
    }
   
    return (

    <div>
        <header className='Header'> 
        <h6>Welcome {logged} {loggedEmail}</h6> 
        <Button onClick ={goProfile}>Change {logged} Password/email </Button>
        <LogOut />
        <div>Kanban Function</div>
        <div > 
        <button  onClick ={createApp}>  Create App</button> 
    <button onClick={createPlan}>Create Plan</button>
    <button onClick={createTask}>Create Task</button>
    <button  onClick ={editApp}>Edit App</button> 
   
   
    </div>
        </header>
    <div className='Login'>
    
    <br/>
    <div className='row'>
    <div className='column'> 
   

    <label>Select App to View Task</label>
        
    <form onSubmit={(e)=>{handleAppTaskQuery(e)}}>        
    <Select 
                value ={app_acronym}
                onChange = {handleAppAcronym}
                input={<OutlinedInput label="User to Check" />}>
                {applistresult.map((app) => (
                <MenuItem
                key={app.app_acronym}
                value={app.app_acronym }>
              {app.app_acronym.replace("^", "'")}
            </MenuItem>
          
          ))}
               </Select>
               <input type="submit" value="Get App Task"/>
               </form>
               {showAppPlan&&<div><form onSubmit={(e)=>{handlePlanTaskQuery(e)}}>        
                 <Select 
                value ={plan}
                onChange = {handlePlan}
                input={<OutlinedInput label="User to Check" />}>
                    {console.log(planlistresult)}
                {planlistresult.map((plan) => {
                return(
                <MenuItem
                key={plan}
                value={plan}>
                {plan}
            </MenuItem>
          
          )})}
               </Select>
               <input type="submit" value="Get Plan Task"/>
               </form>
               </div>}
    </div>
    
    <div className='column'> 
     <div className='columnLabel'>Open</div>
    

    <div>{openTask.map(task => (
        <Task task_id={task.task_id} task_name={task.task_name} task_state={task.task_state}></Task>
      ))}</div>
    

    </div>
    <div className='column'> 
    <div className='columnLabel'>To Do</div>

    <div>{todoTask.map(task => (
        <Task task_id={task.task_id} task_name={task.task_name} task_state={task.task_state}></Task>
      ))}</div>
    </div>
    <div className='column'> 
    <div className='columnLabel'>Doing</div>
    <div>{doingTask.map(task => (
        <Task task_id={task.task_id} task_name={task.task_name} task_state={task.task_state}></Task>
      ))}</div>

    </div>
    <div className='column'> 
    <div className='columnLabel'>Done</div>
    <div>{doneTask.map(task => (
        <Task task_id={task.task_id} task_name={task.task_name} task_state={task.task_state}></Task>
      ))}</div>

    </div>
    <div className='column'> 
    <div className='columnLabel'>Close</div>
    <div>{closeTask.map(task => (
        <Task task_id={task.task_id} task_name={task.task_name} task_state={task.task_state}></Task>
      ))}</div>
    </div>
   </div>
    
    <br/>
    
    </div>
    </div>
);
 }

 export default MainScreenUser;
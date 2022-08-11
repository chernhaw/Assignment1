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

var newTaskState =""
function TaskEdit(){

    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    console.log("Logged" +logged);
    console.log("Admin" +admin);

    
    const [planlistresult, setPlanListsResult] = useState([]);

    const [taskdescription, setTaskDescription]=useState();
    const [taskNotes, setTaskNotes] = useState();
    const [appendtaskNotes, setAppendTaskNotes] = useState();
    const [taskplan, setTaskPlan] = useState();
    const [task_name, setTask_Name] = useState();
    const [task_id, setTask_Id] = useState();
    const [task_creator, setTaskCreator]=useState();
    const [task_acronym, setTask_acronym] = useState('');
    const [task_owner, setTask_owner] = useState('');
    const [task_createDate, setTask_createDate] = useState('');
    const [task_State, setTask_State]=useState('')

    var noOfTask = 0
   
    useEffect(() => {

        if (logged==null){
         navigate('../login')   


        }

        var task_id = window.localStorage.getItem("task_id")
      
        async function getTaskDetail(){
            const res = await Axios.post('http://localhost:8080/gettaskdetail',{task_id:""+task_id+""});
        
             var data = res.data;
        
            console.log("Task detail retrieved for " +task_id)
            console.log("task_id "+data[0].task_id)
            setTask_Id(data[0].task_id)
            console.log("task_name "+data[0].task_name)
            setTask_Name(data[0].task_name)


            console.log("task_plan "+data[0].task_plan)
            setTaskPlan(data[0].task_plan)

            console.log("task_description "+data[0].task_description)
            setTaskDescription(data[0].task_description)

            console.log("task_notes "+data[0].task_notes)
            setTaskNotes(data[0].task_notes)
            console.log("task_app_acronym "+data[0].task_app_acronym)
            setTask_acronym(data[0].task_app_acronym)
            console.log("task_owner "+data[0].task_owner)
            setTask_owner(data[0].task_owner)

            console.log("task_state "+data[0].task_state)
            setTask_State(data[0].task_state)
            newTaskState=data[0].task_state
            console.log("task_createDate "+data[0].task_owner)
            setTask_createDate(data[0].task_createDate)

            console.log("task creator : "+ data[0].task_creator)
            setTaskCreator(data[0].task_creator)

            console.log("Checking for group able to access task at this state -- "+data[0].task_state)
  
       
         

         //  // data.push({ 'plan_app_acronym': 'none' })({ 'plan_app_acronym': 'none' })
        //  console.log("Current plan list" +data[0].object.)
          
          
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


        
        
        getTaskDetail()
       

        getAllPlans()

      //  getAccess()
        
    },[])

    const getAccess=async(event)=>{

      console.log("Checking app "+task_acronym+ " for access "+ task_State)
      const res2 = await Axios.post('http://localhost:8080/taskaccess',{app_acronym:""+task_acronym+"", access_type:""+task_State+""});
  
      var data = res2.data
     
      
      console.log("List of user able to change update this state : ")
      
      for (var i=0; i<data.length-1 ; i++){

        console.log(data[i].access)
      }
      
      for (var i=0; i<data.length-1 ; i++){

        
          console.log(data[i].access)
          if (data[i].assess == logged){
            return "Have access"
          }
          return "No access"
      }
       
      return "Access"
    }

    const handleTaskNoteChange=(event)=>{
          setAppendTaskNotes(event.target.value)
    }

   

    const handleTaskPlan=(event)=>{
       setTaskPlan(event.target.value)
    }

    const handleTaskNameChange=(event)=>{
      setTask_Name(event.target.value)
    }

    const handleTaskDescriptionChange=(event)=>{
    setTaskDescription(event.target.value)
    }

    
    
    const handleUpdateTask=async(event)=>{
         event.preventDefault();

         var access = getAccess()


        console.log("User "+logged+" has access "+access )
        console.log("Task "+ task_id+" state is :"+task_State)
        console.log("Update Task state : "+newTaskState)
        console.log("update app_acronym "+task_acronym)
        console.log("update task plan "+taskplan)
        console.log("update taskdescription "+taskdescription)
        console.log("update taskname "+task_name)
       
        console.log("update taskNotes "+taskNotes)
        
        
         console.log("Run update task for "+task_id)


         console.log("Checking for group able to access task at this state -- "+task_State)
    
    
         const res2 = await Axios.post('http://localhost:8080/taskaccess',{app_acronym:""+task_acronym+"", access_type:""+task_State+""});
         
         var data = res2.data
         
         console.log("Users able to change update this state : ")
         for (var i=0; i<data.length-1 ; i++){
           console.log(data[i].access)
         }
         
         var hasAccess = false
     
         for (var i=0; i<data.length-1 ; i++){
           console.log(data[i].access)
           if (data[i].access==logged){
             hasAccess = true
           }
         }
         console.log("User "+logged+ " has access : "+hasAccess)

          if(!hasAccess){
            alert("User "+logged+" do not have access for task at "+task_State)
            
          } else {

            try {
              const res = await Axios.post('http://localhost:8080/updatetask', 
              {  app_acronym: "" + task_acronym + "",
              taskPlan: ""+taskplan+"",
              taskName: ""+task_name+"",
              taskDescription: ""+taskdescription+"",
              taskState:""+newTaskState+"",
              taskNotes:""+taskNotes+"\n----------\n"+appendtaskNotes+"\n----------\nUser:"+logged+", Current State:"+task_State+", Date and Time:"+Date(),
              taskOwner:""+logged+"",
              taskId:""+task_id+""
           });
      
           
          } catch (e){
              console.error("Update task - there was error "+e.message);
          }
          getTaskDetailUpdate()
          }

       
        
     
    }


    return ( 
    
        <div>
        <header className='Header'> <h1>Welcome {logged} </h1>
        <LogOut/> <GoMain/> </header>
    <div className='Login'>
    <h2>Edit Task Id : {task_id}</h2>
    <form onSubmit={(e)=>{handleUpdateTask(e)}}>
    
               <label>Current Task Plan : {taskplan}</label><br/>
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
               <label>Task  Acronym: {task_acronym}</label>
               <br/>

               <br/>
               <label>Task Creation Date: {task_createDate}</label>
               <br/>
               <br/>
               <label>Task Creator: {task_creator}</label>
               <br/>
               <br/>
               <label>Task Owner: {task_owner}</label>
               <br/>
               <br/>
               <label>Current Task State : {task_State}</label>
               <br/>
               <label>New Task State</label><TaskState taskState={task_State} />
               <br/>
              
               <label>Current Task Name : {task_name}</label>
               <br/>
                
             
               <label>New Task Name : </label>
              
               <input type="text" value={task_name} required onChange={(e) => { handleTaskNameChange(e) }} />
               <br />
               <br/>
               <label>Current Task Description: </label>
               <br/>
               <textarea rows="4" cols="50" value={taskdescription} required onChange={(e) => { handleTaskDescriptionChange(e) }} />
               <br/>
               <label>Existing Task Notes - Read only</label>
               <br/>
               <textarea rows="10" cols="50" value={taskNotes}/>
                <br/>
                <label>Append to Task Notes</label>
               <br/>
               <textarea rows="10" cols="50" value={appendtaskNotes} required onChange={(e) => { handleTaskNoteChange(e) }} />
                <br/>
               
                <input type="submit" value="Update Task"/>
               

    </form>
    </div>
    </div>
    );

    async function getTaskDetailUpdate(){

    const res = await Axios.post('http://localhost:8080/gettaskdetail',{task_id:""+task_id+""});

       var data = res.data;
    
      console.log("Task detail retrieved for " +task_id)
      console.log("task_id "+data[0].task_id)
      setTask_Id(data[0].task_id)
      console.log("task_name "+data[0].task_name)
      setTask_Name(data[0].task_name)
    
    
      console.log("task_plan "+data[0].task_plan)
      setTaskPlan(data[0].task_plan)
    
      console.log("task_description "+data[0].task_description)
      setTaskDescription(data[0].task_description)
    
      console.log("task_notes "+data[0].task_notes)
      setTaskNotes(data[0].task_notes)
      console.log("task_app_acronym "+data[0].task_app_acronym)
      setTask_acronym(data[0].task_app_acronym)
      console.log("task_owner "+data[0].task_owner)
      setTask_owner(data[0].task_owner)
    
      console.log("task_state "+data[0].task_state)
      setTask_State(data[0].task_state)
      newTaskState=data[0].task_state
      console.log("task_createDate "+data[0].task_owner)
      setTask_createDate(data[0].task_createDate)
    
      console.log("task creator : "+ data[0].task_creator)
      setTaskCreator(data[0].task_creator)
    
  
    
    }              
  }
   


function TaskState(props){

  const [newTask, setNewTask]=useState();

  const handleTaskStateChange=(event)=>{
    newTaskState=event.target.value
    setNewTask(event.target.value)
  }


  const taskState = props.taskState;

  if( taskState=="Open"){

  return ( <>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={newTask}
    label="task State"
    onChange={handleTaskStateChange}
  >
    <MenuItem value={"Open"}>Open</MenuItem>
    <MenuItem value={"Todo"}>Todo</MenuItem>
  </Select>

  </>
  );
  } else if ( taskState=="Todo"){
    return ( <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={newTask}
        label="Age"
        onChange={handleTaskStateChange}
      >
        <MenuItem value={"Todo"}>Todo</MenuItem>
        <MenuItem value={"Doing"}>Doing</MenuItem>
      </Select>
    
      </>
      );

  } else if ( taskState=="Doing"){
    return ( <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={newTask}
        label="Age"
        onChange={handleTaskStateChange}
      >
        <MenuItem value={"Todo"}>Todo</MenuItem>
        <MenuItem value={"Doing"}>Doing</MenuItem>
        <MenuItem value={"Done"}>Done</MenuItem>
      </Select>
    
      </>
      );

  } else if ( taskState=="Done"){
    return ( <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={newTask}
        label="Age"
        onChange={handleTaskStateChange}
      >
      
        <MenuItem value={"Doing"}>Doing</MenuItem>
        <MenuItem value={"Done"}>Done</MenuItem>
        <MenuItem value={"Close"}>Close</MenuItem>
      </Select>
      </>
      );
  }
}



export default TaskEdit
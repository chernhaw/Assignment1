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
    const [hasAccess, setHasAccess]=useState()
    const [updateMsg, setUpdateMsg]= useState()
    
   
    useEffect(() => {

      setUpdateMsg('')

        if (logged==null){
         navigate('../login')   


        }

        setAppendTaskNotes("")

        var task_id = window.localStorage.getItem("task_id")

        console.log("Opening task "+task_id)
      
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
           
            var task_access=""
            if (data[0].task_state=="Open"){
              task_access="Open"
            } else {
              task_access= ""+data[0].task_state
            }

            
          const res2 = await Axios.post('http://localhost:8080/taskaccess',{app_acronym:""+data[0].task_app_acronym+"", access_type:""+task_access+""});
         
          var accessData = res2.data
          var access_member_str=""
          console.log("Users able to change update this state : "+task_access)
          
          for (var i=0; i<accessData.length; i++){
            console.log(accessData[i].access)
            access_member_str= access_member_str + accessData[i].access + " "
            
          }

          if (access_member_str.indexOf(""+logged+" ")!=-1){
                console.log("Granting access "+logged)
                setHasAccess(true)
               
          }
          
          if (data[0].task_state=="Close"){
            setHasAccess(false)
          }
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
   
        
    },[])

    
    
    const handleTaskNoteChange=(event)=>{
          setAppendTaskNotes(event.target.value)
          
          setUpdateMsg("")
    }

   

    const handleTaskPlan=(event)=>{
       setTaskPlan(event.target.value)
       setUpdateMsg("")
    }

   
    const handleTaskDescriptionChange=(event)=>{
    setTaskDescription(event.target.value)
     setUpdateMsg("")
    }

    const goMain = () => {
      var refresh="true"
      window.localStorage.setItem("refresh", refresh )

      navigate('../main')
  }
    
    
    const handleUpdateTask=async(event)=>{
        

        // var access = getAccess()
        window.localStorage.setItem("app", task_acronym);

        console.log("User "+logged)
        console.log("Task "+ task_id+" state is :"+task_State)
        console.log("Update Task state : "+newTaskState)
        console.log("update app_acronym "+task_acronym)
        console.log("update task plan "+taskplan)
        console.log("update taskdescription "+taskdescription)
        console.log("update taskname "+task_name)
       
        console.log("update taskNotes "+taskNotes)

        var proceedToCreate = true

        if (appendtaskNotes===undefined){
          setAppendTaskNotes(" ")
         
        }

        if(appendtaskNotes.indexOf("'")>-1){
          var proceedToCreate = false
          alert(" ' character are not allowed in task notes")
        }

        if(taskdescription.indexOf("'")>-1){
          var proceedToCreate = false
          alert(" ' character are not allowed in task description")
        }
       
         console.log("Run update task for "+task_id)
         console.log("Checking for group able to access task at this state -- "+task_State)
    
         
         console.log("User "+logged+ " has access : "+hasAccess)

        
          if(proceedToCreate){
          if(!hasAccess){
            alert("User "+logged+" do not have access for task at "+task_State)
            
          } else {
            alert("Task updated by "+logged)


            try {
              const res = await Axios.post('http://localhost:8080/updatetask', 
              {  app_acronym: "" + task_acronym + "",
              taskPlan: ""+taskplan+"",
              taskName: ""+task_name+"",
              taskDescription: ""+taskdescription+"",
              taskState:""+newTaskState+"",
              taskNotes:"\n"+appendtaskNotes+"\n----------\nUser:"+logged+", Current State:"+task_State+", Date and Time:"+Date()+"\n"+taskNotes,
              taskOwner:""+logged+"",
              taskId:""+task_id+""
           });
      
           setUpdateMsg("Task Updated -")
          } catch (e){
              console.error("Update task - there was error "+e.message);
          }
        
          }
        }
    }


    return ( 
    
        <div>
        <header className='Header'> <h6>Welcome {logged} </h6>
        <LogOut/> <GoMain/> </header>
    <div className='Login'>
    <h2>Edit Task Id : {task_id}</h2>

    <label>Task  Acronym: {task_acronym}</label>
                <br/>
               
               <label>Task Creation Date: {task_createDate.split('T')[0]}</label>
               <br/>
               
               <label>Task Creator: {task_creator}</label>
               <br/>
               
               <label>Task Owner: {task_owner}</label>
               <br/>
              
    <form onSubmit={(e)=>{handleUpdateTask(e)}}>
                <div className='boxType'>
                <label >Current Task Plan : {taskplan}</label><br/>
                {hasAccess &&
                  <div>
               
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
                  </div>}
                  </div>
               <br/>
               
               <div className='boxType'>
               <label>Task Name : {task_name}</label>
               <br/>
               
             
               
               
               <br/>
               </div>
               <div className='boxType'>
               <label>Current Task Description: </label>
               <br/>
               <textarea rows="4" cols="50" value={taskdescription} required onChange={(e) => { handleTaskDescriptionChange(e) }} />
               <br/>
               </div>
               <div className='boxType'>
               <label>Existing Task Notes - Read only</label>
               <br/>
               <textarea rows="10" cols="70" value={taskNotes}/>
                <br/>
                
                  
               <div>{hasAccess &&
                <div>
                <label>Append to Task Notes</label>
               <br/>
               <textarea rows="15" cols="70" value={appendtaskNotes} onChange={(e) => { handleTaskNoteChange(e) }} />
               </div>
              }</div>


                <br/>
                </div>
                <div className='boxType'>
               <label>Current Task State : {task_State}</label>
               <br/>
               
               
               <div>{hasAccess &&<div><label><b>Set New Task State</b></label><TaskState taskState={task_State} /></div>}</div>
               <br/>
               </div>
                <div>{hasAccess &&<input type="submit" value="Update Task"/>}</div>
                <div>{!hasAccess &&<GoMain/>}</div>
               
               
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
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

    var description=""
    var taskname=""

    const [applistresult, setAppListsResult] = useState([]);
    const [planlistresult, setPlanListsResult] = useState([]);

    const [taskdescription, setTaskDescription]=useState();
    const [taskNotes, setTaskNotes] = useState();
    const [taskplan, setTaskPlan] = useState();
    const [taskName, setTaskName] = useState();
    const [app_acronym, setApp_acronym] = useState('');
    const [hasAccess, setHasAccess]=useState()
    const [readOnly, setReadOnly]=useState()

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
        
        getAllApp()
        setTaskNotes("")
        
        setReadOnly(false)
       
        
    },[])

    const handleTaskNoteChange=(event)=>{

       
          var notes = ""+event.target.value+""
        
          console.log("Task notes "+notes)
         
            setTaskNotes(notes)
        
        
          
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

        if (access_member_str.indexOf(""+logged+" ")!=-1){
              console.log("Granting access "+logged)
              setHasAccess(true)
             
        } else {
          setHasAccess(false)
        }
       
        getAppPlans(event.target.value)
        
    }


    async function getAppPlans(app_acronym){
      const res = await Axios.post('http://localhost:8080/listappplan',{app_acronym:""+app_acronym+""});
  
      var data = res.data
     

     //  // data.push({ 'plan_app_acronym': 'none' })({ 'plan_app_acronym': 'none' })
    //  console.log("Current plan list" +data[0].object.)
      
      var none = { 'plan_app_acronym': 'none' }
      data.push(none)
      setPlanListsResult(data)
  }

    const handleTaskPlan=(event)=>{
        setTaskPlan(event.target.value)
    }

    const handleTaskNameChange=(event)=>{

      taskname=""+event.target.value+""
     
        setTaskName(taskname)
        
    }

    const handleTaskDescriptionChange=(event)=>{

       description= ""+event.target.value+""

      if (description.length==0){
     
        description=" "
      } 
       
    setTaskDescription(description)
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

            setReadOnly(false)

            // rest call to retrieve plan by app


              
        } catch (e){
           console.error("Create task function - there was error "+e.message);
        }

    }

    const anotherTask =(event)=>{
      setTaskNotes("")
      setTaskName("")
      setTaskDescription("")
      setReadOnly(false)
    }
    const handleCreateTask=async(event)=>{
       
        var proceedToCreate = true
        event.preventDefault();

        
      
        // if(taskName.indexOf("'")>-1){
        //   var proceedToCreate = false
        //   alert("Task name should not have ' character")
        // }


     
      if(proceedToCreate){

       
        console.log("Task notes "+taskNotes)
     
       
        console.log("Current no of task in "+app_acronym +" is "+ noOfTask)
        console.log("Create task for app "+app_acronym)
        console.log("Create plan for task "+taskplan)
       
        var descriptionStr=""

        try {
        descriptionStr = taskdescription.replaceAll( "'", "^")
        } catch(err){

        }

       // var descriptionStr = taskdescription.replaceAll( "'", "''")
        console.log("Task description "+descriptionStr)
       
       var tasknameStr = taskName.replaceAll( "'", "^")
       console.log("Taskname "+tasknameStr)


       var taskNoteStr = ""
       try {
        
        taskNoteStr = taskNotes.replaceAll( "'", "^")
        } catch(err){
          
        }

        console.log("Task notes "+taskNoteStr)
       console.log("Create user "+logged)
        console.log("No of task in "+noOfTask)

        
    
        // const res2 = await Axios.post('http://localhost:8080/taskaccess',{app_acronym:""+app_acronym+"", access_type:"Create"});
         
        // var data = res2.data

         const resCheckTaskExist = await Axios.post('http://localhost:8080/checktaskexist',{app_acronym:""+app_acronym+"", task_name:""+taskName});

         const exist = resCheckTaskExist.data[0].task



         if (exist<1){

          setReadOnly(true)
         // setTaskNotes(taskNoteStr)

        var res= null
         try {
         res = await Axios.post('http://localhost:8080/createtask', 
        {  app_acronym: "" + app_acronym + "",
        taskPlan: ""+taskplan+"",
        taskName: ""+tasknameStr+"",
        taskDescription: ""+descriptionStr+"",
        taskNotes:""+taskNoteStr+"",
        taskCreator:""+logged+""
     }
    
   
     );
  //   setTaskNotes(taskNotes)
  setTaskNotes(taskNotes+"\n----------\nUser:"+logged+", Current State:Create, Date and Time:"+Date())
     console.log("Result form query "+res.data)
    } catch (e){
        console.error("Create task function - there was error "+e.message);
    }



  } else {
    alert("Task name already in used "+taskName +" please use another task name")
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


               {!hasAccess && <div>{taskName} : You do not have right to create task </div>} 
                 
                <br/>
                {hasAccess && <div> 
              
                 
                 
         

                
               <label>Task Name :</label>
               <br/>
               <div>{!readOnly&&<div><textarea className='deacriptionText' rows="1" cols="50" value={taskName} required onChange={(e) => { handleTaskNameChange(e) }} /></div>}</div>
               

              
               
               <br />
               <label>Task Description</label>
               <br/>
               <div>{!readOnly&&<div><textarea  rows="5" cols="50" value={taskdescription}  onChange={(e) => { handleTaskDescriptionChange(e) }} /></div>}</div>
               <div>{readOnly&&<div><textarea className='.descriptionText' rows="5" cols="50" value={taskdescription}   /></div>}</div>
               <br/>
               <label>Task Notes</label>

               <br/>
               <div>{!readOnly&&<textarea rows="7" cols="50" value={taskNotes}  onChange={(e) => { handleTaskNoteChange(e) }} />}</div>
               <div>{readOnly&&<div><textarea rows="7" cols="50" value={taskNotes}/></div>}</div>
                <br/>
                <div>{!readOnly&&<input type="submit" value="Create Task"/>}</div>
                <div>{readOnly&&<div><div>Task created - please go to Main Kanban Board to View Task</div><GoMain/></div>}</div>
                <div>{readOnly&&<div><Button onClick={anotherTask}>Create another Task</Button> </div>}</div>
               </div>
               }
    </form>
    </div>
    
    

    <button onClick={goMain}>Main Kanban Board</button>
    </div>
   
  
    );
   
}

export default CreateTask
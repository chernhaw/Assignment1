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
import GoMain from './GoMain'

function CreateApp(){

    const [ app_acronym, setApp_acronym] = useState('');
    const [ app_description, setApp_description] = useState('');
    const [ app_rnumber, setApp_rnumbern] = useState('');
    const [ app_start_date, setApp_Start_Date] = useState('');
    const [ app_end_date, setApp_End_Date] = useState('');

    const [groupToOpenList, setGroupToOpenList] = useState('') // use to open list 
    const [groupToOpen, setGroupToOpen] = useState('') 

    const [groupTodoList, setGroupTodoList] = useState('') // use todo list 
    const [groupToDo, setGroupToDo] = useState('') 

    const [groupDoingList, setGroupDoingList] = useState('') // use todo list 
    const [groupDoing, setGroupDoing] = useState('') 

    const [groupDoneList, setGroupDoneList] = useState('')
    const [groupDone, setGroupDone] = useState('') 
  //  const [grouplistresult, setGroupListsResult] = useState([]);

  const [groupCreateList, setGroupCreateList] = useState('')
  const [groupCreate, setGroupCreate] = useState('') 
    
    const [groupToOpenRemove, setGroupToOpenRemove] = useState('')
    const [grouplistresult, setGroupListsResult] = useState([]);

    
    var curgrouplist="";
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    console.log("Logged" +logged);
    console.log("Admin" +admin);
   
    const goEditPermission = () =>{

              
        navigate('../editPerm')
       
    }

    useEffect(() => {


        if (logged==null){
         navigate('../login')   
        }



        async function getAllGroup(){
            const res = await Axios.post('http://localhost:8080/listgroup',
                { groupname: null });
        
             const data = res.data;
        
            console.log("Query group response "+ res.data);
                  
           const size = res.data.length;
        
           //curgrouplist = "{"
            for ( var i=0; i<size; i++){
              
                     curgrouplist = curgrouplist + res.data[i].groupname + " "
            }
             
        
        
            console.log("Current group list" +curgrouplist)
            setGroupListsResult(data)
        }
        
        getAllGroup()
        
    },[])


    const handleAppCreateTaskChange=(event)=>{
        if (groupCreateList.search(event.target.value+" ")!=-1){
            alert(event.target.value+" is already assigned")
          } else {
              var curgrouplist = ""+groupToOpenList
              curgrouplist = curgrouplist + " "+event.target.value
               console.log("curgrouplist "+curgrouplist)
               setGroupCreateList(curgrouplist)
         
          }
    }

    const handleAppCreateTaskRemove=(event)=>{
        if (groupCreateList.search(event.target.value+" ")!=-1){
            alert(event.target.value+" is already assigned")
          } else {
              var curgrouplist = ""+groupToOpenList
              curgrouplist = curgrouplist + " "+event.target.value
               console.log("curgrouplist "+curgrouplist)
               setGroupCreateList(curgrouplist)
         
          }
    }

    const handleAppOpenRemove=(event)=>{
        var currentList = ""+groupToOpenList
        currentList = currentList.replace(event.target.value,'')
        setGroupToOpenList(currentList)
    }
  

    const handleAppOpenChange=(event)=>{
        if (groupToOpenList.search(event.target.value+" ")!=-1){
            alert(event.target.value+" is already assigned")
          } else {
              var curgrouplist = ""+groupToOpenList
              curgrouplist = curgrouplist + " "+event.target.value
               console.log("curgrouplist "+curgrouplist)
               setGroupToOpenList(curgrouplist)
         
          }
        
    }

    const handleAppTodoChange=(event)=>{

        if (groupTodoList.search(event.target.value+" ")!=-1){
            alert(event.target.value+" is already assigned")
          } else {
            var currentToDoList = ""+groupTodoList
            currentToDoList =currentToDoList+" "+event.target.value
            console.log("curgrouplist "+curgrouplist)
            setGroupTodoList(currentToDoList)
          }
          
    }

    const handleAppTodoRemove=(event)=>{
        var currentList = ""+groupTodoList
        currentList = currentList.replace(event.target.value,'')
       
        setGroupTodoList(currentList)
          
    }

    const handleAppDoingChange=(event)=>{

        if (groupDoingList.search(event.target.value+" ")!=-1){
            alert(event.target.value+" is already assigned")
          } else {
            var currentToDoList = ""+groupTodoList
            currentToDoList =currentToDoList+" "+event.target.value
            console.log("curgrouplist "+curgrouplist)
            setGroupTodoList(currentToDoList)
          }
    }

    const handleAppDoingRemove=(event)=>{
        var currentList = ""+groupDoingList
        currentList = currentList.replace(event.target.value,'')
        setGroupDoingList(currentList)

    }

    const handleAppDoneChange=(event)=>{
       
        if (groupDoneList.search(event.target.value+" ")!=-1){
            alert(event.target.value+" is already assigned")
          } else {

            var currentDoneList =" " +groupDoneList
            currentDoneList =currentDoneList +" "+ event.target.value
        setGroupDoneList(currentDoneList)
          }
          
    }

    const handleAppDoneRemove=(event)=>{
        var currentList = ""+groupDoneList
        currentList = currentList.replace(event.target.value,'')
        setGroupDoneList(currentList)
          
    }

    const handleAppAcronym =(e) =>{
       
        setApp_acronym(e.target.value)
    }

   

    const handleAppDescription =(e) =>{
        setApp_description(e.target.value)
    }

    const handleAppRnumber=(e)=>{
        setApp_rnumbern(e.target.value)
    }

    const handleAppStartDate=(e)=>{

        var endDate
            var startDate

        try{
        startDate = Date.parse(""+e.target.value+"")
        endDate = Date.parse(""+app_end_date+"")

        console.log("start date "+startDate)
        console.log("end date "+endDate)
        if (endDate<startDate){ 
            alert ("End date must be later than start date ")
        } else {
            setApp_Start_Date(""+e.target.value+"")
        }
       
    } catch (error){
        setApp_Start_Date(""+e.target.value+"")
    }
        
    }

    const handleAppEndDate=(e)=>{
        
            var endDate
            var startDate
             
        try {

            endDate = Date.parse(""+e.target.value+"")
            startDate = Date.parse(""+app_start_date+"")

            console.log("start date "+startDate)
            console.log("end date "+endDate)
            if (endDate<startDate){ 
                alert ("End date must be later than start date ")
            } else {
                setApp_End_Date(""+e.target.value+"")
            }

        } catch (error){
            setApp_End_Date(""+e.target.value+"")
        }
            
       

           // setApp_End_Date(""+e.target.value+"")
            console.log("App "+app_acronym+" end date "+ app_end_date)
        
    }

    const handleCreateApp=async(e)=>{
        e.preventDefault();
       
        console.log("Create app "+app_acronym)
        console.log("app description "+app_description)
        console.log("app start date "+app_start_date)
        console.log("app end date "+app_end_date)
    
        try {

            const res = await Axios.post('http://localhost:8080/createapp', 
            {  app_acronym: "" + app_acronym + "",
            app_description: ""+app_description+"",
            app_rnumber: ""+app_rnumber+"",
            app_start_date: ""+app_start_date+"",
            app_end_date: ""+app_end_date+"",
            app_permit_open: ""+groupToOpenList+"",
            app_permit_todolist: ""+groupTodoList+"",
            app_permit_doing:""+groupDoneList+"",
            app_permit_create:""+groupCreateList+"",
            app_permit_done:""+groupDoneList+""



         });
            console.log("Response length:"+""+res.data+"".length)
            
            if(res.data.username===undefined){
            
            }else {
           
      //      navigate('../usermgt');
            }
        

    } catch (e){
            console.error("Create app function - there was an creating app "+e.message);
        }
    }
  
    return (

    <div>
        <header className='Header'> <h1>Welcome {logged} </h1>
        <LogOut/> <GoMain/> </header>
    <div className='Login'>
    <h2>Create new App</h2>
    <div>
    <form onSubmit={(e)=>{handleCreateApp(e)}}>


    <label>App Acronym :</label>
    <input type="text" value={app_acronym} required onChange={(e) => { handleAppAcronym(e) }} />
    
    <br /><br/>
    <label>App Description :</label><br/>

    <textarea rows="5" cols="50" value={app_description} onChange={(e) => { handleAppDescription(e) }} />
    
    <br /><br/>
    <label>App R number :</label>
    <input type="text" value={app_rnumber}  onChange={(e) => { handleAppRnumber(e) }} />
    <br /><br/>
    <label>App start date :</label>
    <input type="date" value={app_start_date}  onChange={(e) => { handleAppStartDate(e) }} />
    <br/><br/>
    <label>App end date :</label>
    <input type="date" value={app_end_date} onChange={(e) => { handleAppEndDate(e) }} />
    <br/>
    <br/>  
    <div className='boxType'>
                 
    <label> Selected Group allow to Create Task in App </label><br/>
    <div className='boxTypeInner'>{groupToOpenList} </div>
                 
                    <br/>
                    <label> Add groups allow create Task</label>
                    <Select 
                value ={groupToOpen}
                onChange = {handleAppCreateTaskChange}
                input={<OutlinedInput label="Assign Open" />}>

                    {grouplistresult.map((group) => (
                <MenuItem
                key={group.groupname}
                value={group.groupname}  >
              {group.groupname}
            </MenuItem>
          
          ))}
               </Select>
               <br/>
               <label> Remove groups allow create Task</label>
                    <Select 
                value ={groupToOpen}
                onChange = {handleAppCreateTaskRemove}
                input={<OutlinedInput label="Assign Open" />}>

                    {grouplistresult.map((group) => (
                <MenuItem
                key={group.groupname}
                value={group.groupname}  >
              {group.groupname}
            </MenuItem>
          
          ))}
               </Select>
               <br/>
               
                    <br/>
</div>         
    <div className='boxType'>
                 
    <label> Selected Group allow to Open App </label><br/>
    <div className='boxTypeInner'>{groupToOpenList} </div>
                 
                    <br/>
                    <label> Add groups allow Open App</label>
                    <Select 
                value ={groupToOpen}
                onChange = {handleAppOpenChange}
                input={<OutlinedInput label="Assign Open" />}>

                    {grouplistresult.map((group) => (
                <MenuItem
                key={group.groupname}
                value={group.groupname}  >
              {group.groupname}
            </MenuItem>
          
          ))}
               </Select>
               <br/>
               <label> Remove groups allow Open App</label>
                    <Select 
                value ={groupToOpen}
                onChange = {handleAppOpenRemove}
                input={<OutlinedInput label="Assign Open" />}>

                    {grouplistresult.map((group) => (
                <MenuItem
                key={group.groupname}
                value={group.groupname}  >
              {group.groupname}
            </MenuItem>
          
          ))}
               </Select>
               <br/>
               
                    <br/>
</div>
<div className='boxType'>
                 
                 <label> Selected Group allow to Todo App </label><br/>
                 <div className='boxTypeInner'>{groupTodoList} </div>
                              
                                 <br/>
                                 <label> Add groups allow Todo App</label>
                                 <Select 
                             value ={groupToOpen}
                             onChange = {handleAppTodoChange}
                             input={<OutlinedInput label="Assign Open" />}>
             
                                 {grouplistresult.map((group) => (
                             <MenuItem
                             key={group.groupname}
                             value={group.groupname}  >
                           {group.groupname}
                         </MenuItem>
                       
                       ))}
                            </Select>
                            <br/>
                            <label> Remove groups allow Todo App</label>
                                 <Select 
                             value ={groupToOpen}
                             onChange = {handleAppTodoRemove}
                             input={<OutlinedInput label="Assign Open" />}>
             
                                 {grouplistresult.map((group) => (
                             <MenuItem
                             key={group.groupname}
                             value={group.groupname}  >
                           {group.groupname}
                         </MenuItem>
                       
                       ))}
                            </Select>
                            <br/>
                            
                                 <br/>
             </div>

             <div className='boxType'>
                 
                 <label> Selected Group allow to Doing App </label><br/>
                 <div className='boxTypeInner'>{groupDoingList} </div>
                              
                                 <br/>
                                 <label> Add groups allow Doing App</label>
                                 <Select 
                             value ={groupToOpen}
                             onChange = {handleAppDoingChange}
                             input={<OutlinedInput label="Assign Open" />}>
             
                                 {grouplistresult.map((group) => (
                             <MenuItem
                             key={group.groupname}
                             value={group.groupname}  >
                           {group.groupname}
                         </MenuItem>
                       
                       ))}
                            </Select>
                            <br/>
                            <label> Remove groups allow Doing App</label>
                                 <Select 
                             value ={groupToOpen}
                             onChange = {handleAppDoingRemove}
                             input={<OutlinedInput label="Assign Open" />}>
             
                                 {grouplistresult.map((group) => (
                             <MenuItem
                             key={group.groupname}
                             value={group.groupname}  >
                           {group.groupname}
                         </MenuItem>
                       
                       ))}
                            </Select>
                            <br/>
                            
                                 <br/>
             </div>
             <div className='boxType'>
                 
                 <label> Selected Group allow to Done App </label><br/>
                 <div className='boxTypeInner'>{groupDoneList} </div>
                              
                                 <br/>
                                 <label> Add groups allow Done App</label>
                                 <Select 
                             value ={groupToOpen}
                             onChange = {handleAppDoneChange}
                             input={<OutlinedInput label="Assign Open" />}>
             
                                 {grouplistresult.map((group) => (
                             <MenuItem
                             key={group.groupname}
                             value={group.groupname}  >
                           {group.groupname}
                         </MenuItem>
                       
                       ))}
                            </Select>
                            <br/>
                            <label> Remove groups allow Done App</label>
                                 <Select 
                             value ={groupToOpen}
                             onChange = {handleAppDoneRemove}
                             input={<OutlinedInput label="Assign Open" />}>
             
                                 {grouplistresult.map((group) => (
                             <MenuItem
                             key={group.groupname}
                             value={group.groupname}  >
                           {group.groupname}
                         </MenuItem>
                       
                       ))}
                            </Select>
                            <br/>
                            
                                 <br/>
             </div>


               
    <input type="submit" value="Create App"/>
    </form>

    
    </div>
    </div>
    
    </div>
   
);
 }

 export default CreateApp;
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

    

    const handleAppOpenChange=(event)=>{

        if (groupDoingList.search(event.target.value)==-1){
          alert(event.target.value+" is already assigned")
        }
        setGroupToOpenList(groupToOpenList+" "+event.target.value)
       // alert(groupToOpenList)
    }

    const handleAppToDoChange=(event)=>{
        setGroupTodoList(groupTodoList+" "+event.target.value)
        alert(groupTodoList)
    }

    const handleAppDoingChange=(event)=>{
        
        setGroupDoingList(groupDoingList+" "+event.target.value)
        alert(groupDoingList)
    }

    const handleAppDoneChange=(event)=>{
        setGroupDoneList(groupDoneList+" "+event.target.value)
        alert(groupDoneList)
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
       
        setApp_Start_Date(""+e.target.value+"")
        console.log("App "+app_acronym+" start date "+ app_start_date)
    }

    const handleAppEndDate=(e)=>{
        setApp_End_Date(""+e.target.value+"")
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
        <LogOut/> </header>
    <div className='Login'>
    <h2>Create new App</h2>
    <div>
    <form onSubmit={(e)=>{handleCreateApp(e)}}>
    <label>App Acronym :</label>
    <input type="text" value={app_acronym} required onChange={(e) => { handleAppAcronym(e) }} />
    
    <br /><br/>
    <label>App Description :</label>
    <input type="text" value={app_description} required onChange={(e) => { handleAppDescription(e) }} />
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
                    <label>Current group allow Open App ---</label>
                  {groupToOpenList} 
                    <br/>
                    <label> Select to add</label>
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

               <label>Current Group allow App Todo ---</label>
               {groupTodoList}
               <br/>
               <label> Select to add</label>
                    <Select 
                value ={groupToDo}
                onChange = {handleAppToDoChange}
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

            
               <label>Current Group allow App Doing --- </label>

                
                {groupDoingList}
                <br/>
                <label> Select to add</label>
                    <Select 
                value ={groupDoing}
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
               
                <label>Existing selected group --- {groupDoneList}</label><br/>
                <label> Select to add</label>    
                <Select 
                value ={groupDone}
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
    <input type="submit" value="Create App"/>
    </form>

    <div> <Button onClick={goEditPermission}>Set App Permission</Button> </div>
    </div>
    </div>
    
    </div>
   
);
 }

 export default CreateApp;
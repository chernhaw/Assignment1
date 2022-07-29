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

function EditApp(){

    const [ app_acronym, setApp_acronym] = useState('');
    const [ app_description, setApp_description] = useState('');
    const [ app_rnumber, setApp_rnumbern] = useState('');
    const [ app_start_date, setApp_Start_Date] = useState('');
    const [ app_end_date, setApp_End_Date] = useState('');

    const [appListOption, setAppListOption]=useState([])

    const [groupToOpenList, setGroupToOpenList] = useState('') // use to open list 
    const [groupToOpen, setGroupToOpen] = useState('') 

    const [groupTodoList, setGroupTodoList] = useState('') // use todo list 
    const [groupToDo, setGroupToDo] = useState('') 

    const [groupDoingList, setGroupDoingList] = useState('') // use todo list 
    const [groupDoing, setGroupDoing] = useState('') 

    const [groupDoneList, setGroupDoneList] = useState('')
    const [groupDone, setGroupDone] = useState('') 
    const [grouplistresult, setGroupListsResult] = useState([]);

    const [appacronym, setAppAcronym] = useState('')
    
    const [groupToOpenRemove, setGroupToOpenRemove] = useState('')
    const [applistresult, setAppListsResult] = useState([]);

   

    
    var curgrouplist="";
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    console.log("Logged" +logged);
    console.log("Admin" +admin);
   
   

    useEffect(() => {


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

        if (groupToOpenList.search(event.target.value)==-1){
          alert(event.target.value+" is already assigned")
        } else{
        setGroupToOpenList(groupToOpenList+" "+event.target.value)
        console.log("Updated group list "+groupToOpenList)
        }
       // alert(groupToOpenList)
    }

    const updateAddToDoList=(event)=>{

        
        if (groupTodoList.search(event.target.value)==-1){
            alert(event.target.value+" is already assigned")
          } else{
            setGroupTodoList(groupTodoList+ " "+event.target.value)
          }

       
        
    }

    const handleAppDoingChange=(event)=>{
        if (groupDoingList.search(event.target.value)==-1){
            alert(event.target.value+" is already assigned")
        } else {
        setGroupDoingList(groupDoingList+" "+event.target.value)
        }
    }

    const handleAppDoneChange=(event)=>{
        if (groupDoneList.search(event.target.value)==-1){
            alert(event.target.value+" is already assigned")
        } else{
        setGroupDoneList(groupDoneList+" "+event.target.value)
        }
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

    const handleAppCheck=async(e)=>{
        e.preventDefault();
       
        console.log("Query app "+app_acronym)
    
        
        try {

            const res = await Axios.post('http://localhost:8080/checkapp', 
            {  app_acronym: "" + app_acronym + ""});
            console.log("Response length:"+""+res.data+"".length)
            
            const data = res.data
          // alert("app result "+data.app_acronym)
                console.log("app result "+data[0].app_acronym);
                console.log("app description "+data[0].app_description);
                console.log("app rnumber "+data[0].app_rnumber);
                console.log("app startdate "+data[0].app_start_date);
                console.log("app enddate "+data[0].app_end_date);
                console.log("app permit_open "+ data[0].app_permit_open);
                console.log("app permit_todolist "+ data[0].app_permit_todolist);
                console.log("app permit_doing "+ data[0].app_permit_doing);
                console.log("app permit_done "+ data[0].app_permit_done);


              
                 setApp_description(data[0].app_description);
                 setApp_rnumbern(data[0].app_rnumber);
                 setApp_Start_Date(data[0].app_start_date);
                 setApp_End_Date(data[0].app_end_date);
                 setGroupToOpenList(data[0].app_permit_open);
                 setGroupTodoList(data[0].app_permit_todolist);
                 setGroupDoingList(data[0].app_permit_doing);
                 setGroupDoneList(data[0].app_permit_done);
        

    } catch (e){
            console.error("Checking app function - there was error getting information "+e.message);
        }
    }

    const handleCreateApp=async(e)=>{
        e.preventDefault();
       
        console.log("Create app "+app_acronym)
        console.log("app description "+app_description)
        console.log("app start date "+app_start_date)
        console.log("app end date "+app_end_date)
    
        try {

            const res = await Axios.post('http://localhost:8080/updateapp', 
            {  app_acronym: "" + app_acronym + "",
            app_description: ""+app_description+"",
            app_rnumber: ""+app_rnumber+"",
            app_start_date: ""+app_start_date+"",
            app_end_date: ""+app_end_date+"",
            app_permit_open: ""+groupToOpenList+"",
            app_permit_todolist: ""+groupTodoList+"",
            app_permit_doing:""+groupDoingList+"",
            app_permit_done:""+groupDoneList+""



         });
            console.log("Response length:"+""+res.data+"".length)
            
            if(res.data.username===undefined){
            
            }else {
           
      //      navigate('../usermgt');
            }
        

    } catch (e){
            console.error("Create app function - there was an updating app "+e.message);
        }
    }
  
    return (

    <div>
        <header className='Header'> <h1>Welcome {logged} </h1>
        <LogOut/> </header>
    <div className='Login'>

    <h2>Edit App</h2>
    <form onSubmit={(e)=>{handleAppCheck(e)}}>
        <label>Select App to Edit</label>
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
               <input type="submit" value="Edit App" />
        </form>
   
    <div>
    <form onSubmit={(e)=>{handleCreateApp(e)}}>

   
    
    <label>App Description : {app_description}</label>
    <input type="text" value={app_rnumber} required onChange={(e) => { handleAppDescription(e) }} />
    <br />
    <label>App R number :</label>
    <input type="text" value={app_rnumber} required onChange={(e) => { handleAppRnumber(e) }} />
    <br />
    <label>App start date :</label>
    <input type="date" value={app_start_date} required onChange={(e) => { handleAppStartDate(e) }} />
    <br/>
    <label>App end date :</label>
    <input type="date" value={app_end_date} required onChange={(e) => { handleAppEndDate(e) }} />
    <br/>
    <label>App To do Group - current groups :  {groupTodoList}</label><br/>
    
                    <form onSubmit={updateAddToDoList()}>
                    <label>Select Group Todo</label> 
                    <Select 
                value= {groupToDo}
              
                input={<OutlinedInput label="Assign Admin" />}>

                    {grouplistresult.map((group) => (
                <MenuItem
                key={group.groupname}
                value={group.groupname}  >
              {group.groupname}
            </MenuItem>
          
          ))}
               </Select>
               

     </form>         
    <input type="submit" value="Update App "/>
    </form>

    
    </div>
    </div>
    
    </div>
   
);
 }

 export default EditApp;
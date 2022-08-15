import {useEffect,useState} from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import './LoginForm.css';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import LogOut from './Logout';
import GoMain from './GoMain';

function EditApp(){

    const [ app_acronym, setApp_acronym] = useState('');
    const [ app_description, setApp_description] = useState('');
    const [ app_rnumber, setApp_rnumbern] = useState('');
    const [ app_start_date, setApp_Start_Date] = useState('');
    const [ app_end_date, setApp_End_Date] = useState('');

    const [appListOption, setAppListOption]=useState([])

    const [groupToOpenList, setGroupToOpenList] = useState('') // use to open list 
    const [groupToOpen, setGroupToOpen] = useState('') 
    const [groupToOpenOption, setGroupToOpenOption] = useState('')

    const [groupTodoList, setGroupTodoList] = useState('') // use todo list 
    const [groupToDo, setGroupToDo] = useState('') 

    const [groupDoingList, setGroupDoingList] = useState('') // use todo list 
    const [groupDoing, setGroupDoing] = useState('') 

    const [groupDoneList, setGroupDoneList] = useState('')
    const [groupDone, setGroupDone] = useState('') 
    const [grouplistresult, setGroupListsResult] = useState([]);
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

        if (groupToOpenList.search(event.target.value)!=-1){
          alert(event.target.value+" is already assigned")
        } else {
            var curgrouplist = ""+groupToOpenList
            curgrouplist = curgrouplist + " "+event.target.value
             console.log("curgrouplist "+curgrouplist)
             setGroupToOpenList(curgrouplist)
       
        }
    }

    const handleAppToDoChange=(event)=>{
        if (groupTodoList.search(event.target.value)!=-1){
            alert(event.target.value+" is already assigned")
          } else {
            var currentToDoList = ""+groupTodoList
            currentToDoList =curgrouplist+" "+event.target.value
            console.log("curgrouplist "+curgrouplist)
            setGroupTodoList(currentToDoList)
          }
      //  alert(groupTodoList)
    }

    const handleAppDoingChange=(event)=>{
        if (groupDoingList.search(event.target.value)!=-1){
            alert(event.target.value+" is already assigned")
          } else {

            var currentDoingList = ""+groupDoingList
            currentDoingList =currentDoingList+" "+event.target.value
            console.log("curgrouplist "+curgrouplist)
        setGroupDoingList(currentDoingList)
          }
      //  alert(groupDoingList)
    }

    const handleAppDoneChange=(event)=>{
        if (groupDoneList.search(event.target.value)!=-1){
            alert(event.target.value+" is already assigned")
          } else {

            var currentDoneList = groupDoingList+" "+event.target.value
        setGroupDoneList(currentDoneList)
          }

       
     //   alert(groupDoneList)
    }

   
    const handleAppOpenRemove=(event)=>{
        var currentList = ""+groupToOpenList
        currentList = currentList.replace(event.target.value,'')
        setGroupToOpenList(currentList)
    }
  
    const handleAppTodoRemove=(event)=>{
        var currentList = ""+groupTodoList
        currentList = currentList.replace(event.target.value,'')
        setGroupTodoList(currentList)
    }

    const handleAppDoingRemove=(event)=>{
        var currentList = ""+groupDoingList
        currentList = currentList.replace(event.target.value,'')
        setGroupDoingList(currentList)
    }

    const handleAppDoneRemove=(event)=>{
        var currentList = ""+groupDoneList
        currentList = currentList.replace(event.target.value,'')
        setGroupDoneList(currentList)
     //   alert(groupDoneList)
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
                console.log("app startdate "+data[0].app_startdate);
                console.log("app enddate "+data[0].app_enddate);
                console.log("app permit_open "+ data[0].app_permit_open);
                console.log("app permit_todolist "+ data[0].app_permit_todolist);
                console.log("app permit_doing "+ data[0].app_permit_doing);
                console.log("app permit_done "+ data[0].app_permit_done);


              
                 setApp_description(data[0].app_description);
                 setApp_rnumbern(data[0].app_rnumber);

                 try {

                //  data[0].app_startdate
                 setApp_Start_Date(""+data[0].app_startdate.split('T')[0]+"");
                 } catch (error){
                  setApp_Start_Date("not set");
                 }

                 
                 try {


                  setApp_End_Date(""+data[0].app_enddate.split('T')[0]+"");
                  } catch (error){
                   setApp_End_Date("not set");
                  }

                 
              //   setApp_End_Date(data[0].app_enddate);
                 setGroupToOpenList(data[0].app_permit_open);
                 setGroupTodoList(data[0].app_permit_todolist);
                 setGroupDoingList(data[0].app_permit_doing);
                 setGroupDoneList(data[0].app_permit_done);

                 var arrOpen = groupToOpenList.split(" ")

                setGroupToOpenOption(JSON.stringify(arrOpen));
        

    } catch (e){
            console.error("Checking app function - there was error getting information "+e.message);
        }
    }

    const handleEditApp=async(e)=>{
        e.preventDefault();
    
        try {
            console.log("app description "+app_description);
                
            console.log("app startdate "+app_start_date);
            console.log("app enddate "+app_end_date);
            console.log("app permit_open "+ groupToOpenList);
            console.log("app permit_todolist "+ groupTodoList);
            console.log("app permit_doing "+ groupDoingList);
            console.log("app permit_done "+ groupDoneList
            );

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

        
               
            console.log("Response length:"+""+res.data+"")
            
          

    } catch (e){
            console.error("Create app function - there was an updating app "+e.message);
        }
    }
  
    return (

    <div>
        <header className='Header'> <h1>Welcome {logged} </h1>
        <LogOut/> <GoMain/></header>
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
    <form onSubmit={(e)=>{handleEditApp(e)}}>

   
    <div className='boxType'>
    <label><b>App Description : {app_description} </b></label><br/>
    <label>Update description</label><br/>
    <input type="text" value={app_description}  onChange={(e) => { handleAppDescription(e) }} />
    <br />
    <br />
    </div>
    <div className='boxType'>
    <label><b>App R number :</b></label><br/>
    <label>Update R number</label><br/>
    <input type="text" value={app_rnumber}  onChange={(e) => { handleAppRnumber(e) }} />
    <br />
    <br />
    </div>
    <div className='boxType'>
    <label><b>App start date :</b></label>
    <br/>
     Current value : {app_start_date} 
     <br/>
     <label>Update start date</label>
    <input type="date" value={app_start_date} onChange={(e) => { handleAppStartDate(e) }} />
    <br/>
    <br/>
    <label><b>App end date :</b></label>
    <br/>
   
    Current value : {app_end_date} 
     <br/>
     <label>Update end date</label>
    <input type="date" value={app_end_date}  onChange={(e) => { handleAppEndDate(e) }} />
    <br/>
    <br/>
    </div>
    <div className='boxType'>
    <label><b>App Open  :</b></label><br/>        
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
                <br/>
               </Select>

               <br/>
             
                <label> Remove Group to Open</label>    
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
               </div>
               <div className='boxType'>
               <label><b>App Todo  :</b></label><br/> 
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
                <label> Remove Group to Todo</label>    
                <Select 
                value ={groupToDo}
                onChange = {handleAppTodoRemove}
                input={<OutlinedInput label="Assign Open" />}>

                    {grouplistresult.map((group) => (
                <MenuItem
                key={group.groupname}
                value={group.groupname}  >
              {group.groupname}
            </MenuItem>
          
          ))}
          <br/>
          
               </Select>
               <br/>
               </div>
               <div className='boxType'>
               <label><b>App Doing  :</b></label><br/> 
              
               <label>Current Group allow App Doing --- {groupDoingList}</label>
                <br/>
                <label> Select to add </label>
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
            
             <label> Select to remove from Doing List </label>
                 <Select 
             value ={groupDoing}
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
               </div>
               <div className='boxType'>
               <label><b>App Done  :</b></label><br/>
               <label>Current Group allow App Done --- {groupDoneList}</label>
                <br/>
                <label> Select to add </label>
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
            
             <label> Select to remove from Done List </label>
                 <Select 
             value ={groupDoing}
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
            </div>
    <br />
    <input type="submit" value="Update App "/>
    </form>

    
    </div>
    </div>
    
    </div>
   
);
 }

 export default EditApp;
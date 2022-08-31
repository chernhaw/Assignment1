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
    const [ app_rnumber, setApp_rnumber] = useState('');
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
    const [groupCreateList, setGroupCreateList] = useState('')
    const [groupCreate, setGroupCreate] = useState('') 
    const [showupdatemsg, setShowUpdateMsg]=useState()


    var curgrouplist="";
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    console.log("Logged" +logged);
    console.log("Admin" +admin);
   
   

    useEffect(() => {
      setShowUpdateMsg('')

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


    const handleAppCreateTaskChange=(event)=>{
     // alert(groupCreateList)
      if (groupCreateList.search(event.target.value+" ")!=-1){
          alert(event.target.value+" is already assigned")
        } else {
            var curgrouplist = ""+groupCreateList
            curgrouplist = curgrouplist + " "+event.target.value
             console.log("curgrouplist "+curgrouplist)
             setGroupCreateList(curgrouplist)
             setShowUpdateMsg("")

       
        }
        
  }

    const handleAppCreateTaskRemove=(event)=>{
        var currentList = ""+groupCreateList
        currentList = currentList.replace(event.target.value,'')
        setGroupCreateList(currentList)
        setShowUpdateMsg("")

       
    }


    
    const handleAppOpenChange=(event)=>{

        if (groupToOpenList.search(event.target.value)!=-1){
          alert(event.target.value+" is already assigned")
        } else {
            var curgrouplist = ""+groupToOpenList
            curgrouplist = curgrouplist + " "+event.target.value
             console.log("curgrouplist "+curgrouplist)
             setGroupToOpenList(curgrouplist)
             setShowUpdateMsg("")

       
        }
    }

    const handleAppToDoChange=(event)=>{
        if (groupTodoList.search(event.target.value)!=-1){
            alert(event.target.value+" is already assigned")
          } else {
            var currentToDoList = ""+groupTodoList
            currentToDoList =currentToDoList+" "+event.target.value
            console.log("curgrouplist "+curgrouplist)
            setGroupTodoList(currentToDoList)
            setShowUpdateMsg("")

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
        setShowUpdateMsg("")

          }
      //  alert(groupDoingList)
    }

    const handleAppDoneChange=(event)=>{
        if (groupDoneList.search(event.target.value)!=-1){
            alert(event.target.value+" is already assigned")
          } else {

            var currentDoneList =" " +groupDoneList
            currentDoneList =currentDoneList +" "+ event.target.value
        setGroupDoneList(currentDoneList)
        setShowUpdateMsg("")

          }

       
     //   alert(groupDoneList)
    }

   
    const handleAppOpenRemove=(event)=>{
        var currentList = ""+groupToOpenList
        currentList = currentList.replace(event.target.value,'')
        setGroupToOpenList(currentList)
        setShowUpdateMsg("")

    }
  
    const handleAppTodoRemove=(event)=>{
        var currentList = ""+groupTodoList
        currentList = currentList.replace(event.target.value,'')
        setGroupTodoList(currentList)
        setShowUpdateMsg("")

    }

    const handleAppDoingRemove=(event)=>{
        var currentList = ""+groupDoingList
        currentList = currentList.replace(event.target.value,'')
        setGroupDoingList(currentList)
        setShowUpdateMsg("")

    }

    const handleAppDoneRemove=(event)=>{
        var currentList = ""+groupDoneList
        currentList = currentList.replace(event.target.value,'')
        setGroupDoneList(currentList)
        setShowUpdateMsg("")

     //   alert(groupDoneList)
    }
 
    const handleAppAcronym =(e) =>{
        setApp_acronym(e.target.value)
        setShowUpdateMsg("")

    }

   

    const handleAppDescription =(e) =>{
        setApp_description(e.target.value)
        setShowUpdateMsg("")

    }

    const handleAppRnumber=(e)=>{

      const reg = new RegExp('^[0-9]+$');
    
        setApp_rnumber(e.target.value)
        setShowUpdateMsg("")
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
  setShowUpdateMsg()
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
          
     
      setShowUpdateMsg()

         // setApp_End_Date(""+e.target.value+"")
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
                console.log("app permit_create "+ data[0].app_permit_create);
                console.log("app permit_open "+ data[0].app_permit_open);
                console.log("app permit_todolist "+ data[0].app_permit_todolist);
                console.log("app permit_doing "+ data[0].app_permit_doing);
                console.log("app permit_done "+ data[0].app_permit_done);


              
                 setApp_description(data[0].app_description);
                 setApp_rnumber(data[0].app_rnumber);

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
                 
                    
                try {
                  data[0].app_permit_create.split("")
                  setGroupCreateList(data[0].app_permit_create);

                } catch (error){
                  setGroupCreateList("");
                }



                try {
                  data[0].app_permit_open.split("")
                  setGroupToOpenList(data[0].app_permit_open);

                } catch (error){
                  setGroupToOpenList("");
                }


                try {
                  data[0].app_permit_todo.split("")
                  setGroupTodoList(data[0].app_permit_todolist);

                } catch (error){
                  setGroupTodoList("");
                }
               //  setGroupToOpenList(data[0].app_permit_open);
                
                 
               try {
                data[0].app_permit_doing.split("")
                setGroupDoingList(data[0].app_permit_doing);

              } catch (error){
                setGroupDoingList("");
              }
               

              try {
                data[0].app_permit_done.split("")
                setGroupDoneList(data[0].app_permit_done);

              } catch (error){
                setGroupDoneList("");
              }
              

                 var arrOpen = groupToOpenList.split(" ")

                setGroupToOpenOption(JSON.stringify(arrOpen));
        

    } catch (e){
            console.error("Checking app function - there was error getting information "+e.message);
        }
    }

    function checkForNums (input) {
      let result = /^\d+$/.test(input);
      return result
    }

    const handleEditApp=async(e)=>{
        e.preventDefault();
        
        var proceed = true 
        if ( checkForNums(app_rnumber)==false){
          alert("Please enter a integer for R Number")
          proceed=false
         }

        

        if(app_description.indexOf("'")>-1){
          proceed = true 
         
          alert("App description should not have ' character")
        }

        if (proceed){
          

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
            app_permit_done:""+groupDoneList+"",
            app_permit_create:""+groupCreateList+"",
         });

        
         setShowUpdateMsg("App Updated")
            console.log("Response length:"+""+res.data+"")
            
           

    } catch (e){
            console.error("Create app function - there was an updating app "+e.message);
        }
      }
    }
  
    return (

    <div>
        <header className='Header'> <h1>Welcome {logged} </h1>
        <LogOut/> <GoMain/></header>
    <div className='Login'>

    <h2>Edit App</h2>

     <div>
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
        </div> 
    <div>
    
    <form onSubmit={(e)=>{handleEditApp(e)}}>

      

   
    <div className='boxType'>
    <label><b>App Description : {app_description} </b></label><br/>
    <label>Update description</label><br/>

     <textarea rows="4" cols="50" value={app_description}  onChange={(e) => { handleAppDescription(e) }} />
    <br />
    <br />
    </div>
    <div className='boxType'>
    <label><b>App R number :</b>{app_rnumber}</label><br/>
    <br /><br/>
    <label>App R number :</label>
    <input type="number" value={app_rnumber} required onChange={(e) => { handleAppRnumber(e) }} ></input>


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
    <label><b>App create Task - current groups:</b></label><br/>   
    <div className='boxTypeInner'>{groupCreateList} </div>
                 
                    <br/>
                    <label> Add groups allow create Task</label>
                    <Select 
                value ={groupCreate}
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
    <label><b>App Open - current groups:</b></label><br/>        
                   
                    <br/>
                  <div className='boxTypeInner'>{groupToOpenList} </div>
                    <br/>
                    <label> Add Group allow to Open</label>
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
             
                <label>Remove Group allow to Open</label>    
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
               <label><b>App Todo - current groups:</b></label><br/> 
               <div className='boxTypeInner'> {groupTodoList} </div>
              
               <br/>
               <label> Select to group allow todo</label>
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
                <label> Remove Group allowed Todo</label>    
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
               <label><b>App Doing - current groups:</b></label><br/> 
              
               
               <div className='boxTypeInner'> {groupDoingList} </div>
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
            
             <label> Select group to remove from Doing  </label>
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
               <label><b>App Done -current groups :</b></label><br/>
               
               <div className='boxTypeInner'> {groupDoneList} </div>
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

    <div><input type="submit" value="Update App"/>{showupdatemsg}</div>
    
   
    </form>

    
    </div>
    </div>
    
    </div>
   
);
 }

 export default EditApp;
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

    const [applistresult, setAppListsResult] = useState('');

    const [hasAccess, setHasAccess]=useState('false')

    const [readOnly, setReadOnly]=useState()
    
    var curgrouplist="";
    var curapplist ="";
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    console.log("Logged" +logged);
    console.log("Admin" +admin);
   
    const goEditPermission = () =>{

              
        navigate('../editPerm')
       
    }

    useEffect(() => {
        setApp_Start_Date("")
        setApp_End_Date("")

        setHasAccess(false)
        if (logged==null){
         navigate('../login')   
        }

        // check if user has APPLEAD Access
        async function checkAssess(){
            const res = await Axios.post('http://localhost:8080/appaccess');

          //const res = await Axios.post('http://localhost:8080/lead');  // create app
            const size = res.data.length;

            var userlist =""  

              var accessData = res.data
        var access_member_str=""
        console.log("Users able to change update this state : ")
        
        for (var i=0; i<accessData.length; i++){
          console.log(accessData[i].username)
          access_member_str= access_member_str + accessData[i].username + " "
          console.log(""+logged+""===""+accessData[i].username+"")

          if (logged===accessData[i].username){
              setHasAccess(true)
          }
          
        }


        }

        checkAssess()
        console.log(logged+ " has access "+hasAccess)

     //   setHasAccess(true)
        async function getAllApp(){
            const res = await Axios.post('http://localhost:8080/listapp');
        
            
          
             const size = res.data.length;
 
             //curgrouplist = "{"
              for ( var i=0; i<size; i++){
                
                curapplist = curapplist+ " " +res.data[i].app_acronym
                 console.log("current app list "+ curapplist)
              }

             // setAppListsResult(curapplist)

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

    async function getAllApp(){
        const res = await Axios.post('http://localhost:8080/listapp');
    
        
      
         const size = res.data.length;

         //curgrouplist = "{"
          for ( var i=0; i<size; i++){
            
            curapplist = curapplist+ " " +res.data[i].app_acronym
             console.log("current user list "+ curapplist)
          }

         // setAppListsResult(curapplist)

    }

    const handleAppCreateTaskChange=(event)=>{
        if (groupCreateList.search(event.target.value+" ")!=-1){
            alert(event.target.value+" is already assigned")
          } else {
              var curgrouplist = ""+groupCreateList
              curgrouplist = curgrouplist + " "+event.target.value
               console.log("curgrouplist "+curgrouplist)
               setGroupCreateList(curgrouplist)
         
          }
    }

    const handleAppCreateTaskRemove=(event)=>{
        var currentList = ""+groupCreateList
        currentList = currentList.replace(event.target.value,'')
        setGroupCreateList(currentList)
       
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
            var currentDoingList = ""+groupDoingList
            currentDoingList =currentDoingList+" "+event.target.value
            console.log("curgrouplist "+currentDoingList)
            setGroupDoingList(currentDoingList)
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

   

    function checkForNums (input) {
        let result = /^\d+$/.test(input)
        return result
      }
        
        
    const handleAppDescription =(e) =>{
      
           
            setApp_description(e.target.value)
        
       
    }

    const handleAppRnumber=(e)=>{
       
        var app_rnumber_nospace = ""+e.target.value+"".replaceAll(' ','')
        setApp_rnumbern(app_rnumber_nospace)
         //   setApp_rnumbern(e.target.value)
       
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
        e.preventDefault()
        getAllApp()
       
        var tocreateApp = true

        console.log("Create app "+app_acronym)
        console.log("app description "+app_description)
        console.log("app start date "+app_start_date)
        console.log("app end date "+app_end_date)
//groupCreateList.search(event.target.value+" ")!=-1


            console.log("Current apps "+ curapplist)
            if(curapplist.search(app_acronym)!=-1){
                alert("App "+app_acronym+" already exist - please use another name")
                tocreateApp=false
            }
           

           // var app_rnumber_nospace = ""+app_rnumber+"".replaceAll(' ','')
           // setApp_rnumbern(app_rnumber_nospace)
           if ( checkForNums(app_rnumber)==false){
            alert("Please enter a integer for R Number")
            tocreateApp=false
           }
         
           var app_descriptionStr = app_description.replace("'", "~")

          // if(app_description.indexOf("'")>-1){
          //   var tocreateApp = false
          //   alert("App description should not have ' character")
          // }

          // if( app_acronym.length>40) {
          //   alert("The acronym should be less than 40 char")
          //   tocreateApp=false
          // }

          // if( app_acronym.indexOf("'")>-1) {
          //   alert("App description should not have ' character")
          //   tocreateApp=false
          // }
           try {

            const res = await Axios.post('http://localhost:8080/checkapp', 
            {  app_acronym: "" + app_acronym + ""});
            console.log("Response length:"+""+res.data+"".length)
            
            const data = res.data
          // alert("app result "+data.app_acronym)
                console.log("app result "+data[0].app_acronym);
                
                if (data[0].app_acronym==app_acronym){
                    tocreateApp=false
                    alert ("App already exist - "+app_acronym)
                }
                
    } catch (err){
        console.error("Create app function - there was an creating app "+e.message);
    }

    if(tocreateApp){


        try {

            setReadOnly(true)

            const res = await Axios.post('http://localhost:8080/createapp', 
            {  app_acronym: app_acronym ,
            app_description: app_description,
            app_rnumber: app_rnumber,
            app_start_date: app_start_date,
            app_end_date: app_end_date,
            app_permit_open: groupToOpenList,
            app_permit_todolist: groupTodoList,
            app_permit_doing:groupDoneList,
            app_permit_create:groupCreateList,
            app_permit_done:groupDoneList

         });
            console.log("Response length:"+""+res.data+"".length)
            
           
            
       

    } catch (e){
            console.error("Create app function - there was an creating app "+e.message);
        }
    }
}
    return (

    <div>
        <header className='Header'> <h1>Welcome {logged} </h1>
        <LogOut/> <GoMain/> </header>
    <div className='Login'>
    <h2>Create new App</h2>
    {!hasAccess && <div>You did not have right to create App </div>} 

    {hasAccess && 
    <div>
    <form onSubmit={(e)=>{handleCreateApp(e)}}>


    <label>App Acronym :</label>
    <input type="text" value={app_acronym} required onChange={(e) => { handleAppAcronym(e) }} />
    
    <br /><br/>
    <label>App Description :</label><br/>

    <textarea className='descriptionText' rows="5" cols="50" value={app_description} onChange={(e) => { handleAppDescription(e) }} />
    
    <br /><br/>
    <label>App R number :</label>
    <input type="number" value={app_rnumber} required onChange={(e) => { handleAppRnumber(e) }} />
    <br /><br/>
    <label>App start date :</label>
    <input type="date" value={app_start_date} required onChange={(e) => { handleAppStartDate(e) }} />
    <br/><br/>
    <label>App end date :</label>
    <input type="date" value={app_end_date} required onChange={(e) => { handleAppEndDate(e) }} />
    <br/>
    <br/>  
    <div className='boxType'>
                 
    <label> Selected Group allow to Create Task in App </label><br/>
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
                             value ={groupTodoList}
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


               
             <div>{!readOnly&&<div><input type="submit" value="Create App"/></div>}</div>
    <div>{readOnly&&<div>App created - please go to Main Kanban Board access the Kanban for App <GoMain/></div>}</div>
    </form>

    
    </div>}
    </div>
    
    </div>
   
);
 }

 export default CreateApp;
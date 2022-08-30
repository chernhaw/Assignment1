import { useEffect, useState } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import { resolvePath, useNavigate } from "react-router-dom";


import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import LogOut from './Logout';
import './App.css';
import axios from 'axios';
function GroupRole() {


    var groupmembers = ''
    var userlist = ''


    const [groups, setGroups] = useState();
    const [showgroups, setShowGroups] = useState('');
    const [groupassigntolead, setGroupAssignToLead] = useState('')
    const [groupassigntopjlead, setGroupAssignToPjLead] = useState('')
    const [assignedPMgroup, setAssignedPMGroup]= useState('');

    const [groupRemoveToPM,setGroupRemoveToPM ]=useState('');
    const [assignedAppLeadgroup, setAssignedAppLeadGroup]= useState('');

    const [groupremovetolead, setGroupRemoveToLead]=useState('')
    const [groupRemoveToProjectLd, setGroupRemoveToProjectLd]=useState('')
    const [groupassigntopm, setGroupAssignToPM] = useState('');

    const [appLeadList, setAppLeadList]= useState('');

    const [projectLeadList, setProjectLeadList]=useState('');
   
    
    const [pmList, setPMList]= useState('');


    
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    
    useEffect( () => {

        var curgrouplist=''
        //window.location.reload(blnReload)
        if (logged == null) {

            navigate('../login')
        }
        if (admin === 0) {
          
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
            setShowGroups(curgrouplist)
           
        }
        getAllGroup()    
    
        }, [])

        const goGroup = () =>{     
            navigate('../groupmgt')    
     }

        const goMain = () => {

            navigate('../main')
        }
       
        const checkProjectLead = async(event)=>{

            event.preventDefault()

            var curgrouplist=''
            const res = await Axios.post('http://localhost:8080/listLead',
                { groupname: null });
        
             const data = res.data;                  
           const size = res.data.length;
        
           //curgrouplist = "{"
            for ( var i=0; i<size; i++){
              
                     curgrouplist = curgrouplist + res.data[i].groupname + " "
            }
            console.log("Current group list : " +curgrouplist)
            
            setProjectLeadList(curgrouplist)

            
        }
        
        const checkProjectManager= async(event)=>{

            event.preventDefault()

            var curgrouplist=''
            const res = await Axios.post('http://localhost:8080/listPM',
                { groupname: null });
        
             const data = res.data;                  
           const size = res.data.length;
        
           //curgrouplist = "{"
            for ( var i=0; i<size; i++){
              
                     curgrouplist = curgrouplist + res.data[i].groupname + " "
            }
            console.log("Current group list : " +curgrouplist)
            
            setPMList(curgrouplist)


        }

        const checkAppLead = async(event)=>{

            event.preventDefault()

            var curgrouplist=''
            const res = await Axios.post('http://localhost:8080/listApplead',
                { groupname: null });
        
             const data = res.data;                  
           const size = res.data.length;
        
           //curgrouplist = "{"
            for ( var i=0; i<size; i++){
              
                     curgrouplist = curgrouplist + res.data[i].groupname + " "
            }
            console.log("Current group list : " +curgrouplist)
            
            setAppLeadList(curgrouplist)

            
        }


        //groupassigntopjlead

        const handleUpdateAppLeadRemoveGroup=async(event)=>{
            
           
           var appLeadRemove = ""+groupremovetolead

            console.log("new applead list "+appLeadList)

            const res = await Axios.post('http://localhost:8080/removeApplead',
    
                   { groupname: "" + appLeadRemove +"" });

        }
       

        const handleUpdateAppLeadGroup=async(event)=>{

            var appleadgroup = ""+groupassigntolead+""

            const res = await Axios.post('http://localhost:8080/updateAppLead',
    
                     { groupname: "" + appleadgroup +"" });

        }


        const handleRemovePjtLeadGroup=async(event)=>{

            var leadgroup = ""+groupRemoveToProjectLd+""
           
            const res = await Axios.post('http://localhost:8080/removeLead',
    
                     { groupname: "" +leadgroup+"" });

        }


        const handleUpdatePjtLeadGroup=async(event)=>{

            var updateprojectLeads = ""+projectLeadList+"" 
            const res = await Axios.post('http://localhost:8080/updateLead',
    
                     { groupnames: "" + updateprojectLeads +"" });

        }

        const handleUpdatePMGroup=async(event)=>{

            
            var updatePM =  ""+groupassigntopm
            console.log("PM "+updatePM)
            alert(updatePM)
            const res = await Axios.post('http://localhost:8080/updatePM',
    
                     { groupname: "" + updatePM +"" });

           

        }

        const handleRemovePMGroup=async(event)=>{

            var updatePM = ""+groupRemoveToPM+""

            const res = await Axios.post('http://localhost:8080/removePM',
    
                     { groupname: "" + updatePM +"" });

           

        }
        const handleSetRemovePjLeadGroup = (e) => {
           setGroupRemoveToProjectLd(e.target.value)
        }


        const handleAppGroupNameChange = (e) => {
            setGroupAssignToLead(e.target.value);
    
        }

        const handleProjectLdGroupNameChange=(e)=>{
            setGroupAssignToPjLead(e.target.value)
        }
       
        const handleAppGroupNameRemoveChange=(e)=>{
            setGroupRemoveToLead(e.target.value);
        }
        const handleProjectMgerGroupNameChange=(e)=>{
            setGroupAssignToPM(e.target.value)
        }
        
        const handleProjectMgerGroupRemoveChange=(e)=>{
            setGroupRemoveToPM(e.target.value)
        }
        
        
        
        
      
        
    return (
        <div>
            <header className='Header'>
                <h3>Welcome {logged} </h3>
                <h3>
                    <Button onClick={goMain}>Main </Button>
                    <Button onClick={goGroup}>Group Management </Button>
                   <LogOut/>

                    <Button onClick={goGroup}>Previous Screen</Button>
                </h3>
            </header>
          
           <h3>List group that can be added to PM/App Lead/Proj Lead role ( if they are not already assigned )</h3> 
          
           <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)", }}>
            {showgroups.split(" ").map((group)=>{
                
                    return(
                        <div key={group} style={{border:"1px solid #000"}}>
                            {group}
                        </div>
                    )
                
               
            })}
            </div>    
            <h3> App Lead</h3>
            
            <form onSubmit={(e)=> {checkAppLead(e)}}>
            <input type="submit" value="Click to Check Current Groups" />
            <br/>
            {appLeadList}
            </form>
            <br/>
           <form onSubmit={(e) => { handleUpdateAppLeadGroup(e) }}>
           
           <label>Enter Group to Assign as App Lead</label>
           <input type="text" value={groupassigntolead} required onChange={(e) => { handleAppGroupNameChange(e) }} />
                   
                    <br/>
                    <input type="submit" value="Assign Group to App Lead" />
                </form>

                <form onSubmit={(e) => { handleUpdateAppLeadRemoveGroup(e) }}>
           
           <label>Enter Group remove App Lead</label>
           <br/>
           <input type="text" value={groupremovetolead} required onChange={(e) => { handleAppGroupNameRemoveChange(e) }} />
                   
                    <br/>
                    <input type="submit" value="Remove Group to App Lead" />
                </form>


                <h3> Project Lead</h3>

                <form onSubmit={(e)=> {checkProjectLead(e)}}>
            <input type="submit" value="Click to Check Current Groups" />
            <br/>
            {projectLeadList}
            </form>
            <form onSubmit={(e) => { handleUpdatePjtLeadGroup(e) }}>
           
           <label>Enter Group to Assign as Project Lead</label>
           <input type="text" value={groupassigntopjlead} required onChange={(e) => { handleProjectLdGroupNameChange(e) }} />
                   
                    <br/>
                    <input type="submit" value="Assign Group" />
                </form>


                <form onSubmit={(e) => { handleRemovePjtLeadGroup(e) }}>
           
           <label>Enter Group to unassign as Project Lead</label>
           <input type="text" value={groupRemoveToProjectLd} required onChange={(e) => { handleSetRemovePjLeadGroup(e) }} />
                   
                    <br/>
                    <input type="submit" value="Assign Group to App Lead" />
                </form>
             
                <h3> Project Manager</h3>
                {pmList}
                <form onSubmit={(e)=> {checkProjectManager(e)}}>
            <input type="submit" value="Click to Check Current Groups" />
            <br/>
           
            </form>
                <form onSubmit={(e)=> {handleUpdatePMGroup(e)}}>
                <label>Enter Group to Assign as Project Manager</label>
           <input type="text" value={groupassigntopm} required onChange={(e) => { handleProjectMgerGroupNameChange(e) }} />
                   
                    <br/>
                    <input type="submit" value="Assign Group to PM" />
                </form>
                <form onSubmit={(e) => { handleRemovePMGroup(e)}}>
           
           <label>Enter Group to unassign as Project Manager</label>
           <input type="text" value={groupRemoveToPM} required onChange={(e) => { handleProjectMgerGroupRemoveChange(e) }} />
                   
                    <br/>
                    <input type="submit" value="Remove Group " />
                </form>
           
           
            </div>


            
    );

}

export default GroupRole;
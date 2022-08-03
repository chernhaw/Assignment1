import {useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

function Task(props){

// const testTask = <Task task_id="00x" task_name="Tesing" task_state="Open"></Task>

    return (
    <div className='task'>
            
            <div>{props.task_id}</div>    
            <div> {props.task_name}</div>    
            <div>{props.task_state}</div>   

         <button>Edit Task</button>
    </div>)
}

export default Task;

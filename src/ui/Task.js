import {useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";



function Task(props){
    
    const navigate = useNavigate();
// const testTask = <Task task_id="00x" task_name="Tesing" task_state="Open"></Task>
// onClick={goMain}


useEffect(() => {
    var logged = window.localStorage.getItem("username");
    if (logged==null){
     navigate('../login')   
}
},[])

const goEditTask = () =>{   
    window.localStorage.setItem("task_id", props.task_id)
    navigate('../taskEdit')
}

    return (
    <div className='task'>
            
            <div>{props.task_id}</div>    
            <div> {props.task_name}</div>    
            <div>{props.task_state}</div>   

         <button onClick={goEditTask}>Edit Task</button>
    </div>)
}

export default Task;

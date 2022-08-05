
import Button from '@mui/material/Button';

function TaskOpen(props){

    return ( <>
    <div> <Button onClick={taskToDo}>Set To ToDo</Button> </div>
    </>
    );

}



function ToDoDoingDone(props){
    return (
        <div> 
            <div><Button onClick={taskToDo}>Set To ToDo</Button></div>
            <div><Button onClick={taskDoing}>Set To Doing</Button></div>
            <div><Button onClick={taskDone}>Set To Doing</Button></div>
        </div>
    )
}


export default TaskAction;
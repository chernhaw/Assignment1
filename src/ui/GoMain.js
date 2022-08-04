
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
function LogOut(){


    const navigate = useNavigate();
    const goMain = () =>{
      
        navigate('../main')
    }
    
    return ( <>
    <div> <Button onClick={goMain}>Main Kanban Board</Button> </div>
    </>
    );

}
export default LogOut;
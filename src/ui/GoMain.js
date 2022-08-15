
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
function LogOut(){


    const navigate = useNavigate();
    const goMain = () =>{
      
        try{
            var admin = window.localStorage.getItem("admin");
            console.log("User has admin "+ admin)

            navigate('../main')

            if (admin!=0){
                navigate('../main')
            } else {
                navigate('../mainUser')
            }
        } catch (error){
        
        
        }
    }
    
    return ( <>
    <div> <Button onClick={goMain}>Main Kanban Board</Button> </div>
    </>
    );

}
export default LogOut;
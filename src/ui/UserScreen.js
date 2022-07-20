
import {useEffect,useState} from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import './LoginForm.css';

function UserScreen(){

    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const [ isAdmin, setisAdmin] = useState(false);
    const [ email, setEmail] = useState('');
    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var admin = window.localStorage.getItem("admin");
    console.log("logged user " +logged);
    console.log("admin user "+ admin);
   
    const LogOutUser = () =>{
        alert("You are logged out");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("username");
       
        window.localStorage.removeItem("admin");
        navigate('../login')
    }

    useEffect(() => {
        
        if (logged==null){
         navigate('../login')   
        }

        if (admin=='N'){
            navigate('../login')   
           }
    },[])

    const handlePassChange = (event) =>{

       // var validpass = checkPassWord(event.target.value);
       
        setPassword( event.target.value);
        
        
    }
    const handleUserChange = (event) =>{
        setUsername(event.target.value);
        
    }

    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
        
    }

    const checkAdminHandler =()=>{
        console.log("Checkbox clicked");
        if (isAdmin=='Y'){
           
            setisAdmin('N')
        } else {
            setisAdmin('Y')
        }
        console.log("Admin right : "+isAdmin)
    }

    const handSubmit=async(e)=>{
        e.preventDefault();
         var validPass = checkPassWord(password);
        
      validPass = checkPassWord(password);
        console.log("handlesubmit - checkPassWord");
        if (validPass.length>0) {

            alert(validPass);
            return 1;
        }
       
        try {
            alert("New user creation \n You have submitted "+username+"  "+email);
            const res = await Axios.post('http://localhost:8080/newuser', 
            {username:""+username+ "",password:""+password+"", email:""+email+"", admin:""+isAdmin+", active:Y"});
          //  alert("Email "+ email.length)
            console.log("UserScreen - new user creation started ");
            const duplicateResult = res.data;
            console.log("UserScreen - checking for duplicates "+duplicateResult);
            
            var showErr = false;
            var errMsg = "";
            console.log("UserScreen - "+duplicateResult.indexOf("name"));
            console.log("UserScreen - "+duplicateResult.indexOf("email"));
            if (duplicateResult.indexOf("name")>-1){
                showErr=true;
                errMsg = "Username " +username+ " already taken up - please use another\n"
            }
            if (email.length!==0){
                 if (duplicateResult.indexOf("email")>-1){
                showErr=true;
                errMsg = errMsg+"Email " +email+ " already taken up - please use another\n"
                }
            }

            if (showErr){
                alert (errMsg);
            }

    } catch (e){
            console.error("there was an error");
        }
    }
  
    const goMain = () =>{
        
     //   alert("go to main")
        navigate('../main')
    }

    const checkPassWord=(password)=>{
      
       
        var regexNumber = /\d/;
        var regSpecial =  /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        var passwordMsg = ''
        console.log("UserScreen - checkPassword"+password);

        var passwordLength = password.length;
        // check length of password is 8-10
        console.log("UserScreen - passwordLength : "+passwordLength);
       
        console.log("passwordLength "+8<passwordLength)


        if ( parseInt(password.length) && 10<parseInt(password.length) ){
            console.log("UserScreen - password less than 8");
            passwordMsg = passwordMsg+"Password must be between 8-10 character";
        
        }

        
        // test for special characters
        var isSpecialChar = regSpecial.test(password);
        if (!isSpecialChar){
            passwordMsg = passwordMsg+"\nPassword need to have special characters";
        }
        
        
        var isNumChar = regexNumber.test(password);
        if (!isNumChar){
            passwordMsg = passwordMsg+"\nPassword need to have numeric character";
        }
        console.log(passwordMsg);
        return passwordMsg;
    };
    return (

    

    <div>
        <header className='Header'> <h1>Welcome {logged}  </h1>
        <h3>
        <Button onClick={LogOutUser}>Logout {logged}</Button>
        <Button onClick={goMain}>Previous Screen</Button> 
        </h3></header>
    <div className='Login'>
    <h1>New User Creation</h1>
    <form onSubmit={(e)=>{handSubmit(e)}}>
         
            <label>Name: </label>
            <input type="text" value={username} required onChange={(e)=>{handleUserChange(e)}}/>
            <br/>
            <br/>
            <label>Password: </label>
            
            <input type="password" value={password} required onChange={(e)=>{handlePassChange(e)}}/>
            <br/>
            <label>Need to be between 8 to 10 characters have numbers and special characters</label>
            <br />
            <br />
            <label>Email: </label>
            <input type="email" value={email} onChange={(e)=>{handleEmailChange(e)}}/>
            <br/>
            <br/>
           
            <input type="submit" value="Create User"/>
        </form>
    </div>
    </div>
);
 }

 export default UserScreen;
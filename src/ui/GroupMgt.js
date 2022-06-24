import { useNavigate } from "react-router-dom";
import {useEffect,useState} from 'react';
import './LoginForm.css';

function GroupMgt(){

    const navigate = useNavigate();
    var logged = window.localStorage.getItem("username");
    var loggedEmail = window.localStorage.getItem("email");
    var adminRight  = window.localStorage.getItem("admin");
    console.log(logged);
   
    const LogOutUser = () =>{
        alert("You are logged out");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("email");
        navigate('../login')
    }

    useEffect(() => {
        if (logged==null){
         navigate('../login')   
        }
    },[])
}

export default GroupMgt;
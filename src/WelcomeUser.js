import {useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';
function WelcomeUser(){
    var logged=null
    const navigate = useNavigate();
   
    useEffect(() => {

        var logged = window.localStorage.getItem("username");
        
        if (logged==null){
         navigate('../login')   
        }

        
    },[])

    

    return ( 
    <>
    <div className='.Logout'> Welcome {logged} </div>
    </>
    );

}
export default WelcomeUser;

import {useState} from 'react';
import { ReactDOM } from 'react-dom/client';

import { useNavigate } from "react-router-dom";
import './LoginForm.css';



function UserScreen(){
    const navigate = useNavigate();
    const user=window.localStorage.getItem("username");
    console.log("user" +user);
    if (user==null){
        navigate('../');
    }
    return (

    <div className='Login'>
    <h1>Welcome to User Screen</h1>
        <h2>{user}</h2>
    </div>
);
 }

 export default UserScreen;
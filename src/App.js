import './App.css';


import React from 'react';
import {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginForm from './ui/LoginForm';

import UserScreen from './ui/UserScreen';




function App() {


  /*

  class AllRoutes extends Component{
  render(){
    return(
      <Switch> 
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        { this.state.authenticated && 
          <Route exact path="/Welcome" component={Welcome} />
        }
      </Switch>
    );
  }
}



  */
  //const [ logged, setLogged] = useState('');
   
    

  //   return window.localStorage.qetItem("username");
  // }
 
 
  return (
    <BrowserRouter>
       <Routes>
          <Route path="/login" element={<LoginForm />} /> 
          <Route path="/" element={<LoginForm />} /> 

          { this.state.authenticated && 
          <Route exact path="/Welcome" element={<UserScreen />} />
        }
         <Route path="/user" element={<UserScreen />} />
        
        
      </Routes>
    </BrowserRouter>
   
   
  )
    
}

export default App;

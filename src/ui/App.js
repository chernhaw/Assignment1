import './App.css';


import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginForm from './ui/LoginForm';
import UserScreen from './ui/UserScreen';
import Main from './ui/MainScreen';
import MainUser from './ui/MainScreenUser';
import UserProfileScreen from './ui/UseProfileScreen';
import GroupMgt from './ui/GroupMgt';
import UserManagement from './ui/UserManagement';
import SearchUser from './ui/SearchUser';
import GroupAdmin from './ui/GroupAdmin';
import GroupEdit from './ui/GroupEdit';
import UserDisableScreen from './ui/UserDisableScreen';
import UserNonAdminScreen from './ui/UserNonAdminScreen';
import CreateApp from './ui/CreateApp';
import EditApp from './ui/EditApp';


function App() {
  var logged = window.localStorage.getItem("username");
  console.log(logged);
  if (logged=null) {
    console.log('Nobody is logged -- set logged to false')
    logged = false;
  }

 
  return (

    <BrowserRouter>
       <Routes>
          <Route path="/login" element={<LoginForm />} /> 
          <Route path="/" element={<LoginForm />} /> 
          <Route exact path ="/main" element={<Main />}/>
          <Route exact path="/user" element={<UserScreen />} />
          <Route exact path="/groupedit" element={<GroupEdit />} />
          <Route exact path="/groupmgt" element={<GroupMgt />} />
          <Route exact path="/groupadmin" element={<GroupAdmin />}/>
          <Route exact path="/profile" element={<UserProfileScreen />} />
          <Route exact path="/profileuser" element={<UserNonAdminScreen />} />
          <Route exact path="/mainuser" element={<MainUser />}/>
          <Route exact path="/usersearch" element={<SearchUser />} />
          <Route exact path="/disableuser" element={<UserDisableScreen />} />
          <Route exact path="/usermgt" element={<UserManagement />} />
          <Route exact path="/createApp" element={<CreateApp />} />
          <Route exact path="/editApp" element={<EditApp />} />
      </Routes>
    </BrowserRouter>
   
   
  )
    
}

export default App;

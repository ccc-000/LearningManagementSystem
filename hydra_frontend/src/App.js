import React from 'react';
import './App.css';
import ResetPassword1 from './ResetPassword1';
import ResetPassword2 from './ResetPassword2';
import Profile from './Profile';
import EditProfile from './EditProfile';
import EditAvatar from './EditAvatar';
import CourseHistory from './CourseHistory';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ResetPassword1" element={<ResetPassword1 />} />
        <Route path="/ResetPassword2" element={<ResetPassword2 />} />
        <Route path="/Editprofile" element={<EditProfile />} />
        <Route path="/EditAvatar" element={<EditAvatar />} />
        <Route path="/CourseHistory" element={<CourseHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
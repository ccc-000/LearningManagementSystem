import './App.css';
import ResetPassword1 from './pages/ResetPassword1';
import ResetPassword2 from './pages/ResetPassword2';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import EditAvatar from './pages/EditAvatar';
import CourseHistory from './pages/CourseHistory';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Loginpage from './pages/Loginpage';
import Registrationpage from './pages/Registrationpage';
import Dashboard from './pages/Dashboard';
import DashboardLecturer from './pages/DashboardLecturer';
import Coursemainpage from "./pages/Coursemainpage";
import Forum from "./pages/Forum";
import CreateForum from './pages/CreateForum';
import EditForum from './pages/EditForum';
import ForumDetailStudent from './pages/ForumDetail-student';
import * as React from 'react'

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Loginpage/>}/>
                <Route path="/register" element={<Registrationpage/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/dashboardlecturer" element={<DashboardLecturer/>}/>
                <Route path="/coursemainpage" element={<Coursemainpage/>}/>
                <Route path="/editprofile" element={<EditProfile/>}/>
                <Route path="/enrolmenthistory" element={<CourseHistory/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/editavatar" element={<EditAvatar/>}/>
                <Route path="/resetpassword/1" element={<ResetPassword1/>}/>
                <Route path="/resetpassword/2" element={<ResetPassword2/>}/>
                <Route path="/forum" element={<Forum/>}/>
                <Route path="/createforum" element={<CreateForum/>}/>
                <Route path="/editforum" element={<EditForum/>}/>
                <Route path="/forumdetailstudent" element={<ForumDetailStudent/>}/>
            </Routes>
        </>
    );
}

export default App;
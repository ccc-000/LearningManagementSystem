import './App.css';
import * as React from 'react'
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
// import Forum from "./pages/Forum";
// import CreateForum from './pages/CreateForum';
// import EditForum from './pages/EditForum';
// import ForumDetailStudent from './pages/ForumDetail-student';
//Course main page for lecturer.
import Coursemainpage from "./pages/Coursemainpage";
import QuizLecturer from "./pages/QuizLecturer";
import AssignmentLecturer from "./pages/AssignmentLecturer";
import AnnouncementLecturer from "./pages/AnnouncementLecturer";

//Course main page for student.
import QuizStudent from "./pages/QuizStudent";
import AssignmentStudent from "./pages/AssignmentStudent";
// import Grade from './pages/Grade';

// Material page for lecturer.
import Material from "./pages/Material";
import VideoPlayer from './pages/VedioPlayer';

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
                {/* <Route path="/forum" element={<Forum/>}/> */}
                {/* <Route path="/createforum" element={<CreateForum/>}/> */}
                {/* <Route path="/editforum" element={<EditForum/>}/> */}
                {/* <Route path="/forumdetailstudent/:id" element={<ForumDetailStudent/>}/> */}
                <Route path="/coursemainpage/quizLecturer" element={<QuizLecturer/>}/>
                <Route path="/coursemainpage/assignmentLecturer" element={<AssignmentLecturer/>}/>
                <Route path="/coursemainpage/announcementsLecturer" element={<AnnouncementLecturer/>}/>

                <Route path="/coursemainpage/quizStudent" element={<QuizStudent/>}/>
                <Route path="/coursemainpage/assignmentStudent" element={<AssignmentStudent/>}/>
                {/* <Route path="/CoursemainpageStudent/grade" element={<Grade/>}/> */}
                <Route path="/coursemainpage/material" element={<Material/>}/>
                <Route path="/coursemainpage/videoPlayer" element={<VideoPlayer/>}/>
            </Routes>
        </>
    );
}

export default App;
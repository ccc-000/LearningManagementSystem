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
import CoursemainpageLecturer from "./pages/CoursemainpageLecturer";
import QuizLecturer from "./pages/QuizLecturer";
import AssignmentLecturer from "./pages/AssignmentLecturer";
import AnnouncementLecturer from "./pages/AnnouncementLecturer";

//Course main page for student.
import CoursemainpageStudent from "./pages/CoursemainpageStudent";
import QuizStudent from "./pages/QuizStudent";
import AssignmentStudent from "./pages/AssignmentStudent";
import Grade from './pages/Grade';

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Loginpage/>}/>
                <Route path="/register" element={<Registrationpage/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/dashboardlecturer" element={<DashboardLecturer/>}/>
                <Route path="/CoursemainpageLecturer" element={<CoursemainpageLecturer/>}/>
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
                <Route path="/CoursemainpageLecturer/quizLecturer" element={<QuizLecturer/>}/>
                <Route path="/CoursemainpageLecturer/assignmentLecturer" element={<AssignmentLecturer/>}/>
                <Route path="/CoursemainpageLecturer/announcementsLecturer" element={<AnnouncementLecturer/>}/>

                <Route path="/CoursemainpageStudent" element={<CoursemainpageStudent/>}/>
                <Route path="/CoursemainpageStudent/quizStudent" element={<QuizStudent/>}/>
                <Route path="/CoursemainpageStudent/assignmentStudent" element={<AssignmentStudent/>}/>
                <Route path="/CoursemainpageStudent/grade" element={<Grade/>}/>
            </Routes>
        </>
    );
}

export default App;
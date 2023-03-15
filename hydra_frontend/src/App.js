import './App.css';
import Loginpage from './pages/Loginpage';
import Registrationpage from './pages/Registrationpage';
import {Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Coursemainpage from "./pages/Coursemainpage";
import CourseHistory from "./pages/CourseHistory";
import EditAvatar from "./pages/EditAvatar";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import ResetPassword1 from "./pages/ResetPassword1";
import ResetPassword2 from "./pages/ResetPassword2";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Loginpage/>}/>
                <Route path="/register" element={<Registrationpage/>}/>

                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/coursemainpage" element={<Coursemainpage/>}/>

                <Route path="/editprofile" element={<EditProfile/>}/>
                <Route path="/enrolmenthistory" element={<CourseHistory/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/editavatar" element={<EditAvatar/>}/>
                <Route path="/resetpassword/1" element={<ResetPassword1/>}/>
                <Route path="/resetpassword/2" element={<ResetPassword2/>}/>
            </Routes>
        </>
    );
}

export default App;

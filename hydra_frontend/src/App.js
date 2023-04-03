import logo from './logo.svg';
import './App.css';
import Loginpage from './pages/Loginpage';
import Registrationpage from './pages/Registrationpage';
import {Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DashboardLecturer from './pages/DashboardLecturer';
import Coursemainpage from "./pages/Coursemainpage";
import CourseHistory from "./pages/CourseHistory";
import EditAvatar from "./pages/EditAvatar";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import ResetPassword1 from "./pages/ResetPassword1";
import ResetPassword2 from "./pages/ResetPassword2";
import * as React from 'react'
>>>>>>> 916934f49eb0e0b01945c2641190bb942f7d2312
function App() {

  function connect() {
    fetch('http://localhost:8000')
      .then(response => response.json())
      .then(data => console.log(data));
  }

  connect();


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

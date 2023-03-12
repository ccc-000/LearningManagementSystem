import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Loginpage from './pages/Loginpage';
import Sidebarpage from './pages/Sidebarpage';
import Registrationpage from './pages/Registrationpage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Sidebarpage role = {'lecturer'}>
      {/* <Loginpage /> */}
      <Registrationpage />
    </Sidebarpage>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

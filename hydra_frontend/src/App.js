import './App.css';
import Loginpage from './pages/Loginpage';
import Registrationpage from './pages/Registrationpage';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/register" element={<Registrationpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;

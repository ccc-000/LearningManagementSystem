import './App.css';
import Loginpage from './pages/Loginpage';
import Registrationpage from './pages/Registrationpage';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/register" element={<Registrationpage />} />
      </Routes>
    </>
  );
}

export default App;

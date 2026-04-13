
import './App.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashBoard/Dashboard';
import NewDashboard from './pages/newDashBoard/NewDashboard';
import Otp from './pages/otp/Otp';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Dashboard/>} />
          <Route path='/dashboard' element={<NewDashboard/>} />
           <Route path='/otp' element={<Otp/>} />
        </Routes>
      </BrowserRouter>

   

    </div>
  );
} 

export default App;

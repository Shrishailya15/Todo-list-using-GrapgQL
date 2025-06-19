
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { ToastContainer } from 'react-toastify'

function App() {
  

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

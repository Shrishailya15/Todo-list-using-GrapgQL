import React from 'react';
import './Home.css';
import { Link} from 'react-router-dom'


const Navbar = () => {
  const onLogout = () => {
    localStorage.removeItem('token'); 
    window.location.reload();
  
  }
  return (
    <nav className="navbar">
      <div className="logo">
        <span style={{marginLeft:"10px"}}>MyTask</span>
      </div>
      <ul>
        <li><Link to='/home' style={{color:'white', textDecoration:'none'}}>Home</Link></li>
        <li onClick={onLogout}><Link to='/' style={{color:'white', textDecoration:'none', marginRight:"10px"}}>Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

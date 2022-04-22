import { Link } from 'react-router-dom';
import React from 'react';
import Login from './Login';
import Logout from './Logout';

import '../css/header.css';
import logo from '../media/android-chrome-192x192.png';

const Router = () => {
  return (
    <>
      <Link to='/edit'><button className='menu'>Create</button></Link>
      <Link to='/'><button className='menu'>List</button></Link>
    </>
  );
};

const Header = ({ user, setUser, setErr }) => {
  const renderLogin = () => {
    if (user) return <Logout user={user} setUser={setUser} setErr={setErr} />;
    return <Login setUser={setUser} setErr={setErr} />;
  };

  return <div className='Header'>
    <div className='logo'>
      <img className='logo' src={logo} alt='Radlibs' />
      &nbsp;Radlibs
    </div>
    <div className='menu'>
      {renderLogin()}
      <Router />
    </div>
  </div>
};

export default Header;
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './Login';
import Logout from './Logout';

import '../css/header.css';

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
    if (user) return <Logout setUser={setUser} />;
    return <Login setUser={setUser} setErr={setErr} />;
  };

  return <div className='Header'>
    <div className='logo'>Radlibs</div>
    <div className='menu'>
      {renderLogin()}
      <Router />
    </div>
  </div>
};

export default Header;
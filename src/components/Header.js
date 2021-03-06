import { Link } from 'react-router-dom';
import React from 'react';
import Login from './Login';
import Logout from './Logout';

import '../css/header.css';
import logo from '../media/android-chrome-192x192.png';

const Router = ({ user }) => {
  return (
    <>
      <Link to='/edit'><button disabled={!user}className='menu'>Create</button></Link>
      <Link to='/list'><button className='menu'>List</button></Link>
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
      <Link to='/'><img className='logo' src={logo} alt='Radlibs' /></Link>
      &nbsp;Radlibs
    </div>
    <div className='menu'>
      {renderLogin()}
      <Router user={user} />
    </div>
  </div>
};

export default Header;
import { Link } from 'react-router-dom';
import React from 'react';
import Login from './Login';
import Logout from './Logout';
import {ErrorContext, UserContext} from '../Context';

import '../css/header.css';
import logo from '../media/android-chrome-192x192.png';

const Router = () => {
  const [user] = React.useContext(UserContext);
  const path = window.location.pathname;
  return (
    <>
      <Link to='/'><button disabled={ path === '/'} className='menu'>List</button></Link>
      <Link to='/edit'><button disabled={!user || path === '/edit'}className='menu'>Create</button></Link>
    </>
  );
};

const Header = () => {
  const [user, setUser] = React.useContext(UserContext);
  const [, setErr] = React.useContext(ErrorContext);
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
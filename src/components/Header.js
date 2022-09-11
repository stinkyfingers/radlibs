import { Link } from 'react-router-dom';
import React from 'react';
import Login from './Login';
import Logout from './Logout';
import {ErrorContext, UserContext} from '../Context';

import '../css/header.css';
import logo from '../media/android-chrome-192x192.png';

const Router = ({ user, setUser, setErr }) => {
  const path = window.location.pathname;
  return (
    <>
      <Link to='/'><button disabled={ path === '/'} className='menu'>List</button></Link>
      <Link to='/edit'><button disabled={!user || path === '/edit'}className='menu'>Create</button></Link>
      <LoginLogout user={user} setUser={setUser} setErr={setErr} />
    </>
  );
};

const LoginLogout = ({ user, setUser, setErr }) => {
  if (user) return <Logout user={user} setUser={setUser} setErr={setErr} />;
  return <Login setUser={setUser} setErr={setErr} />;
}

const Header = () => {
  const [user, setUser] = React.useContext(UserContext);
  const [, setErr] = React.useContext(ErrorContext);

  return <div className='Header'>
    <div className='logo'>
      <Link to='/'><img className='logo' src={logo} alt='Radlibs' /></Link>
      &nbsp;Radlibs
    </div>
    <div className='menu'>
      <Router user={user} setUser={setUser} setErr={setErr} />
    </div>
  </div>
};

export default Header;
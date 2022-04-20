import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = '520868981613-vpe0s1lild8cl62hblmg9bfl01fplu06.apps.googleusercontent.com'; // TODO config

const Logout = ({ setUser }) => {
  const onSuccess = (res) => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className='Logout'>
      <GoogleLogout
        clientId={clientId}
        render={props => (
          <button className='login' onClick={props.onClick} disabled={props.disabled}>Log Out</button>
        )}
        onLogoutSuccess={onSuccess}
      />
    </div>
  )
};

export default Logout;
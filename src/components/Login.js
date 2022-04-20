import React from 'react';
import { GoogleLogin } from 'react-google-login';

import '../css/login.css';

const clientId = '520868981613-vpe0s1lild8cl62hblmg9bfl01fplu06.apps.googleusercontent.com';

const Login = ({ setUser, setErr }) => {
  const onSuccess = (res) => {
    setErr(null);
    localStorage.setItem('user', JSON.stringify(res));
    setUser(res);
  };

  const onFailure = (res) => {
    setErr('failed to log in');
  };

  return (
    <div className='Login'>
      <GoogleLogin
        clientId={clientId}
        render={props => (
          <button className='login' onClick={props.onClick} disabled={props.disabled}>Log In</button>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  )
};

export default Login;
import React from 'react';
import { clientId } from '../Config';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import '../css/login.css';

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
      <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onFailure}
      />
      </GoogleOAuthProvider>
    </div>
  )
};

export default Login;
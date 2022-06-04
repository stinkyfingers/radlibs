import React from 'react';

const Logout = ({ user, setUser, setErr }) => {
  const handleClick = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  React.useEffect(() => {
    if (user && user.tokenObj && user.tokenObj.expires_at < Date.now()) {
      localStorage.removeItem('user');
      setUser(null);
      setErr('Session expired. Please log in again.');
    }
  }, [setUser, setErr, user]);

  return (
    <div className='Logout'>
      <button className='login' onClick={handleClick}>Log Out</button>
    </div>
  )
};

export default Logout;
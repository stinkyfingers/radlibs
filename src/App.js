import React from 'react';
import { useRoutes } from 'react-router-dom';
import Header from './components/Header';
import Play from './components/Play';
import List from './components/List';
import Edit from './components/Edit';
import { UserContext } from './Context';
import './App.css';

function App() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
  const [err, setErr] = React.useState();

  const renderError = () => {
    if (!err) return null;
    return <div className='error'>{err}</div>;
  };

  const routes = useRoutes([
    { path: '/play/:id', element: <Play setErr={setErr} /> },
    { path: '/edit/:id', element: <Edit setErr={setErr} /> },
    { path: '/edit', element: <Edit setErr={setErr} /> },
    { path: '/', element: <List setErr={setErr} /> },
  ]);

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Header user={user} setUser={setUser} setErr={setErr} />
        <div className='content'>
          {renderError()}
          {routes}
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;

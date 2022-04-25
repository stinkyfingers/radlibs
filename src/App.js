import React from 'react';
import { useRoutes } from 'react-router-dom';
import Header from './components/Header';
import Play from './components/Play';
import List from './components/List';
import Edit from './components/Edit';
import Info from './components/Info';
import { UserContext } from './Context';
import './App.css';

const Error = ({ err }) => {
  return <div className='error'>{err}</div>;
};

function App() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
  const [err, setErr] = React.useState();

  const routes = useRoutes([
    { path: '/play/:id', element: <Play setErr={setErr} /> },
    { path: '/edit/:id', element: <Edit setErr={setErr} /> },
    { path: '/edit', element: <Edit setErr={setErr} /> },
    { path: '/list', element: <List setErr={setErr} /> },
    { path: '/', element: <Info setErr={setErr} /> },
  ]);

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Header user={user} setUser={setUser} setErr={setErr} />
        <div className='content'>
          <Error err={err} />
          {routes}
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;

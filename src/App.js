import React from 'react';
import { useRoutes } from 'react-router-dom';
import Header from './components/Header';
import Play from './components/Play';
import List from './components/List';
import Edit from './components/Edit';
import {ErrorContext, UserContext} from './Context';
import './App.css';

const Error = ({ err }) => {
  return <div className='error'>{err}</div>;
};

function App() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
  const [err, setErr] = React.useState();

  const routes = useRoutes([
    { path: '/play/:id', element: <Play /> },
    { path: '/edit/:id', element: <Edit /> },
    { path: '/edit', element: <Edit /> },
    { path: '/list', element: <List /> },
    { path: '/', element: <List /> },
  ]);

  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        <ErrorContext.Provider value={[err, setErr]}>
        <Header />
          <div className='content'>
            <Error err={err} />
            {routes}
          </div>
        </ErrorContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../Context';
import { list } from '../Api';

import '../css/list.css';

const List = ({ setErr }) => {
  const [libs, setLibs] = React.useState([]);
  const user = React.useContext(UserContext);

  React.useEffect(() => {
    const listFunc = async () => {
      const resp = await list();
      setLibs(resp);
    };
    listFunc().catch(setErr);
  }, [setErr]);

  const renderLibs = () => {
    const data = libs.map(lib =>
      <tr key={lib._id} className='libRow'>
        <td><Link to={`/play/${lib._id}`}><button className='play'>Play</button></Link></td>
        { user && user.googleId === lib.user ? <td><Link to={`/edit/${lib._id}`}><button className='edit'>Edit</button></Link></td> : <td /> }
        <td>{lib.title}</td>
        <td>{lib.rating}</td>
        <td className='user'>{lib.user}</td>
        <td className='created'>{(new Date(lib.created)).toUTCString()}</td>
      </tr>
    );
    return <table className='libs'>
      <thead>
        <tr key='header'>
          <th />
          {user ? <th /> : null}
          <th>Title</th>
          <th>Rating</th>
          <th>User ID</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>{data}</tbody>
    </table>;
  }

  return <div className='List'>
    {renderLibs()}
  </div>
};

export default List;
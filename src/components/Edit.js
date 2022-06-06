import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context';
import { get, update, create, remove } from '../Api';
import { decodeUser } from '../utils';

import '../css/edit.css';

const commonPOS = [
  'noun',
  'verb',
  'adjective',
  'adverb',
  'name',
  'exclamation',
  'verb ending in -ing',
  'past tense verb',
  'place'
];

const radlibsUser = (googleUser) => {
  if (!googleUser) return {};
  return { id: decodeUser(googleUser).sub, name: decodeUser(googleUser).name, email: decodeUser(googleUser).email };
};

const Edit = ({ setErr }) => {
  const user = React.useContext(UserContext);
  const emptyLib = { user: radlibsUser(user), rating: 'G' , text: ''};
  const [lib, setLib] = React.useState(emptyLib);
  const [cursor, setCursor] = React.useState(0); // track last cursor position for inserts
  const [status, setStatus] = React.useState();
  const [customButton, setCustomButton] = React.useState('');
  const { id } = useParams();
  const textareaRef = React.useRef();
  const navigate = useNavigate();
  React.useEffect(() => {
    const getFunc = async () => {
      const resp = await get(id);
      setLib(resp);
    };
    if (!id) return;
    getFunc().catch(setErr);
  }, [id, setErr]);
  React.useEffect(() => {
    if (!user) setErr('please log in');
  }, [setErr, user]);

  const handleChange = (e) => {
    setStatus();
    setErr();
    setLib(prev => ({ ...prev, [e.target.className]: e.target.value }));
  };

  const handleSave = async () => {
    const save = lib._id ? update : create;
    try {

      const resp = await save({ lib, token: user.credential});
      if (resp.error) {
        setErr(resp.error);
        return;
      }
      setLib(resp);
      setStatus('Saved!');
      navigate(`/edit/${resp._id}`);
    } catch (err) {
      setErr(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const resp = await remove({ id: lib._id, token: user.credential });
      if (resp.error) {
        setErr(resp.error);
        return;
      }
      setStatus('Deleted!');
      setLib(emptyLib);
      navigate('/');
    } catch (err) {
      setErr(err);
    }
  };

  const handleClick = (e) => {
    const pos = `{{ ${e.target.value} }}`
    setLib(prev => ({ ...prev, text: prev.text.slice(0, cursor) + pos + prev.text.slice(cursor) }));
    textareaRef.current.focus()
  };

  const handleBlur = (e) => {
    setCursor(textareaRef.current.selectionStart);
  };

  const renderPOS = () => {
    const buttons = commonPOS.map(pos => {
      return <button key={pos} className='pos' onClick={handleClick} value={pos}>{pos}</button>;
    });
    return <div className='pos'>
      <div className='customButton'>
        <label className='custom'>Custom type</label>
        <input className='custom' onChange={(e) => setCustomButton(e.target.value)} placeholder='your custom type'/>
        {customButton ? <button key='custom' className='pos' onClick={handleClick} value={customButton}>{customButton}</button> : null}
      </div>
      {buttons}
    </div>;
  };

  if (!user) {
    return <div />;
  }

  return <div className='Edit'>
    <div className='status'>{status}</div>
    <div className='title'>
      <label>Title</label>
      <input type='text' className='title' defaultValue={lib.title} onChange={handleChange} />
    </div>
    <div className='text'>
      <label>Text</label>
      <textarea className='text' onChange={handleChange} ref={textareaRef} onBlur={handleBlur} value={lib.text}></textarea>
    </div>
    {renderPOS()}
    <div className='rating'>
      <label>Rating</label>
      <select onChange={handleChange} className='rating'>
        <option>G</option>
        <option>PG</option>
        <option>R</option>
      </select>
    </div>
    <div className='actions'>
      <button disabled={!lib.text || !lib.title} className='save' onClick={handleSave}>Save</button>
      <button disabled={!lib._id} className='delete' onClick={handleDelete}>Delete</button>
    </div>
  </div>;
};

export default Edit;
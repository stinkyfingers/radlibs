import React from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../Api';

import '../css/play.css';

const populate = (text, inputs) => {
  const regex = /{{[a-zA-Z0-9 "!@#$%^&()-_+=;':,./]*}}/;
  for (const i in inputs) {
    text = text.replace(regex, inputs[i]);
  };
  return text;
}

const Play = ({ setErr }) => {
  const [lib, setLib] = React.useState();
  const [inputs, setInputs] =  React.useState({});
  const { id } = useParams();

  React.useEffect(() => {
    const getFunc = async () => {
      const resp = await get(id);
      setLib(resp);
    };
    if (!id) return;
    getFunc().catch(setErr);
  }, [id, setErr]);

  const handleTermChange = (e, i) => {
    setInputs(prev => ({ ...prev, [i]: e.target.value }));
  };

  const handlePopulate = () => {
    const res = populate(lib.text, inputs);
    setLib(prev => ({ ...lib, complete: res }));
  };

  const handleReset = () => {
    setLib(prev => ({ ...prev, complete: null }));
  }

  const renderPopulate = () => {
    const regex = /{{[a-zA-Z0-9 "!@#$%^&()-_+=;':,./]*}}/g;
    const inputs = lib.text.match(regex);
    if (!inputs) { // handle no inputs
      setLib(prev => ({ ...lib, complete: lib.text }));
      return;
    };

    const all = [...inputs];
    const terms =  all.map((term, i) =>
      <div key={`term-${i}`} className='term'>
        <label className='term'>{term.replace('{{', '').replace('}}','')}</label>
        <input onChange={(e) => handleTermChange(e, i)} />
      </div>);
    return <>
        {terms}
        <div className='actions'>
          <button onClick={handlePopulate} className='submit'>Submit</button>
        </div>
      </>;
  };

  const renderComplete = () => <div className='complete'>
    <div className='text'>{lib.complete}</div>
    <div className='actions'>
      <button className='reset' onClick={handleReset}>Play Again</button>
    </div>
  </div>

  if (!lib) return null;



  return <div className='Play'>
    <div className='title'>{lib.title}</div>
    {lib.complete ? renderComplete() : renderPopulate()}
  </div>;
};

export default Play;
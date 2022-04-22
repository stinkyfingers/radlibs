const liveEndpoint = "https://server.john-shenk.com/badlibs"; // TODO config
const localEndpoint = 'http://localhost:8088';
const api = () => {
  if (process.env.NODE_ENV === 'development') {
    return localEndpoint;
  }
  return liveEndpoint;
};

export const list = async() => {
  const res = await fetch(`${api()}/lib/all`);
  const data = await res.json();
  return data;
};

export const get = async(id) => {
  const res = await fetch(`${api()}/lib/get?id=${id}`);
  const data = await res.json();
  return data;
};

export const update = async({ lib, token }) => {
  const res = await fetch(`${api()}/lib/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(lib)
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.message };
  }
  return data;
};

export const create = async({ lib, token }) => {
  console.log(token)
  const res = await fetch(`${api()}/lib/create`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(lib)
  });
  const data = await res.json();
  console.log(data, res.status)
  if (res.status !== 200) {
    return { error: data.message };
  }
  return data;
};

export const remove = async({ id, token }) => {
  const res = await fetch(`${api()}/lib/delete?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token
    }
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.message };
  }
  return data;
};
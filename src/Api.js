const liveEndpoint = "https://server.john-shenk.com/badlibs"; // TODO config
const localEndpoint = 'http://localhost:8088';
const { NODE_ENV, REACT_APP_ENV } = process.env;
const api = () => {
  if (NODE_ENV === 'development' && REACT_APP_ENV !== 'live') {
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
  const res = await fetch(`${api()}/lib/create`, {
    method: 'PUT',
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

export const auth = async({ user }) => {
  const res = await fetch(`${api()}/auth/upsert`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.message };
  }
  return data;
};

export const checkAuth = async({ token }) => {
  const res = await fetch(`${api()}/auth/health`, {
    method: 'GET',
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
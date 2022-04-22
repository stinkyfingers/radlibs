export const list = async() => {
  const res = await fetch("http://localhost:8088/lib/all");
  const data = await res.json();
  return data;
};

export const get = async(id) => {
  const res = await fetch(`http://localhost:8088/lib/get?id=${id}`);
  const data = await res.json();
  return data;
};

export const update = async({ lib, token }) => {
  const res = await fetch(`http://localhost:8088/lib/update`, {
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
  const res = await fetch(`http://localhost:8088/lib/create`, {
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
  const res = await fetch(`http://localhost:8088/lib/delete?id=${id}`, {
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
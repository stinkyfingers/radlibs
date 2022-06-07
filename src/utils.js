import jwt_decode from 'jwt-decode';

export const decodeUser = (token) => {
  try {
    return jwt_decode(token.credential);
  } catch (e) {
    console.warn(e);
    return {}
  }
};
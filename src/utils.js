import jwt_decode from 'jwt-decode';

export const decodeUser = (token) => {
  return jwt_decode(token.credential);  
}
import jwtDecode from 'jwt-decode';

export default (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

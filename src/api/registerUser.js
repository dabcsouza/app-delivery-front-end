import axios from './axios';

export default ({ email, password, name, role = 'customer' }) => (
  axios.post('/register', {
    email,
    password,
    name,
    role,
  }).then((res) => res.data)
);

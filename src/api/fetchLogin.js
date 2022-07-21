import axios from './axios';

export default ({ email, password }) => (
  axios.post('/login', {
    email,
    password,
  }).then((res) => res.data)
    .catch((err) => console.error(err))
);

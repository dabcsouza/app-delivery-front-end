import axios from './axios';

export default () => (
  axios.get('/products').then((res) => res.data)
    .catch((err) => console.error(err))
);

import axios from './axios';

export default () => (
  axios.get('/sellers').then((res) => res.data)
);

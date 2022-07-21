import axios from './axios';

export default (status, id, token) => (
  axios.patch(`/delivery/${id}`,
    { status },
    { headers: { authorization: token } })
    .then((res) => res.data)
);

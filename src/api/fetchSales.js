import axios from './axios';

export const createSale = (data, token) => (
  axios.post('/sales', data, {
    headers: {
      authorization: token,
    },
  }).then((res) => res.data)
);

export const fetchSales = (id, token) => (
  axios.get(`/sales/${id}?role=sellerId`, {
    headers: {
      authorization: token,
    },
  }).then((res) => res.data)
);

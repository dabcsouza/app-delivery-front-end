import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchSales } from '../api/fetchSales';
import CheckoutDetailsInfo from '../components/checkoutDetails/checkoutDetailsInfo';
import Header from '../components/navbar/Header';

function MyOrderDetailPage({ token }) {
  const url = new URL(window.location.href);
  const orderId = url.pathname.split('/')[3];
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchSales('2', token)
      .then((res) => {
        setOrder(res.find((item) => item.id === +(orderId)));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header />
      {
        order && (
          <CheckoutDetailsInfo
            order={ order }
          />
        )
      }
    </>
  );
}

MyOrderDetailPage.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders.order,
  token: state.token,
});

export default connect(mapStateToProps, null)(MyOrderDetailPage);

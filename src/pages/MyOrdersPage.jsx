import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/navbar/Header';
import { fetchSales } from '../api/fetchSales';
import { setOrders } from '../redux/actions';
import CustomerOrderCard from '../components/order/CustomerOrderCard';

function MyOrdersPage({ token, setOrderList, orderList: { order } }) {
  useEffect(() => {
    fetchSales('2', token)
      .then((res) => setOrderList(res))
      .catch((err) => console.error(err));
  }, [setOrderList, token]);

  return (
    <div>
      <Header />
      {!order ? 'loading' : order.map((item) => (
        <CustomerOrderCard
          key={ item.id }
          id={ item.id }
          status={ item.status }
          date={ item.saleDate }
          totalPrice={ item.totalPrice }
        />
      ))}
    </div>
  );
}

MyOrdersPage.propTypes = {
  token: PropTypes.string.isRequired,
  orderList: PropTypes.shape({
    order: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      totalPrice: PropTypes.string,
      saleDate: PropTypes.string,
      status: PropTypes.string,
      map: PropTypes.func,
    }).isRequired).isRequired,
  }).isRequired,
  setOrderList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.userInfo,
  token: state.token,
  orderList: state.orders,
});

const mapDispatchToProps = (dispatch) => ({
  setOrderList: (orders) => dispatch(setOrders(orders)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyOrdersPage);

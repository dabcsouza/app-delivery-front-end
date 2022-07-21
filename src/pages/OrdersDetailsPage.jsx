import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Header from '../components/navbar/Header';
import OrderDetails from '../components/orderDetails/OrderDetails';

function OrderDetailsPage({ orders }) {
  const location = useLocation();

  const ID = location.pathname.split('/')[3];

  const order = orders.find((odr) => odr.id === Number(ID));

  return (
    <div>
      <Header />
      <OrderDetails
        id={ order.id }
        date={ order.saleDate }
        status={ order.status }
        products={ order.products }
        totalPrice={ order.totalPrice }
      />
    </div>

  );
}

OrderDetailsPage.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    saleDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      urlImage: PropTypes.string,
      quantity: PropTypes.number.isRequired,
    })),
    totalPrice: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders.order,
});

export default connect(mapStateToProps)(OrderDetailsPage);

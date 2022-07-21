import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './order.css';

function SellerOrderCard({ id, date, totalPrice, address, addressNumber, status }) {
  const navigate = useNavigate();

  return (
    <div
      onKeyDown={ () => navigate(`/seller/orders/${id}`) }
      onClick={ () => navigate(`/seller/orders/${id}`) }
      role="none"
      className="order-card flex"
    >
      <div
        className="order-number flex"
        data-testid={ `seller_orders__element-order-id-${id}` }
      >
        Pedido
        {' '}
        { id }
      </div>

      <div className="flex group-2-order">
        <div className="flex group-2-a">
          <div className="order-status flex">
            <h2
              data-testid={ `seller_orders__element-delivery-status-${id}` }
            >
              {status}
            </h2>
          </div>

          <div className="order-details flex">
            <span
              className="flex"
              data-testid={ `seller_orders__element-order-date-${id}` }
            >
              { date.split('T')[0] }
            </span>
            <span
              className="flex"
              data-testid={ `seller_orders__element-card-price-${id}` }
            >
              R$
              {' '}
              { totalPrice }
            </span>
          </div>
        </div>

        <div
          className="flex address"
          data-testid={ `seller_orders__element-card-address-${id}` }
        >
          { `${address}, ${addressNumber}` }
        </div>

      </div>
    </div>
  );
}

SellerOrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  addressNumber: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default SellerOrderCard;

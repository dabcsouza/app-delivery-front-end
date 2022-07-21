import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './order.css';

function CustomerOrderCard({ id, date, totalPrice, status }) {
  const navigate = useNavigate();
  const regexExpression = /(\d{4})-(\d{2})-(\d{2})/;

  return (
    <div
      onKeyDown={ () => navigate(`/customer/orders/${id}`) }
      onClick={ () => navigate(`/customer/orders/${id}`) }
      role="none"
      className="order-card flex"
    >
      <div
        className="order-number flex"
        data-testid={ `customer_orders__element-order-id-${id}` }
      >
        Pedido
        {' '}
        { id }
      </div>

      <div className="order-status flex stretch">
        <h2
          data-testid={ `customer_orders__element-delivery-status-${id}` }
        >
          { status }
        </h2>
      </div>

      <div className="order-details flex">
        <span
          className="flex"
          data-testid={ `customer_orders__element-order-date-${id}` }
        >
          { date.split('T')[0].replace(regexExpression, '$3/$2/$1') }
        </span>
        <span
          className="flex"
          data-testid={ `customer_orders__element-card-price-${id}` }
        >
          { totalPrice.replace('.', ',') }
        </span>
      </div>
    </div>
  );
}

CustomerOrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default CustomerOrderCard;

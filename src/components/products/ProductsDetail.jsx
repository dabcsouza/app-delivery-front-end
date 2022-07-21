import React from 'react';
import PropTypes from 'prop-types';

export default function ProductsDetails({ index, name, quantity, value }) {
  return (
    <div>
      <span
        data-testid={ `seller_order_details__element-order-table-item-number-${index}` }
      >
        { index }
      </span>
      <span
        data-testid={ `seller_order_details__element-order-table-name-${index}` }
      >
        { name }
      </span>
      <span
        data-testid={ `seller_order_details__element-order-table-quantity-${index}` }
      >
        { quantity }
      </span>
      <span
        data-testid={ `seller_order_details__element-order-table-unit-price-${index}` }
      >
        { value }
      </span>
      <span
        data-testid={ `seller_order_details__element-order-table-sub-total-${index}` }
      >
        { (value * quantity) }
      </span>
    </div>
  );
}

ProductsDetails.propTypes = {
  index: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductsDetails from '../products/ProductsDetail';
import updateStatusDelivery from '../../api/statusDelivery';
import dateFormat from '../../utils/dateFormat';

export default function OrderDetails({ id, date, status, products, totalPrice }) {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const dataTestIdI = 'seller_order_details__element';
  const dataTestIdII = '-order-details-label-delivery-status';

  const DATE_FORMAT = dateFormat(date);

  const [statusState, setStatusState] = useState(status);

  return (
    <div>
      <h1>Detalhes do pedido</h1>
      <div>
        <div>
          <h2
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            Pedido
            {' '}
            { id }
          </h2>
          <span
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            { DATE_FORMAT }
          </span>
          <span
            data-testid={
              dataTestIdI + dataTestIdII
            }
          >
            { status }
          </span>
          <button
            disabled={ statusState !== 'Pendente' }
            type="button"
            onClick={ () => {
              setStatusState('Preparando');
              updateStatusDelivery('Preparando', id, token);
            } }
            data-testid="seller_order_details__button-preparing-check"
          >
            Preparar pedido
          </button>
          <button
            disabled={ statusState !== 'Preparando' }
            type="button"
            onClick={ () => {
              setStatusState('Em Trânsito');
              updateStatusDelivery('Em Trânsito', id, token);
            } }
            data-testid="seller_order_details__button-dispatch-check"
          >
            Saiu para entrega
          </button>
        </div>
        <div>
          <span>Item</span>
          <span>Descricao</span>
          <span>Quantidade</span>
          <span>Valor Unitario</span>
          <span>Sub-total</span>
        </div>
        <div>
          { products.map((product, index) => (
            <ProductsDetails
              key={ product.id }
              index={ index }
              name={ product.name }
              quantity={ product.SalesProducts.quantity }
              value={ product.price }
            />
          ))}
        </div>
        <button
          type="button"
          data-testid="seller_order_details__element-order-total-price"
        >
          { totalPrice.replace('.', ',') }
        </button>
      </div>
    </div>
  );
}

OrderDetails.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  status: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
};

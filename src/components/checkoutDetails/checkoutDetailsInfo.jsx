import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const CheckoutDetails = ({ order, allOrders }) => {
  const { products } = order;
  const i = allOrders.findIndex((odr) => odr.id === order.id);
  console.log(i);
  const regexExpression = /(\d{4})-(\d{2})-(\d{2})/;
  const dataTestId = 'customer_order_details__';
  function totalPrice() {
    return products
      .reduce(
        (total, item) => total + item.SalesProducts.quantity * +item.price,
        0,
      )
      .toFixed(2);
  }

  return (
    <div className="details-container checkout-form flex">
      {products.length > 0 && (
        <table>
          <tbody>
            <tr>
              <td
                data-testid={ `${dataTestId}element-order-details-label-order-id` }
              >
                {`Pedido 000${order.id};`}
              </td>
              <td
                data-testid={ `${dataTestId}element-order-details-label-seller-name` }
              >
                {`P. Vendedora ${order.sellerId};`}
              </td>
              <td
                data-testid={ `${dataTestId}element-order-details-label-order-date` }
              >
                {order.saleDate
                  .split('T')[0]
                  .replace(regexExpression, '$3/$2/$1')}
              </td>
              <td
                data-testid={ `${dataTestId}element-order-details-label-delivery-status` }
              >
                {order.status}
              </td>
              <td>
                <button
                  type="button"
                  data-testid={ `${dataTestId}button-delivery-check` }
                >
                  Marcar como entregue
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {products.length > 0 && (
        <table className="details-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Sub-Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map(
              ({ id, name, price, SalesProducts: { quantity } }, index) => (
                <tr key={ id }>
                  <td
                    data-testid={
                      `${dataTestId}element-order-table-item-number-${index}`
                    }
                  >
                    {index + 1}
                  </td>
                  <td
                    data-testid={ `dataTestIdelement-order-table-name-${index}` }
                  >
                    {name}
                  </td>
                  <td
                    data-testid={ `dataTestIdelement-order-table-quantity-${index}` }
                  >
                    {quantity}
                  </td>
                  <td
                    data-testid={ `${dataTestId}element-order-table-unit-price-${index}` }
                  >
                    {price.replace('.', ',')}
                  </td>
                  <td
                    data-testid={ `dataTestIdelement-order-table-sub-total-${index}` }
                  >
                    {(quantity * price).toFixed(2).replace('.', ',')}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      )}
      <button
        type="button"
        className="total-price-button-checkout"
        data-testid="customer_products__button-cart"
      >
        Total: R$
        <span
          data-testid={ `${dataTestId}element-order-total-price` }
        >
          {`${totalPrice().replace('.', ',')}`}
        </span>
      </button>
    </div>
  );
};

CheckoutDetails.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sellerId: PropTypes.number.isRequired,
    saleDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        SalesProducts: PropTypes.shape({
          quantity: PropTypes.number.isRequired,
        }).isRequired,
      }),
    ).isRequired,
  }).isRequired,
  allOrders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  allOrders: state.orders.order,
});

export default connect(mapStateToProps, null)(CheckoutDetails);

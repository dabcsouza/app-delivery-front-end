import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { removeCartItem, setProductQtt } from '../../redux/actions';

const CheckoutDetails = ({ cartItems, removeItem, setProductQt }) => {
  const totalPrice = () => cartItems
    .reduce((total, item) => total + item.quantity * Number(item.price), 0);
  return (
    <div className="details-container checkout-form flex">
      {
        cartItems.length > 0 && (
          <table className="details-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Sub-Total</th>
                <th>RemoverItem</th>
              </tr>
            </thead>
            <tbody>
              {
                cartItems.map(({ id, name, price, quantity }, index) => (
                  <tr key={ id }>
                    <td
                      data-testid={
                        `customer_checkout__element-order-table-item-number-${index}`
                      }
                    >
                      { index + 1 }
                    </td>
                    <td
                      data-testid={
                        `customer_checkout__element-order-table-name-${index}`
                      }
                    >
                      { name }
                    </td>
                    <td
                      data-testid={
                        `customer_checkout__element-order-table-quantity-${index}`
                      }
                    >
                      { quantity }
                    </td>
                    <td
                      data-testid={
                        `customer_checkout__element-order-table-unit-price-${index}`
                      }
                    >
                      { price.replace('.', ',') }
                    </td>
                    <td
                      data-testid={
                        `customer_checkout__element-order-table-sub-total-${index}`
                      }
                    >
                      { (quantity * price).toFixed(2).replace('.', ',') }
                    </td>
                    <td>
                      <button
                        data-testid={
                          `customer_checkout__element-order-table-remove-${index}`
                        }
                        type="button"
                        onClick={ () => {
                          removeItem(id);
                          setProductQt(id, 0);
                        } }
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }
      <button
        type="button"
        className="total-price-button-checkout"
        data-testid="customer_products__button-cart"
      >
        Total: R$
        <span data-testid="customer_checkout__element-order-total-price">
          {
            `${totalPrice()
              .toFixed(2).replace('.', ',')}`
          }
        </span>
      </button>
    </div>
  );
};

CheckoutDetails.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  removeItem: PropTypes.func.isRequired,
  setProductQt: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setProductQt: (id, quantity) => dispatch(setProductQtt(id, quantity)),
  removeItem: (id) => dispatch(removeCartItem(id)),
});

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDetails);

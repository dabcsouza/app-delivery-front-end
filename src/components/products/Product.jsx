import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  addCartItem,
  decrementCartItem,
  decrementProductQtt,
  incrementCartItem,
  incrementProductQtt,
  removeCartItem,
  setCartQtt,
  setProductQtt,
} from '../../redux/actions';

function Product({
  id, name, image, price,
  incrementItem, quantity,
  addItem, removeItem, cartItems,
  incrementProduct, decrementItem,
  decrementProduct, setProductQt,
  setCartQt,
}) {
  const handleIncrementClick = () => {
    if (cartItems.some((el) => el.id === id)) {
      incrementItem(id);
    } else {
      addItem({ id, name, image, price, quantity: 1 });
      incrementProduct(id);
    }
  };

  const handleDecrementClick = () => {
    if (cartItems.some((el) => el.id === id)) {
      if (quantity === 1) {
        decrementProduct(id);
        removeItem(id);
      } else {
        decrementItem(id);
      }
    }
  };

  const handleChange = ({ target: { value } }) => {
    if (+value > 0) {
      if (!cartItems.some((el) => el.id === id)) {
        addItem({ id, name, image, price, quantity: 1 });
      }
      setProductQt(id, +value);
      setCartQt(id, +value);
    } else {
      setProductQt(id, 0);
      setCartQt(id, 0);
      removeItem(id);
    }
  };

  return (
    <div className="product" id={ id }>
      <span
        className="product-price"
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { price
          .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          .replace('.', ',')}
      </span>
      <img
        src={ image }
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <div className="footer-section">
        <p data-testid={ `customer_products__element-card-title-${id}` }>{ name }</p>
        <div className="button-section">
          <button
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            type="button"
            className="button-left"
            onClick={ handleDecrementClick }
          >
            -
          </button>
          <input
            data-testid={ `customer_products__input-card-quantity-${id}` }
            type="text"
            className="card-input"
            placeholder={ quantity }
            value={ quantity }
            onChange={ handleChange }
          />
          <button
            data-testid={ `customer_products__button-card-add-item-${id}` }
            type="button"
            className="button-right"
            onClick={ handleIncrementClick }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  addItem: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }),
  ).isRequired,
  decrementItem: PropTypes.func.isRequired,
  decrementProduct: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  incrementItem: PropTypes.func.isRequired,
  incrementProduct: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  removeItem: PropTypes.func.isRequired,
  setCartQt: PropTypes.func.isRequired,
  setProductQt: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  incrementItem: (id) => dispatch(incrementCartItem(id)),
  decrementItem: (id) => dispatch(decrementCartItem(id)),
  incrementProduct: (id) => dispatch(incrementProductQtt(id)),
  decrementProduct: (id) => dispatch(decrementProductQtt(id)),
  addItem: (item) => dispatch(addCartItem(item)),
  removeItem: (id) => dispatch(removeCartItem(id)),
  setProductQt: (id, qtt) => dispatch(setProductQtt(id, qtt)),
  setCartQt: (id, qtt) => dispatch(setCartQtt(id, qtt)),
});

const mapStateToProps = (state) => ({
  products: state.cart.products,
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);

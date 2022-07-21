import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { clearShoppingCart, setCartProducts } from '../redux/actions';
import fetchProducts from '../api/fetchProducts';
import Header from '../components/navbar/Header';
import Product from '../components/products/Product';
import '../components/products/products.css';

function ProductsPage({ setProducts, reduxProducts, clearCart, cartItems }) {
  const navigate = useNavigate();

  useEffect(() => {
    let productsFetch;
    fetchProducts().then((products) => {
      productsFetch = products;
      const compareState = ((reduxProducts.length === productsFetch.length)
      && reduxProducts
        .every(({ id, name, price, urlImage }, index) => JSON
          .stringify({
            id, name, price, urlImage,
          }) === JSON
          .stringify(productsFetch[index])));
      if (!compareState) {
        clearCart();
        setProducts(productsFetch.map((product) => ({
          ...product,
          quantity: 0,
        })));
      }
    }).catch((err) => console.error(err));
  }, [clearCart, reduxProducts, setProducts]);

  const totalPrice = () => cartItems
    .reduce((total, item) => total + item.quantity * Number(item.price), 0);

  return (
    <>
      <Header />
      <section className="products">
        {
          reduxProducts
            .map(({ id, urlImage, name, price, quantity }) => (
              <Product
                key={ id }
                className="product"
                image={ urlImage }
                name={ name }
                price={ price }
                quantity={ quantity }
                id={ id }
              />
            ))
        }
        <button
          type="button"
          className="total-price-button"
          data-testid="customer_products__button-cart"
          onClick={ () => navigate('/customer/checkout') }
          disabled={ cartItems.length === 0 }
        >
          Ver Carrinho: R$
          <span data-testid="customer_products__checkout-bottom-value">
            {
              `${totalPrice()
                .toFixed(2).replace('.', ',')}`
            }
          </span>
        </button>
      </section>
    </>
  );
}

ProductsPage.propTypes = {
  setProducts: PropTypes.func.isRequired,
  reduxProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  clearCart: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number.isRequired,
      price: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  reduxProducts: state.cart.products,
  cartItems: state.cart.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
  setProducts: (products) => dispatch(setCartProducts(products)),
  clearCart: () => dispatch(clearShoppingCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSale, fetchSales } from '../../api/fetchSales';
import fetchSellers from '../../api/fetchSellers';
import { setOrders } from '../../redux/actions';
// import './checkout.css';

function CheckoutForm({ cartItems, userId, token, setOrderList }) {
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchSellers()
      .then((res) => {
        setSellers(res);
        setSellerId(res[0].id);
      })
      .catch((err) => console.error(err));
  }, []);

  function formatProducts() {
    return cartItems
      .map((item) => (
        {
          productId: item.id,
          quantity: item.quantity,
        }
      ));
  }

  function totalPrice() {
    return cartItems
      .reduce((total, item) => total + item.quantity * Number(item.price), 0);
  }

  function handleChange(flag, value) {
    if (flag === 'seller') setSellerId(value);
    if (flag === 'address') setAddress(value);
    if (flag === 'number') setNumber(value);
  }

  function handleSubmit() {
    const newOrder = {
      userId,
      sellerId,
      totalPrice: totalPrice(),
      deliveryAddress: address,
      deliveryNumber: number,
      saleDate: Date.now(),
      products: formatProducts(),
    };
    createSale(newOrder, token)
      .then((res) => {
        setAddress('');
        setNumber('');
        fetchSales('2', token)
          .then((response) => setOrderList(response))
          .catch((err) => console.error(err));
        navigate(`/customer/orders/${res.id}`);
      })
      .catch((err) => console.error(err));
  }

  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault();
        handleSubmit();
      } }
      className="checkout-form flex"
    >
      <div className="flex checkout-inputs">
        <label htmlFor="sellers-select" className="flex seller">
          P. Vendedora Responsável
          <select
            id="sellers-select"
            onChange={ (e) => handleChange('seller', e.target.value) }
            data-testid="customer_checkout__select-seller"
          >
            {sellers.map((seller) => (
              <option key={ seller.id } value={ seller.id }>{seller.name}</option>
            ))}
          </select>
        </label>

        <label htmlFor="address-input" className="flex address">
          Endereço
          <input
            className="address-input-field"
            type="text"
            id="address-input"
            value={ address }
            onChange={ (e) => handleChange('address', e.target.value) }
            data-testid="customer_checkout__input-address"
          />
        </label>

        <label htmlFor="number-input" className="flex number">
          Número
          <input
            className="number-input-field"
            type="number"
            id="number-input"
            value={ number }
            onChange={ (e) => handleChange('number', e.target.value) }
            data-testid="customer_checkout__input-addressNumber"
          />
        </label>
      </div>

      <button
        type="submit"
        data-testid="customer_checkout__button-submit-order"
        className="btn-checkout"
      >
        Finalizar pedido
      </button>
    </form>
  );
}

CheckoutForm.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number.isRequired,
      price: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  userId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  setOrderList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  userId: state.userInfo.id,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  setOrderList: (orders) => dispatch(setOrders(orders)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);

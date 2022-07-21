import React from 'react';
import { connect } from 'react-redux';
import CheckoutForm from '../components/checkout/CheckoutForm';
import CheckoutDetails from '../components/checkoutDetails';
import Header from '../components/navbar/Header';

function CheckoutPage() {
  return (
    <div className="details-container">
      <Header />
      <p>Finalizar Pedido</p>
      <CheckoutDetails />
      <p>Detalhes e Endereço para Entrega</p>
      <CheckoutForm />
    </div>
  );
}

export default connect(null, null)(CheckoutPage);

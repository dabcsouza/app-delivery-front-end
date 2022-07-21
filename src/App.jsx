import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import MyOrdersPage from './pages/MyOrdersPage';
import CheckoutPage from './pages/CheckoutPage';
import UserAdministration from './pages/UserAdministration';
import OrdersDetailsPage from './pages/OrdersDetailsPage';
import MyOrderDetailPage from './pages/MyOrderDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <LoginPage /> } />
      <Route path="/login" element={ <LoginPage /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <ProductsPage /> } />
      <Route path="/customer/checkout" element={ <CheckoutPage /> } />
      <Route path="/customer/orders" element={ <MyOrdersPage /> } />
      <Route path="/customer/orders/:id" element={ <MyOrderDetailPage /> } />
      <Route path="/seller/orders" element={ <OrdersPage /> } />
      <Route path="/seller/orders/:id" element={ <OrdersDetailsPage /> } />
      <Route path="/admin/manage" element={ <UserAdministration /> } />
    </Routes>
  );
}

export default App;

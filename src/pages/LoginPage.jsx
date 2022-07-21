import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';
import logo from '../images/logo.svg';
import '../components/login/login.css';

function LoginPage({ isLoggedIn }) {
  console.log(isLoggedIn);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user && isLoggedIn && user.role === 'customer') navigate('/customer/products');
  });

  return (
    <div className="login-page">
      <div className="login-container">
        <img className="embreagados" src={ logo } alt="Logo" />
        <h1>Embreagados</h1>
        <LoginForm />
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.loginInfo.isLoggedIn,
});

export default connect(mapStateToProps, null)(LoginPage);

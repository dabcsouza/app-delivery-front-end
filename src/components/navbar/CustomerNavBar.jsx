import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setNewUser, setToken, setIsLoggedIn } from '../../redux/actions';

function CustomerNavBar({ userName, setUser, setTokenState, setIsLogged }) {
  const logoutFunction = () => {
    localStorage.removeItem('user');
    setUser({});
    setTokenState('');
    setIsLogged(false);
  };

  return (
    <nav className="flex nav-bar">
      <div className="flex group-1">
        <Link
          to="/customer/products"
          className="group-1-link"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
        <Link
          to="/customer/orders"
          className="group-1-link"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus pedidos
        </Link>
      </div>

      <div className="flex group-2">
        <h1
          className="user"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {userName}
        </h1>
        <Link
          to="/login"
          className="logout"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ logoutFunction }
        >
          Sair
        </Link>
      </div>
    </nav>
  );
}

CustomerNavBar.propTypes = {
  userName: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
  setTokenState: PropTypes.func.isRequired,
  setIsLogged: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (state) => dispatch(setNewUser(state)),
  setTokenState: (token) => dispatch(setToken(token)),
  setIsLogged: (state) => dispatch(setIsLoggedIn(state)),
});

export default connect(null, mapDispatchToProps)(CustomerNavBar);

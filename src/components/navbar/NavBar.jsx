import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setNewUser, setToken, setIsLoggedIn } from '../../redux/actions';

function NavBar({ userRole, userName, setUser, setTokenState, setIsLogged }) {
  const logoutFunction = () => {
    localStorage.removeItem('user');
    setUser({});
    setTokenState('');
    setIsLogged(false);
  };

  return (
    <nav className="flex nav-bar">
      <div className="flex group-1">
        {userRole === 'seller' && (
          <h1
            className="group-1-link"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Pedidos
          </h1>
        )}
        {userRole === 'administrator' && (
          <h1
            className="group-1-link"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Gerenciar usuários
          </h1>
        )}
      </div>

      <div className="flex group-2">
        <h1
          className="user"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {userName}
        </h1>
        <Link
          data-testid="customer_products__element-navbar-link-logout"
          className="logout"
          to="/login"
          onClick={ logoutFunction }
        >
          Sair
        </Link>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  userRole: PropTypes.string.isRequired,
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

export default connect(null, mapDispatchToProps)(NavBar);

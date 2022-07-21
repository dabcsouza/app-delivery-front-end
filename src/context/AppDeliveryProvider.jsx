import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import AppDeliveryContext from './AppDeliveryContext';

function AppDeliveryProvider({ children, isLoggedIn }) {
  const [isLogged, setIsLogged] = useState(isLoggedIn);
  const VALUE = { isLogged, setIsLogged };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLogged(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    if (location.pathname === '/register') return navigate('/register');
    if (!isLoggedIn) navigate('/login');
  }, [isLoggedIn]);

  return (
    <AppDeliveryContext.Provider value={ VALUE }>
      { children }
    </AppDeliveryContext.Provider>
  );
}

AppDeliveryProvider.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.loginInfo.isLoggedIn,
});

export default connect(mapStateToProps, null)(AppDeliveryProvider);

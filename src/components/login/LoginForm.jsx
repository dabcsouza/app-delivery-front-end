import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNewUser, setToken, setIsLoggedIn } from '../../redux/actions';
import decodeToken from '../../utils/decodeToken';
import fetchLogin from '../../api/fetchLogin';
import validateLogin from '../../helpers/validateLogin';

function LoginForm({ setUser, setTokenState, setIsLogged }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successLogin, setSuccessLogin] = useState(false);
  const [disable, setDisable] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const validate = validateLogin({ email, password });

    if (validate) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email, password]);

  const handleChange = (flag, value) => {
    if (flag === 'email') setEmail(value);
    if (flag === 'password') setPassword(value);
  };

  const loginSubmit = () => {
    const credentials = {
      email,
      password,
    };

    const validate = validateLogin({ email, password });

    if (!validate) setSuccessLogin(true);

    fetchLogin(credentials)
      .then((res) => {
        const decodedToken = decodeToken(res.token);
        setTokenState(res.token);
        setIsLogged(true);
        setUser(decodedToken);

        const userObj = {
          ...decodedToken,
          token: res.token,
        };
        delete userObj.iat;
        delete userObj.exp;

        localStorage.setItem('user', JSON.stringify(userObj));
        if (decodedToken.role === 'customer') navigate('/customer/products');
        if (decodedToken.role === 'seller') navigate('/seller/orders');
        if (decodedToken.role === 'administrator') navigate('/admin/manage');
      })
      .catch(() => setSuccessLogin(true));
  };

  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault();
        loginSubmit();
      } }
      className="login-form"
    >
      <label htmlFor="email-input">
        Login
        <input
          value={ email }
          data-testid="common_login__input-email"
          onChange={ (e) => handleChange('email', e.target.value) }
          type="email"
          id="email-input"
          placeholder="Digite seu email"
        />
      </label>

      <label htmlFor="password-input">
        Senha
        <input
          value={ password }
          data-testid="common_login__input-password"
          onChange={ (e) => handleChange('password', e.target.value) }
          type="password"
          id="password-input"
          placeholder="Digite sua senha"
          className="password-input"
        />
      </label>

      <button
        disabled={ disable }
        className="btn login-btn"
        type="submit"
        data-testid="common_login__button-login"
      >
        Login
      </button>
      <button
        className="btn"
        data-testid="common_login__button-register"
        type="button"
        onClick={ () => navigate('/register') }
      >
        Ainda não tenho conta
      </button>
      {successLogin
        && (
          <span
            data-testid="common_login__element-invalid-email"
          >
            Email ou senha inválidos
          </span>)}
    </form>
  );
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setTokenState: PropTypes.func.isRequired,
  setIsLogged: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (state) => dispatch(setNewUser(state)),
  setTokenState: (token) => dispatch(setToken(token)),
  setIsLogged: (state) => dispatch(setIsLoggedIn(state)),
});

export default connect(null, mapDispatchToProps)(LoginForm);

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerUser from '../api/registerUser';
import AppDeliveryContext from '../context/AppDeliveryContext';
import validateRegister from '../helpers/validateRegister';

export default function Register() {
  const { setIsLogged } = useContext(AppDeliveryContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validRegisterForm, setValidRegisterForm] = useState(false);
  const [disable, setDisable] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const validate = validateRegister({ email, password, name });

    if (validate) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email, password, name]);

  const register = () => {
    const validate = validateRegister({ name, email, password });

    if (!validate) return setValidRegisterForm(true);

    registerUser({ name, email, password })
      .then(() => {
        setIsLogged(false);
        navigate('/');
      })
      .catch(() => setValidRegisterForm(true));
  };

  return (
    <div className="login-page">
      <div className="login-container register-container">
        <h1>Cadrastre-se</h1>
        <form
          onSubmit={ (e) => {
            e.preventDefault();
            register();
          } }
        >
          <label htmlFor="name-input">
            Nome:
            <input
              id="name-input"
              data-testid="common_register__input-name"
              placeholder="Digite seu nome"
              type="text"
              value={ name }
              onChange={ (e) => setName(e.target.value) }
            />
          </label>
          <label htmlFor="email-input">
            Email:
            <input
              id="email-input"
              placeholder="Digite seu email"
              data-testid="common_register__input-email"
              type="email"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              className="password-input"
              id="password-input"
              placeholder="Digite sua senha"
              data-testid="common_register__input-password"
              type="password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
          </label>
          <button
            disabled={ disable }
            type="submit"
            data-testid="common_register__button-register"
            className="btn login-btn"
          >
            Cadastrar
          </button>
          {validRegisterForm && (
            <span
              role="alert"
              data-testid="common_register__element-invalid_register"
            >
              Dados invalidos, confira-os e tente novamente
            </span>
          )}
        </form>
      </div>
    </div>
  );
}

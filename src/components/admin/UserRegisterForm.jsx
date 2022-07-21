import React from 'react';
import FormOption from './FormOption';
import registerUser from '../../api/registerUser';

const formOptions = [
  {
    name: 'name',
    label: 'Nome',
    type: 'text',
    required: true,
    pattern: '^[a-zA-Z0-9 ]{12,}',
    errorMessage: 'Nome precisa de no mínimo 12 caracteres',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    required: true,
    pattern: '^[a-zA-Z0-9-_.]+@[a-zA-Z]+.com$',
    errorMessage: 'Email precisa ser do tipo email@email.com',
  },
  {
    name: 'password',
    label: 'Senha',
    type: 'text',
    required: true,
    pattern: '^[a-zA-Z0-9!@#$%&*(-_,.)]{6,}',
    errorMessage: 'Senha precisa de no mínimo 6 caracteres',
  },
  { name: 'role',
    label: 'Tipo',
    type: 'select',
    selectOptions: [
      { label: 'Cliente', value: 'customer' },
      { label: 'Vendedor', value: 'seller' },
    // {label: 'Administrador', value: 'admin'}
    ] },
];
function UserRegisterForm() {
  const createUser = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newUserData = Object.fromEntries(data.entries());
    registerUser(newUserData);
  };
  return (
    <form onSubmit={ createUser } className="userRegisterForm">
      {formOptions.map((option) => (
        <FormOption key={ option.name } { ...option } />
      ))}
      <button type="submit" className="form-button">CADASTRAR</button>
    </form>
  );
}

export default UserRegisterForm;

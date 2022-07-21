import React from 'react';
import UserRegisterForm from '../components/admin/UserRegisterForm';
import Header from '../components/navbar/Header';
import '../components/admin/userAdministration.css';

function UserAdministration() {
  return (
    <>
      <Header />
      <UserRegisterForm />
    </>
  );
}

export default UserAdministration;

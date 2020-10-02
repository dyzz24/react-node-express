import { LoginRegisterForm } from '../login-register-forms';
import { UserInfo } from '../user-info';
import React from 'react';

export const Main = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <LoginRegisterForm />
      <UserInfo />
    </div>
  );
};

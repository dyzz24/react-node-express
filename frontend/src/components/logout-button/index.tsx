import { TokenService } from '../../service/token';
import { UserIdService } from '../../service/user-id';
import React, { useContext } from 'react';
import { UserActions, UserContext } from '../../reducer';

export const LogoutButton = () => {
  const { dispatch } = useContext(UserContext);
  const logout = () => {
    TokenService.clearToken();
    UserIdService.clearUserId();
    dispatch({ type: UserActions.LOGOUT, payload: '' });
  };

  return <button onClick={logout}>выйти</button>;
};

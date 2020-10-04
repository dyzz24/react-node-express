import React, { useContext, useEffect } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Routes } from '../../routes';
import { UserComponent } from './user';
import { ForumPage } from './forum-page';
import { UserActions, UserContext } from '../../reducer';
import { useCheckAuthStatus } from '../../hooks/use-check-auth-status';

export const Main = () => {
  const { state, dispatch } = useContext(UserContext);
  const { userInfo } = useCheckAuthStatus();
  useEffect(() => {
    if (userInfo) {
      dispatch({
        type: UserActions.SET_USER_DATA,
        payload: { isAuthorized: true, userInfo },
      });
    }
  }, [userInfo]);
  return (
    <BrowserRouter>
      <span>{state.userInfo.name} </span>
      <Switch>
        <Route exact path={Routes.MAIN} component={UserComponent} />
        <Route path={Routes.THEME} component={ForumPage} />
      </Switch>
    </BrowserRouter>
  );
};

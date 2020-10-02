import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Routes } from '../../routes';
import { UserComponent } from './user';
import { ForumPage } from './forum-page';

export const Main = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={Routes.MAIN} component={UserComponent} />
        <Route path={Routes.THEME} component={ForumPage} />
      </Switch>
    </BrowserRouter>
  );
};

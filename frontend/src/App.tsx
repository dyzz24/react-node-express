import React from 'react';

import { UserStateProvider } from './reducer';
import { Main } from './components/main';
// @ts-ignore
import { Route, Router, Switch } from 'react-router';
import { Routes } from './routes';

const App = () => {
  return (
    <UserStateProvider>
      <Main />
    </UserStateProvider>
  );
};

export default App;

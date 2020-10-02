import React from 'react';

import { UserStateProvider } from './reducer';
import { Main } from './components/main';

const App = () => {
  return (
    <UserStateProvider>
      <Main />
    </UserStateProvider>
  );
};

export default App;

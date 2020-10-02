import React, { useReducer } from 'react';
import { IUser } from '../components/login-register-forms';

const initialState: IInitialState = {
  isAuthorized: false,
  userInfo: {
    email: null,
    id: null,
    name: null,
    role: null,
    messages: [],
  },
};
export enum UserActions {
  AUTHORIZED = 'authorized',
  SET_USER_DATA = 'setUserData',
  LOGOUT = 'logout',
}
const userReducer = (state: IInitialState, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    case UserActions.AUTHORIZED:
      return {
        ...state,
        isAuthorized: payload,
      };
    case UserActions.SET_USER_DATA:
      return {
        ...state,
        ...payload,
      };
    case UserActions.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export const UserContext = React.createContext<IStore>({
  state: initialState,
  dispatch: () => null,
});
const { Provider } = UserContext;
export const UserStateProvider = ({ children }: IChildren) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

interface IChildren {
  children: React.ReactChild;
}

interface IStore {
  state: IInitialState;
  dispatch: React.Dispatch<IAction>;
}

interface IInitialState {
  isAuthorized: boolean;
  userInfo: IUser;
}
interface IAction {
  type: UserActions;
  payload: any;
}

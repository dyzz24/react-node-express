import styled from 'styled-components';
import React, { ChangeEvent, useState, useContext } from 'react';
import { post } from '../../http';
import { UserContext, UserActions } from '../../reducer';
import { TokenService } from '../../service/token';
import { FormContentLayout } from './form-content-layout';
import { UserIdService } from '../../service/user-id';

const SimpleForm = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;

  input {
    width: 80%;
    height: 100px;
    margin-left: 15px;
  }
`;

const initState = {
  email: '',
  name: '',
  password: '',
};

export enum LoginFields {
  EMAIL = 'email',
  NAME = 'name',
  PASSWORD = 'password',
}

export enum FormTypes {
  REGISTER = 'register',
  LOGIN = 'login',
}
type UserInfoType = { [key in LoginFields]: string };
export const LoginRegisterForm = () => {
  const [userData, setUserData] = useState<UserInfoType>(initState);
  const [responseStatus, setResponseStatus] = useState<string | undefined>('');
  const [formType, setFormType] = useState(FormTypes.LOGIN);
  const { dispatch } = useContext(UserContext);

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: LoginFields
  ) => {
    e.persist();
    setUserData((state) => ({ ...state, [key]: e.target.value }));
  };

  const sendRequestHandler = async (path: string, userData: UserInfoType) => {
    const data = await post<IGlobalResponse>(path, userData);
    if (data.status < 400) {
      setResponseStatus('all cool');
      dispatch({
        type: UserActions.SET_USER_DATA,
        payload: { isAuthorized: true, userInfo: { ...data.data.user } },
      });
      TokenService.setToken(
        data.data.tokens.access.token,
        data.data.tokens.refresh.token
      );
      UserIdService.setUserId(data.data.user.id);
    } else {
      setResponseStatus(data.data.message);
      setTimeout(() => {
        setResponseStatus('');
      }, 3000);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formType === FormTypes.REGISTER) {
      await sendRequestHandler('/v1/auth/register', userData);
    } else {
      const editedUserData = { ...userData };
      delete editedUserData.name;
      await sendRequestHandler('/v1/auth/login', editedUserData);
    }
  };

  const selectFormType = () =>
    formType === FormTypes.LOGIN
      ? setFormType(FormTypes.REGISTER)
      : setFormType(FormTypes.LOGIN);

  return (
    <SimpleForm onSubmit={onSubmit}>
      <FormContentLayout
        formType={formType}
        userData={userData}
        onInputChange={onInputChange}
      />
      <button onClick={selectFormType} type={'button'}>
        {formType === FormTypes.LOGIN ? 'Регистрация' : 'Вход'}
      </button>
      <button type={'submit'}>ввести</button>
      {responseStatus}
    </SimpleForm>
  );
};

export interface IUser {
  email: string | null;
  id: string | null;
  name: string | null;
  role: string | null;
  messages: { title: string; text: string }[];
}

export interface ITokens {
  access: {
    token: string;
  };
  refresh: {
    token: string;
  };
}

export interface IGlobalResponse {
  message?: string;
  user: IUser;
  tokens: ITokens;
}

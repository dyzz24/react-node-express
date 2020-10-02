import React, { useContext, useEffect, useState } from 'react';
import { UserActions, UserContext } from '../../reducer';
import { useCheckAuthStatus } from '../../hooks/use-check-auth-status';
import { get, post } from '../../http';
import { UserIdService } from '../../service/user-id';
import { LogoutButton } from '../logout-button';

export const UserInfo = () => {
  const { state, dispatch } = useContext(UserContext);
  const { userInfo } = useCheckAuthStatus();
  const [message, setMessage] = useState({ title: '', text: '' });
  const [themes, setThemes] = useState<IThemeResult[]>([]);

  useEffect(() => {
    if (userInfo) {
      dispatch({
        type: UserActions.SET_USER_DATA,
        payload: { isAuthorized: true, userInfo },
      });
    }
  }, [userInfo]);

  const getThemes = async () => {
    const themes = await get<IThemes>(`/v1/messages/`);
    if (themes.status === 200) {
      setThemes(themes.data.results);
    }
    console.log(themes);
  };

  useEffect(() => {
    getThemes();
  }, []);

  const createTheme = async () => {
    const data = await post(`/v1/messages/${UserIdService.getUserId()}/theme`, {
      ...message,
      userId: UserIdService.getUserId(),
      userName: state.userInfo.name,
    });
    // const data = await patch<IUser>(
    //   `/v1/users/${UserIdService.getUserId()}/message`,
    //   message
    // );
    //
    // if (data.status === 200) {
    //   dispatch({
    //     type: UserActions.SET_USER_DATA,
    //     payload: { ...state, userInfo: data.data },
    //   });
    // }
  };

  return (
    <div>
      <span>{state.userInfo.name}</span>
      <span>{state.userInfo.email}</span>
      <span>{state.userInfo.id}</span>
      <span>{state.userInfo.role}</span>
      {themes.map((message, idx) => (
        <p key={idx}>
          {message.text} {message.title}
        </p>
      ))}
      <input
        value={message.title}
        onChange={(e) => {
          e.persist();
          setMessage((mess) => ({ ...mess, title: e.target.value }));
        }}
      />
      <input
        value={message.text}
        onChange={(e) => {
          e.persist();
          setMessage((mess) => ({ ...mess, text: e.target.value }));
        }}
      />
      <LogoutButton />
      <button onClick={createTheme}>send message</button>
    </div>
  );
};

interface IThemes {
  results: IThemeResult[];
}
interface IThemeResult {
  id: string;
  messages: [];
  text: string;
  title: string;
  userId: string;
}

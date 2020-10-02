import React, { useContext, useEffect, useState } from 'react';
import { UserActions, UserContext } from '../../reducer';
import { useCheckAuthStatus } from '../../hooks/use-check-auth-status';
import { patch, post } from '../../http';
import { UserIdService } from '../../service/user-id';
import { IUser } from '../login-register-forms';
import { LogoutButton } from '../logout-button';

export const UserInfo = () => {
  const { state, dispatch } = useContext(UserContext);
  const { userInfo } = useCheckAuthStatus();
  const [message, setMessage] = useState({ title: '', text: '' });

  useEffect(() => {
    if (userInfo) {
      dispatch({
        type: UserActions.SET_USER_DATA,
        payload: { isAuthorized: true, userInfo },
      });
    }
  }, [userInfo]);

  const sendMessage = async () => {
    const data = await post(`/v1/messages/${UserIdService.getUserId()}/theme`, {
      ...message,
      userId: UserIdService.getUserId(),
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
      {state.userInfo.messages.map((message, idx) => (
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
      <button onClick={sendMessage}>send message</button>
    </div>
  );
};

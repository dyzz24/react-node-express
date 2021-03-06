import React, { useContext, useEffect, useState } from 'react';

import { get, post } from '../../http';
import { UserIdService } from '../../service/user-id';
import { LogoutButton } from '../logout-button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../reducer';

const CustomLink = styled(Link)`
  display: block;
  margin-bottom: 5px;
`;

export const UserInfo = () => {
  const [message, setMessage] = useState({ title: '', text: '' });
  const [themes, setThemes] = useState<IThemeResult[]>([]);
  const { state } = useContext(UserContext);

  const getThemes = async () => {
    const themes = await get<IThemeResult[]>(`/v1/forum-pages/`);
    if (themes.status === 200) {
      console.log(themes);
      setThemes(themes.data);
    }
  };

  useEffect(() => {
    getThemes();
  }, []);

  const createTheme = async () => {
    const data = await post<IThemeResult>(
      `/v1/forum-pages/${UserIdService.getUserId()}/new-topic`,
      {
        ...message,
        userId: UserIdService.getUserId(),
      }
    );

    if (data.status < 400) setThemes([...themes, data.data]);
  };

  return (
    <div>
      is active:
      <span>{state.userInfo.name} </span>
      <span>{state.userInfo.email} </span>
      <span>{state.userInfo.role} </span>
      {themes.length > 0 &&
        themes.map((message, idx) => (
          <CustomLink key={idx} to={`/theme/${message.id}`}>
            {' '}
            сообщение: {message.text} тема: {message.title} автор:{' '}
            {message.userName} дата создания: {message.createdDate}
          </CustomLink>
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

interface IThemeResult {
  id: string;
  messages: [];
  text: string;
  title: string;
  userId: string;
  userName: string;
  createdDate: string;
}

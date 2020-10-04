import React, { ChangeEvent, useState } from 'react';
import { get, post } from '../../../http';
import { UserIdService } from '../../../service/user-id';

export const NewMessage: React.FC<{ themeId: string }> = ({ themeId }) => {
  const [message, setMessage] = useState({ title: '', text: '' });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    e.persist();
    setMessage((state) => ({ ...state, [key]: e.target.value }));
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await post(`/v1/forum-pages/forum-page/messages/${themeId}`, {
      ...message,
      userId: UserIdService.getUserId(),
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={message.title}
        onChange={(event) => onInputChange(event, 'title')}
      />
      <input
        value={message.text}
        onChange={(event) => onInputChange(event, 'text')}
      />
      <button type={'submit'} />
    </form>
  );
};

import React, { ChangeEvent, useState } from 'react';

export const NewMessage = () => {
  const [message, setMessage] = useState({ title: '', text: '' });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    e.persist();
    setMessage((state) => ({ ...state, [key]: e.target.value }));
  };
  return (
    <form>
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

import React, { useState } from 'react';

export const NewMessage = () => {
  const [message, setMessage] = useState({ title: '', text: '' });
  return (
    <form>
      <input />
      <input />
      <button type={'submit'} />
    </form>
  );
};

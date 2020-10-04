import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { get, post } from '../../../http';
import { NewMessage } from '../new-message';

export const ForumPage = () => {
  const location = useRouteMatch();
  const { themeId } = location.params as { themeId: string };
  const [messages, setMessages] = useState<IMessage[]>([]);
  const getForumPageData = async () => {
    const data = await get(`/v1/forum-pages/forum-page/${themeId}`);
  };

  const getForumMessages = async () => {
    const data = await get<IMessage[]>(
      `/v1/forum-pages/forum-page/messages/${themeId}`
    );
    if (data.status === 200) {
      setMessages(data.data);
    }
  };
  useEffect(() => {
    getForumPageData();
    getForumMessages();
  }, [themeId]);

  return (
    <div>
      i am forum page {themeId}
      <NewMessage themeId={themeId} />
      {messages.map((elem) => (
        <p key={elem.id}>{elem.text}</p>
      ))}
    </div>
  );
};

interface IMessage {
  text: string;
  title: string;
  userId: string;
  userName: string;
  id: string;
}

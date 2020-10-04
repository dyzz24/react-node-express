import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { get, post } from '../../../http';
import { NewMessage } from '../new-message';

export const ForumPage = () => {
  const location = useRouteMatch();
  const { themeId } = location.params as { themeId: string };
  const getForumPage = async () => {
    const data = await get(`/v1/forum-pages/forum-page/${themeId}`);
    console.log(data);
  };

  const getForumMessages = async () => {
    const data = await get(`/v1/forum-pages/forum-page/messages/${themeId}`);
    console.log(data);
  };
  useEffect(() => {
    getForumPage();
    getForumMessages();
  }, [themeId]);

  return (
    <div>
      i am forum page {themeId}
      <NewMessage />
    </div>
  );
};

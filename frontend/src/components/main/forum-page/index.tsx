import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { get } from '../../../http';

export const ForumPage = () => {
  const location = useRouteMatch();
  const { themeId } = location.params as { themeId: string };
  const getForumPage = async () => {
    const data = get(`/v1/messages/forum-page/${themeId}`);
  };
  useEffect(() => {
    getForumPage();
  }, [themeId]);
  console.log(themeId);
  return <div>i am forum page {themeId}</div>;
};

import React from 'react';
import { useRouteMatch } from 'react-router';

export const ForumPage = () => {
  const location = useRouteMatch();
  const { themeId } = location.params as { themeId: string };
  console.log(themeId);
  return <div>i am forum page {themeId}</div>;
};

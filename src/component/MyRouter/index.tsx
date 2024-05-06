import React from 'react';
import { useRoutes } from 'react-router-dom';
import { MyError } from '../../page/MyError';
import { Layout } from '../../page/Layout';
import { Posts } from '../../page/Posts';
import { AddPost } from '../../page/AddPost';
import { DetailsPosts } from '../../page/DetailsPosts';

export const MyRouter = React.memo(() => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Posts /> },
        { path: 'addPosts', element: <AddPost /> },
        { path: 'details/:id', element: <DetailsPosts /> },
      ],
    },
    {
      path: '*',
      element: <MyError />,
    },
  ]);

  return routes;
});

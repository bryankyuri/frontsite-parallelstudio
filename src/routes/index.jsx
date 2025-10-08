import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Works from '../pages/Works';
import WorkDetail from '../pages/WorkDetail';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import { ScrollToTop } from '../components/ScrollToTop';
import { RouterProgress } from '../components/RouterProgress';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <RouterProgress />
        <ScrollToTop>
          <Layout />
        </ScrollToTop>
      </>
    ),
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => null
      },
      {
        path: 'about',
        element: <About />,
        loader: () => null
      },
      {
        path: 'works',
        element: <Works />,
        loader: () => null
      },
      {
        path: 'works/:workId/:slug',
        element: <WorkDetail />,
        loader: ({ params }) => params || null
      },
      {
        path: 'contact',
        element: <Contact />,
        loader: () => null
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default router;
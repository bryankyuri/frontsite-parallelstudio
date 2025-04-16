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

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ScrollToTop>
        <Layout />
      </ScrollToTop>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'works',
        element: <Works />
      },
      {
        path: 'works/:workId',
        element: <WorkDetail />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default router;
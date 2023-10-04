import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/RootLayout';
import Catalog from '../pages/Catalog';
import New from '../pages/New';
import Product from '../pages/Product';
import Profile from '../pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Catalog />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/product/:id',
        element: <Product />,
      },
      { path: '/new', element: <New /> },
    ],
  },
]);

export default router;

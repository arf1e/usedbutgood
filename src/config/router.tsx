import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/RootLayout';
import Catalog from '../pages/Catalog';
import Product from '../pages/Product';

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
        path: '/product/:id',
        element: <Product />,
      },
    ],
  },
]);

export default router;

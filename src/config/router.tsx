import { createBrowserRouter } from 'react-router-dom';
import EditProductSwitch from '../components/EditProductSwitch';
import RootLayout from '../components/RootLayout';
import Catalog from '../pages/Catalog';
import NewProduct from '../pages/NewProduct';
import NotFound from '../pages/NotFound';
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
      { path: '/new', element: <NewProduct /> },
      {
        path: '/edit/:id',
        element: <EditProductSwitch />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;

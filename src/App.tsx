import { RouterProvider } from 'react-router-dom';
import CartOverlayContextProvider from './components/CartOverlayContextProvider';
import router from './config/router';

const App = () => {
  return (
    <CartOverlayContextProvider>
      <RouterProvider router={router} />
    </CartOverlayContextProvider>
  );
};

export default App;

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/root.css';
import { Provider } from 'react-redux';
import store, { persistor } from './slices';
import { PersistGate } from 'redux-persist/integration/react';
import ColorModeContextProvider from './components/ColorModeProvider';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ColorModeContextProvider>
        <App />
      </ColorModeContextProvider>
    </PersistGate>
  </Provider>
);

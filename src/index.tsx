import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CategoryContextProvider from './contexts/category.context';
import { Provider } from 'react-redux';
// @ts-expect-error error
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <CategoryContextProvider>
          <App />
        </CategoryContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();

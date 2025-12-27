import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import rootReducer from '../store/root-reduces';
import { RootState } from '../store/store';

export const renderWithRedux = (
  component: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
    }),
    ...renderOptions
  }: { preloadedState: RootState, store?: any },
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  };
  return render(component, { wrapper: Wrapper, ...renderOptions });
};

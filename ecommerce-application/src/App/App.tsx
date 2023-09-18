import React, { useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import { Toast } from '../components/Toast/Toast';
import { ApiRootContextProvider } from '../context/ApiRootContext';
import { CartContextProvider } from '../context/CartContext';
import { router } from './routes/router';
import './styles/app.scss';
import './styles/vars.scss';
import { initializeApp } from './utils/utils';
import { Loader } from '../components/Loader';

export function App(): React.ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  initializeApp().finally(() => setIsLoading(false));
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <ApiRootContextProvider>
        <CartContextProvider>
          <RouterProvider router={router} />
        </CartContextProvider>
      </ApiRootContextProvider>
      <Toast />
    </>
  );
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'reset-css';
import { RouterProvider } from 'react-router-dom';
import router from './Router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { sendMessageToSlack, showErrorToast } from './shared/errors.ts';
import { showSuccessToast } from './shared/utils.ts';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onSuccess: () => {
        showSuccessToast();
      },
      onError: (error: unknown) => {
        showErrorToast();
        sendMessageToSlack(error);
      },
    },
  },
});

if (import.meta.env.MODE !== 'test')
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  );

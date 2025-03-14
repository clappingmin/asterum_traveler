import React from 'react';
import type { PageContext } from './types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { showSuccessToast } from '@/shared/utils';
import { sendMessageToSlack, showErrorToast } from '@/shared/errors';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '@/components/global/Layout';

export { PageShell };

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

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <Layout>{children}</Layout>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

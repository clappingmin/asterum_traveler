import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { showSuccessToast } from "@/shared/utils";
import { sendMessageToSlack, showErrorToast } from "@/shared/errors";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "@/components/global/Layout";
import type { PageContext } from "./types";
import { PageContextProvider } from "./usePageContext";

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

console.log(`
  █████╗ ███████╗████████╗███████╗██████╗ ██╗   ██╗███╗   ███╗     
 ██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗██║   ██║████╗ ████║     
 ███████║███████╗   ██║   █████╗  ██████╔╝██║   ██║██╔████╔██║     
 ██╔══██║╚════██║   ██║   ██╔══╝  ██╔══██╗██║   ██║██║╚██╔╝██║     
 ██║  ██║███████║   ██║   ███████╗██║  ██║╚██████╔╝██║ ╚═╝ ██║     
 ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝     
                                                                   
 ████████╗██████╗  █████╗ ██╗   ██╗███████╗██╗     ███████╗██████╗ 
 ╚══██╔══╝██╔══██╗██╔══██╗██║   ██║██╔════╝██║     ██╔════╝██╔══██╗
    ██║   ██████╔╝███████║██║   ██║█████╗  ██║     █████╗  ██████╔╝
    ██║   ██╔══██╗██╔══██║╚██╗ ██╔╝██╔══╝  ██║     ██╔══╝  ██╔══██╗
    ██║   ██║  ██║██║  ██║ ╚████╔╝ ███████╗███████╗███████╗██║  ██║
    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝                                                                                                                                                                                                                                                                                   
 `);

function PageShell({
  children,
  pageContext,
}: {
  children: React.ReactNode;
  pageContext: PageContext;
}) {
  const isDev = import.meta.env.MODE === "dev";

  const content = (
    <>
      {isDev && <ReactQueryDevtools initialIsOpen={true} />}{" "}
      <PageContextProvider pageContext={pageContext}>
        <Layout>{children}</Layout>
      </PageContextProvider>
    </>
  );

  return (
    <QueryClientProvider client={queryClient}>
      {isDev ? <React.StrictMode>{content}</React.StrictMode> : content}
    </QueryClientProvider>
  );
}

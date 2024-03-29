import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { NextComponentType } from "next";
import AuthGuard from "features/guard/AuthGuard";
import AuthProvider from "features/providers/auth/AuthProvider";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
import ModalProvider from "features/providers/modal/ModalProvider";

const queryClient = new QueryClient();

export type CustomAppProps = AppProps & {
  Component: NextComponentType & { requireAuth?: boolean };
};

export default function App({
  Component,
  pageProps: { ...pageProps },
}: CustomAppProps) {
  return (
    <RecoilRoot>
      <RecoilNexus />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ModalProvider>
            {Component.requireAuth ? (
              <AuthGuard>
                <Component {...pageProps} />
              </AuthGuard>
            ) : (
              <Component {...pageProps} />
            )}
          </ModalProvider>
        </AuthProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

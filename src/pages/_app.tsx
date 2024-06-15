import AuthPersist from "@/components/shared/AuthPersist";
import Modals from "@/components/shared/Modals";
import { onest } from "@/fonts/google";
import { cn } from "@/lib/utils";
import { store } from "@/store";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthPersist>
          <NextUIProvider>
            <div className={cn(onest.variable)}>
              <Component {...pageProps} />
            </div>
            <Modals />
            <Toaster />
          </NextUIProvider>
        </AuthPersist>
      </QueryClientProvider>
    </Provider>
  );
}

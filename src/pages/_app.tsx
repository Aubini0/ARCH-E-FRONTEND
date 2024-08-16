import AuthPersist from "@/components/shared/AuthPersist";
import Modals from "@/components/shared/Modals";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { montserrat, onest } from "@/fonts/google";
import { cn } from "@/lib/utils";
import { store } from "@/store";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster as ReactHotToastToaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0" />
        </Head>
        <AuthPersist>
          <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
            <NextUIProvider>
              <div suppressHydrationWarning className={cn(onest.variable, montserrat.variable)}>
                <Component {...pageProps} />
              </div>
              <Modals />
              <ReactHotToastToaster />
              <Toaster />
            </NextUIProvider>
          </ThemeProvider>
        </AuthPersist>
      </QueryClientProvider>
    </Provider>
  );
}

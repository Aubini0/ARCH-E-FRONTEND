import { onest } from "@/fonts/google";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <div className={cn(onest.variable)}>
        <Component {...pageProps} />
      </div>
    </NextUIProvider>
  );
}

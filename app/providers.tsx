"use client";

import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { WagmiProvider } from "wagmi";

import config from "@/lib/wallet";

import AuthenticationProvider from "./authentication";

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <SessionProvider>
        <RainbowKitSiweNextAuthProvider>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={darkTheme()}>
              <AuthenticationProvider>{children}</AuthenticationProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiProvider>
  );
};
export default Providers;

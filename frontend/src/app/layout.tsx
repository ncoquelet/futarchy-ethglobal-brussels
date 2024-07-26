"use client";

import { Inter } from "next/font/google";

// Chakra UI
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Wagmi & RainbowKit
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { hardhat, kakarotSepolia, sepolia } from "@wagmi/core/chains";
import { createConfig, http, WagmiProvider } from "wagmi";

// Styles
import { CacheProvider } from "@chakra-ui/next-js";
import "./globals.css";

// Providers
import { NextIntlClientProvider } from "next-intl";
import { FutarchyProvider } from "@/context/FutarchyContext";
import NotificationProvider from "@/context/NotificationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });
const timeZone = "Europe/Paris";

const theme = extendTheme({
  colors: {
    customBlue: {
      100: "#2730FF",
      // ...
      900: "#2730FF",
    },
    customDark: {
      100: "#25262A",
      // ...
      900: "#25262A",
    },
    customLight: {
      100: "#9DA3AE",
      // ...
      900: "#9DA3AE",
    },
  },
});

const queryClient = new QueryClient();

export default function RootLayout({ children }: PropsWithChildren) {
  const { connectors } = getDefaultConfig({
    appName: "FlutarchETH",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_KEY as string,
    chains: [hardhat, kakarotSepolia, sepolia],
  });

  const wagmiConfig = createConfig({
    chains: [hardhat, kakarotSepolia, sepolia],
    transports: {
      [hardhat.id]: http(),
      [kakarotSepolia.id]: http(),
      [sepolia.id]: http(),
    },
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="">
          <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider modalSize="compact">
                <CacheProvider>
                  <ChakraProvider
                    theme={theme}
                    toastOptions={{ defaultOptions: { isClosable: true } }}
                  >
                    <NextIntlClientProvider locale="en" timeZone={timeZone}>
                      <NotificationProvider>
                        <FutarchyProvider>
                          <main>{children}</main>
                        </FutarchyProvider>
                      </NotificationProvider>
                    </NextIntlClientProvider>
                  </ChakraProvider>
                </CacheProvider>
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </div>
      </body>
    </html>
  );
}

"use client";

import { Inter } from "next/font/google";

// Chakra UI
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Wagmi & RainbowKit
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { hardhat, sepolia } from "@wagmi/core/chains";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

// Styles
import { CacheProvider } from "@chakra-ui/next-js";
import "./globals.css";

// Providers
import { NextIntlClientProvider } from "next-intl";
import { FutarchyProvider } from "@/context/FutarchyContext";
import NotificationProvider from "@/context/NotificationContext";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { chains, publicClient } = configureChains(
    [sepolia, hardhat],
    [
      // alchemyProvider({
      //   apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string,
      // }),
      publicProvider(),
    ],
  );

  const { connectors } = getDefaultWallets({
    appName: "FlutarchETH",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_KEY as string,
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="">
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} modalSize="compact">
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
          </WagmiConfig>
        </div>
      </body>
    </html>
  );
}

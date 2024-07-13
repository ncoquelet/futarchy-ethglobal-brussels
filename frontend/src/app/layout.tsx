"use client";

import { Inter } from "next/font/google";
import Link from 'next/link'

// Chakra UI
import { Button, ButtonGroup } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"

// Wagmi & RainbowKit
import { ConnectButton, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { hardhat, polygonMumbai, sepolia } from "@wagmi/core/chains";
import { useConnect, useAccount , configureChains, createConfig, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

// Styles
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import "./globals.css";

// Providers
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({ subsets: ["latin"] });
const timeZone = "Europe/Paris";

const theme = extendTheme({
  colors: {
    darkblue: '#2730FF'
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { chains, publicClient } = configureChains(
    [sepolia, hardhat, polygonMumbai],
    [
      alchemyProvider({
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string,
      }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "RobinWood",
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
                <ChakraProvider theme={theme}
                  toastOptions={{ defaultOptions: { isClosable: true } }}
                >
                  <NextIntlClientProvider locale="en" timeZone={timeZone}>
                    <main className="">
                      <div className="header">
                        <div style={{display: 'flex'}}>
                          <div>
                            <Button colorScheme='blue' size='sm'>
                              <Link href="/">
                                Home
                              </Link>
                            </Button>
                          </div>
                          <div style={{marginLeft: '2rem'}}>
                            <Button colorScheme='blue' size='sm'>Profile</Button>
                          </div>
                        </div>
                        <div style={{display: 'flex'}}>
                          <div>
                            <Button colorScheme='blue' size='sm'>Sign up</Button>
                          </div>
                          <div style={{marginLeft: '2rem'}}>
                            <ConnectButton />
                          </div>
                        </div>
                      </div>
                      {children}
                    </main>
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
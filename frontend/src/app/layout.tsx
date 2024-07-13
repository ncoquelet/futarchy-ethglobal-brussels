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
                            <Button size='sm' variant='ghost'>
                              <Link href="/">
                                Home
                              </Link>
                            </Button>
                          </div>
                          <div style={{marginLeft: '2rem'}}>
                            <Button size='sm' variant='ghost'>Profile</Button>
                          </div>
                        </div>
                        <div style={{display: 'flex'}}>
                          <div>
                            <Button bg='customBlue.100' color='white' borderColor='customBlue.100' size='sm'>Sign up</Button>
                          </div>
                          <div style={{marginLeft: '2rem'}}>
                            <ConnectButton.Custom>
                              {({
                                account,
                                chain,
                                openAccountModal,
                                openChainModal,
                                openConnectModal,
                                authenticationStatus,
                                mounted,
                              }) => {
                                // Note: If your app doesn't use authentication, you
                                // can remove all 'authenticationStatus' checks
                                const ready = mounted && authenticationStatus !== 'loading';
                                const connected =
                                  ready &&
                                  account &&
                                  chain &&
                                  (!authenticationStatus ||
                                    authenticationStatus === 'authenticated');
                                return (
                                  <div
                                    {...(!ready && {
                                      'aria-hidden': true,
                                      'style': {
                                        opacity: 0,
                                        pointerEvents: 'none',
                                        userSelect: 'none',
                                      },
                                    })}
                                  >
                                    {(() => {
                                      if (!connected) {
                                        return (
                                          <Button variant='outline' color='customBlue.100' size='sm' onClick={openConnectModal} type="button" borderColor='customBlue.100'>
                                            Connect Wallet
                                          </Button>
                                        );
                                      }
                                      if (chain.unsupported) {
                                        return (
                                          <Button variant='outline' color='customBlue.100' size='sm' onClick={openChainModal} type="button" borderColor='customBlue.100'>
                                            Wrong network
                                          </Button>
                                        );
                                      }
                                      return (
                                        <div style={{ display: 'flex', gap: 12 }}>
                                          <Button variant='outline' color='customBlue.100' size='sm'
                                            onClick={openChainModal}
                                            style={{ display: 'flex', alignItems: 'center' }}
                                            type="button"
                                            borderColor='customBlue.100'
                                          >
                                            {chain.hasIcon && (
                                              <div
                                                style={{
                                                  background: chain.iconBackground,
                                                  width: 12,
                                                  height: 12,
                                                  borderRadius: 999,
                                                  overflow: 'hidden',
                                                  marginRight: 4,
                                                }}
                                              >
                                                {chain.iconUrl && (
                                                  <img
                                                    alt={chain.name ?? 'Chain icon'}
                                                    src={chain.iconUrl}
                                                    style={{ width: 12, height: 12 }}
                                                  />
                                                )}
                                              </div>
                                            )}
                                            {chain.name}
                                          </Button>
                                          <Button variant='outline' color='customBlue.100' size='sm' onClick={openAccountModal} type="button" borderColor='customBlue.100'>
                                            {account.displayName}
                                            {account.displayBalance
                                              ? ` (${account.displayBalance})`
                                              : ''}
                                          </Button>
                                        </div>
                                      );
                                    })()}
                                  </div>
                                );
                              }}
                            </ConnectButton.Custom>
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
"use client";

import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export const Header = () => {
  return (
    <>
      <Flex mx={8} mt={4} mb={2}>
        <HStack>
          <Heading>
            <Link className="logo" href={"/"}>FutarchEth</Link>
          </Heading>
        </HStack>
        <Spacer />
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
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === "authenticated");
            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <Button
                        variant="outline"
                        color="customBlue.100"
                        size="sm"
                        onClick={openConnectModal}
                        type="button"
                        borderColor="customBlue.100"
                      >
                        Connect Wallet
                      </Button>
                    );
                  }
                  if (chain.unsupported) {
                    return (
                      <Button
                        variant="outline"
                        color="customBlue.100"
                        size="sm"
                        onClick={openChainModal}
                        type="button"
                        borderColor="customBlue.100"
                      >
                        Wrong network
                      </Button>
                    );
                  }
                  return (
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                      }}
                    >
                      <Button
                        variant="outline"
                        color="customBlue.100"
                        size="sm"
                        onClick={openChainModal}
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        type="button"
                        borderColor="customBlue.100"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: "hidden",
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                style={{
                                  width: 12,
                                  height: 12,
                                }}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </Button>
                      <Button
                        variant="outline"
                        color="customBlue.100"
                        size="sm"
                        onClick={openAccountModal}
                        type="button"
                        borderColor="customBlue.100"
                      >
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ""}
                      </Button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </Flex>
      <Divider />
    </>
  );
};

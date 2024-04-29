import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { injectedWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Injected",
      wallets: [injectedWallet],
    },
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet],
    },
  ],
  {
    appName: "Zoth",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT as string,
  }
);

export default connectors;

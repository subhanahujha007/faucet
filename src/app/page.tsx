// app/page.tsx

"use client";

import dynamic from "next/dynamic";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import "@solana/wallet-adapter-react-ui/styles.css";

// Dynamically import the components to disable SSR
const Balance = dynamic(() => import("./_components/balance"), { ssr: false });
const Airdrop = dynamic(() => import("./_components/airdrop"), { ssr: false });
const SendTransaction = dynamic(() => import("./_components/sendtrascation"), { ssr: false });

const WalletContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConnectionProvider endpoint={clusterApiUrl(WalletAdapterNetwork.Devnet)}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          {children}
          <WalletMultiButton/>
          </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default function Home() {
  return (
    <WalletContextProvider>
      <center>
        <div className="flex flex-col gap-4 border-black border-2 min-h-[60vh] rounded-lg bg-yellow-300 max-w-[25vw] items-center justify-center mx-auto">
          <Airdrop />
          <Balance />
          <SendTransaction />
        </div>
      </center>
    </WalletContextProvider>
  );
}

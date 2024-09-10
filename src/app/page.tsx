// app/page.tsx

"use client";
import bg from "../../public/background.jpg"
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import "@solana/wallet-adapter-react-ui/styles.css";

// Dynamically import the components to disable SSR
const Balance = dynamic(() => import("./_components/balance"), { ssr: false });
const Airdrop = dynamic(() => import("./_components/airdrop"), { ssr: false });
const SendTransaction = dynamic(() => import("./_components/sendtrascation"), { ssr: false });

const WalletContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-[100vw] h-[100vh]">
    <Image
      src={bg}
      alt="bg"
      layout="fill"
      objectFit="cover"
      className="absolute top-0 left-0 -z-10"
    />
    <ConnectionProvider  endpoint={clusterApiUrl(WalletAdapterNetwork.Devnet)}>
      <WalletProvider wallets={[]} autoConnect>
        <h2 className="ml-[500px] text-[40px]">Welcome to Airnet</h2>
        <WalletModalProvider>
          {children}
          <div className="flex flex-col gap-4 max-w-[200px] mx-auto items-center pt-5">
          <WalletMultiButton/>
          <WalletDisconnectButton/>
          </div>
          </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    </div>
  );
};

export default function Home() {
  return (
    <>
    <WalletContextProvider>
      <center>
        <div className="flex flex-col gap-4 border-black border-2 min-h-[60vh] rounded-lg bg-yellow-300 max-w-[25vw] items-center justify-center mx-auto">
          <Airdrop />
          <Balance />
          <SendTransaction />
        </div>
      </center>
    </WalletContextProvider>
    </>
  );
}

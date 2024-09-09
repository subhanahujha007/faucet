// components/Airdrop.tsx

"use client";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useState, ChangeEvent } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const Airdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amountSol, setAmount] = useState<number>(0);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setAmount(Number(e.target.value));
  }

  async function requestAirdrop() {
    if (!wallet.publicKey) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      await connection.requestAirdrop(
        wallet.publicKey,
        amountSol * LAMPORTS_PER_SOL
      );
      alert(`Airdropped ${amountSol} SOL to ${wallet.publicKey.toBase58()}`);
    } catch (error) {
      console.error("Airdrop failed:", error);
      alert("Airdrop request failed. Please try again.");
    }
  }

  return (
    <div>
      <h2>Connect to your Wallet and Ask for Airdrop</h2>
      <input
        type="text"
        onChange={handleOnChange}
        className="b-2 border-black p-2"
        placeholder="Enter the Solana amount"
        id="sol"
      />
      <button
        className="bg-black text-white p-2 max-w-[50%] rounded-md"
        onClick={requestAirdrop}
      >
        Airdrop
      </button>
    </div>
  );
};

export default Airdrop;

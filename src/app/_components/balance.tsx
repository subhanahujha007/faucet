// components/Balance.tsx

"use client";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useRef } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const Balance = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const balanceRef = useRef<HTMLDivElement | null>(null);

  async function getBalance() {
    if (wallet.publicKey && balanceRef.current) {
      const balance = await connection.getBalance(wallet.publicKey);
      balanceRef.current.innerHTML = (balance / LAMPORTS_PER_SOL).toFixed(2);
    }
  }

  return (
    <div>
      <p>SOL Balance:</p>
      <div id="balance" ref={balanceRef}></div>
      <button
        className="bg-black text-white p-2 max-w-[80%] rounded-md"
        onClick={getBalance}
      >
        Get Balance
      </button>
    </div>
  );
};

export default Balance;

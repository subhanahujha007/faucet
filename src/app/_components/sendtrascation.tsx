// components/SendTransaction.tsx

"use client";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useRef } from "react";
import { LAMPORTS_PER_SOL, Transaction, SystemProgram, PublicKey } from "@solana/web3.js";

const SendTransaction = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const toRef = useRef<HTMLInputElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);

  async function sendTokens() {
    if (!wallet.publicKey || !toRef.current || !amountRef.current) {
      alert("Please connect your wallet first.");
      return;
    }

    const to = toRef.current.value;
    const amount = parseFloat(amountRef.current.value);

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(to),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      await wallet.sendTransaction(transaction, connection);
      alert(`Sent ${amount} SOL to ${to}`);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Sending tokens failed. Please check the address and try again.");
    }
  }

  return (
    <div>
      <input
        type="text"
        ref={toRef}
        placeholder="Recipient Address"
        className="b-2 border-black p-2"
      />
      <input
        type="text"
        ref={amountRef}
        placeholder="Amount"
        className="b-2 border-black p-2"
      />
      <button
        onClick={sendTokens}
        className="bg-black text-white p-2 max-w-[50%] rounded-md"
      >
        Send Tokens
      </button>
    </div>
  );
};

export default SendTransaction;

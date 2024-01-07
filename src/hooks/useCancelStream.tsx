import React from "react";
import useSolanaStreamClient from "./useSolanaStreamClient";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { SignerWalletAdapter } from "@solana/wallet-adapter-base";

export default function useCancelStream() {
  const { client } = useSolanaStreamClient();
  const anchorWallet = useAnchorWallet();

  async function cancelStream(id: string) {
    if (!anchorWallet) return;
    const { ixs, txId } = await client.cancel(
      {
        id: id,
      },
      {
        invoker: anchorWallet as SignerWalletAdapter,
      }
    );
    return { ixs, txId };
  }

  return { cancelStream };
}

import { getBN } from "@streamflow/stream";
import useSolanaStreamClient from "./useSolanaStreamClient";
import getSecondsFromDays from "@/utils/getSecondsFromDays";
import { BN } from "@project-serum/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { SignerWalletAdapter } from "@solana/wallet-adapter-base";

export default function useCreateStream() {
  const { client } = useSolanaStreamClient();
  const anchorWallet = useAnchorWallet();

  async function createStream() {
    if (!anchorWallet) return;
    const { ixs, metadataId, txId } = await client.create(
      {
        amount: getBN(1, 6),
        amountPerPeriod: getBN(0.01, 6),
        cancelableByRecipient: true,
        cancelableBySender: true,
        canTopup: false,
        cliff: getSecondsFromDays(30),
        cliffAmount: new BN(1),
        name: "HELLO",
        period: 1,
        recipient: "CZA6Cqz59PioMHfZFjouL54DM4U7yxBDphaVjJUAzLXL",
        start: 0,
        tokenId: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
        transferableByRecipient: true,
        transferableBySender: false,
      },
      { sender: anchorWallet as SignerWalletAdapter }
    );

    return { ixs, metadataId, txId };
  }

  return { createStream };
}

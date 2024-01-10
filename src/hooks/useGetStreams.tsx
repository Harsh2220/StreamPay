import { useWallet } from "@solana/wallet-adapter-react";
import {
  StreamDirection,
  StreamType,
} from "@streamflow/stream/dist/common/types";
import useSolanaStreamClient from "./useSolanaStreamClient";

export default function useGetStreams() {
  const { client } = useSolanaStreamClient();
  const { publicKey } = useWallet();

  async function getAllStreams(type: StreamType, direction: StreamDirection) {
    if (!publicKey) return;

    const streams = await client.get({
      address: publicKey?.toString(),
      type: type,
      direction: direction,
    });

    return streams;
  }

  return { getAllStreams };
}

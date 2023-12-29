import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  const { setVisible } = useWalletModal();
  const { connected, disconnect, publicKey, wallets } = useWallet();
  const { connection } = useConnection();

  async function Connect() {
    connected ? disconnect() : setVisible(true);
  }

  return <Navbar />;
}

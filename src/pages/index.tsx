import CompanyCard from "@/components/CompanyCard";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import RegisterCompany from "@/components/RegisterCompany";
import RegisterUser from "@/components/RegisterUser";
import UserCard from "@/components/UserCard";
import { Button } from "@/components/ui/button";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { ICluster } from "@streamflow/stream/dist/common/types";
import { SolanaStreamClient } from "@streamflow/stream/dist/solana";

export default function Home() {
  const { publicKey, wallet, signTransaction, signAllTransactions } =
    useWallet();
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();

  async function getdata() {
    if (!publicKey) return;
    console.log("here");
    console.log(publicKey.toString());

    const bal = await connection.getBalance(publicKey);

    console.log("bal", bal / LAMPORTS_PER_SOL);

    const balances = await connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: TOKEN_PROGRAM_ID,
    });

    balances.value.forEach((account, i) => {
      //Parse the account data
      const parsedAccountInfo: any = account.account.data;
      const mintAddress: string = parsedAccountInfo["parsed"]["info"]["mint"];
      const tokenBalance: number =
        parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
      //Log results
      // console.log(`Token Account No. ${i + 1}: ${account.pubkey.toString()}`);
      // console.log(`--Token Mint: ${mintAddress}`);
      // console.log(`--Token Balance: ${tokenBalance}`);
    });

    console.log(balances);
  }

  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}

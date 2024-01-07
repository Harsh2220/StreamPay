import Navbar from "@/components/Navbar";
import RegisterCompany from "@/components/RegisterCompany";
import RegisterUser from "@/components/RegisterUser";
import { Button } from "@/components/ui/button";
import { BN } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { StreamflowSolana, Types, getBN } from "@streamflow/stream";
import { GenericStreamClient } from "@streamflow/stream";

export default function Home() {
  const { publicKey, wallet, signTransaction, signAllTransactions } =
    useWallet();
  const { connection } = useConnection();
  const da = useAnchorWallet();

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

  async function createStream() {
    const client = new GenericStreamClient<Types.IChain.Solana>({
      chain: Types.IChain.Solana, // Blockchain
      clusterUrl: "https://api.devnet.solana.com", // RPC cluster URL
      cluster: Types.ICluster.Devnet, // (optional) (default: Mainnet)
      // ...rest chain specific params e.g. commitment for Solana
    });
    const createStreamParams: Types.ICreateStreamData = {
      recipient: "4ih00075bKjVg000000tLdk4w42NyG3Mv0000dc0M00", // Recipient address.
      tokenId: "DNw99999M7e24g99999999WJirKeZ5fQc6KY999999gK", // Token mint address.
      start: 1643363040, // Timestamp (in seconds) when the stream/token vesting starts.
      amount: getBN(1, 9), // depositing 100 tokens with 9 decimals mint.
      period: 1, // Time step (period) in seconds per which the unlocking occurs.
      cliff: 1643363160, // Vesting contract "cliff" timestamp in seconds.
      cliffAmount: new BN(10), // Amount unlocked at the "cliff" timestamp.
      amountPerPeriod: getBN(5, 9), // Release rate: how many tokens are unlocked per each period.
      name: "Transfer to Jane Doe.", // The stream name or subject.
      canTopup: false, // setting to FALSE will effectively create a vesting contract.
      cancelableBySender: true, // Whether or not sender can cancel the stream.
      cancelableByRecipient: false, // Whether or not recipient can cancel the stream.
      transferableBySender: true, // Whether or not sender can transfer the stream.
      transferableByRecipient: false, // Whether or not recipient can transfer the stream.
      automaticWithdrawal: true, // Whether or not a 3rd party (e.g. cron job, "cranker") can initiate a token withdraw/transfer.
      withdrawalFrequency: 10, // Relevant when automatic withdrawal is enabled. If greater than 0 our withdrawor will take care of withdrawals. If equal to 0 our withdrawor will skip, but everyone else can initiate withdrawals.
    };

    console.log(client.nativeStreamClient.getProgramId());

    const solanaParams = {
      // SignerWalletAdapter or Keypair of Sender account
    };

    try {
      const { ixs, txId, metadataId } = await client.create(
        createStreamParams,
        {
          sender: da,
        }
      ); // second argument differ depending on a chain
      console.log(ixs, txId, metadataId);
    } catch (error) {
      // handle exception
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <Button onClick={createStream}>Create</Button>
    </>
  );
}

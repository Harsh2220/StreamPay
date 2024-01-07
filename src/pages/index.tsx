import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { BN } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import { Types, getBN } from "@streamflow/stream";
import { GenericStreamClient } from "@streamflow/stream";
import { ICluster } from "@streamflow/stream/dist/common/types";
import { SolanaStreamClient } from "@streamflow/stream/dist/solana";

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

  const futuredate = () => {
    const currentTimestamp = Date.now() / 1000; // Convert to seconds

    const tenDaysInSeconds = 10 * 24 * 60 * 60; // 10 days in seconds
    const futureTimestamp = currentTimestamp + tenDaysInSeconds;

    const futureDate = new Date(futureTimestamp * 1000);

    return Number(futureDate) / 1000;
  };
  async function createStream() {
    const client = new GenericStreamClient<Types.IChain.Solana>({
      chain: Types.IChain.Solana, // Blockchain
      clusterUrl: "https://api.devnet.solana.com", // RPC cluster URL
      cluster: Types.ICluster.Devnet, // (optional) (default: Mainnet)
      // ...rest chain specific params e.g. commitment for Solana
    });
    const c = new SolanaStreamClient(
      clusterApiUrl("devnet"),
      ICluster.Devnet,
      "max"
    );

    c.create(
      {
        amount: getBN(1, 6),
        amountPerPeriod: getBN(0.01, 6),
        cancelableByRecipient: true,
        cancelableBySender: true,
        canTopup: false,
        cliff: futuredate(),
        cliffAmount: new BN(1),
        name: "HELLO",
        period: 1,
        recipient: "CZA6Cqz59PioMHfZFjouL54DM4U7yxBDphaVjJUAzLXL",
        start: Number(Date.now() / 1000),
        tokenId: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
        transferableByRecipient: true,
        transferableBySender: false,
      },
      { sender: da, isNative: false }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    // const createStreamParams: Types.ICreateStreamData = {
    //   recipient: new PublicKey("67UH3NriChXXKiogpjzgnXi1vPW1h52Jsbod4N4azmJL").toString(), // Recipient address.
    //   tokenId: "ERv8UF6ikad4koC5bLTMbW5obUggciKD4SwvFUU58bN3", // Token mint address.
    //   start: 1643363040, // Timestamp (in seconds) when the stream/token vesting starts.
    //   amount: getBN(0.05, 6), // depositing 100 tokens with 9 decimals mint.
    //   period: 1, // Time step (period) in seconds per which the unlocking occurs.
    //   cliff: 1643363160, // Vesting contract "cliff" timestamp in seconds.
    //   cliffAmount: new BN(10), // Amount unlocked at the "cliff" timestamp.
    //   amountPerPeriod: getBN(0.01, 6), // Release rate: how many tokens are unlocked per each period.
    //   name: "Transfer to Jane Doe.", // The stream name or subject.
    //   canTopup: false, // setting to FALSE will effectively create a vesting contract.
    //   cancelableBySender: true, // Whether or not sender can cancel the stream.
    //   cancelableByRecipient: false, // Whether or not recipient can cancel the stream.
    //   transferableBySender: true, // Whether or not sender can transfer the stream.
    //   transferableByRecipient: false, // Whether or not recipient can transfer the stream.
    //   automaticWithdrawal: true, // Whether or not a 3rd party (e.g. cron job, "cranker") can initiate a token withdraw/transfer.
    //   withdrawalFrequency: 10, // Relevant when automatic withdrawal is enabled. If greater than 0 our withdrawor will take care of withdrawals. If equal to 0 our withdrawor will skip, but everyone else can initiate withdrawals.
    // };

    //console.log(client.nativeStreamClient.getProgramId());
    // try {
    //   const { ixs, txId, metadataId } = await client.create(
    //     createStreamParams,
    //     {
    //       sender: da,
    //     }
    //   ); // second argument differ depending on a chain
    //   console.log(ixs, txId, metadataId);
    // } catch (error) {
    //   // handle exception
    //   console.log(error);
    // }
  }

  return (
    <>
      <Navbar />
      <Button onClick={createStream}>Create</Button>
    </>
  );
}

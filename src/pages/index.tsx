import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Program, BN, web3, AnchorProvider, Idl } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

import idl from "../idl.json";

const opts = {
  preflightCommitment: "recent",
};

const { SystemProgram } = web3;
const programID = new PublicKey("HJQBiUzcGgR7eZnQpYwpxgarH9yy6vDHtZW8gCExyPzU");
export default function Home() {
  const { setVisible } = useWalletModal();
  const { connected, disconnect, publicKey, wallets, wallet } = useWallet();

  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  async function Connect() {
    connected ? getdata() : setVisible(true);
  }

  async function callProgram() {
    try {
      if (!anchorWallet) return;
      console.log("Progarm", programID);

      const provider = new AnchorProvider(
        connection,
        anchorWallet,
        AnchorProvider.defaultOptions()
      );

      const program = new Program(idl as Idl, programID, provider);

      console.log("I am program", program);

      const data = PublicKey.findProgramAddressSync(
        [
          Buffer.from("id"),
          Buffer.from(anchorWallet?.publicKey.toString().slice(0, 6)),
        ],
        program.programId
      );
      console.log("findPDA", data.toString());

      // const derivePubkeyFromID=PublicKey.findProgramAddressSync(
      //   [Buffer.from("id"), Buffer.from("123490")],
      //   program.programId
      // )

      // console.log(data[0].toString(), "data pda");

      const account = await program.account.user.all();

      console.log(account);

      account.forEach((element) => {
        console.log(element, "element");
        console.log(element.publicKey.toString());
      });
    } catch (error) {
      console.log(error);
    }
  }

  const sendTransaction = async () => {
    try {
      if (!anchorWallet) return;
      const provider = new AnchorProvider(
        connection,
        anchorWallet,
        AnchorProvider.defaultOptions()
      );
      const program = new Program(idl as Idl, programID, provider);
      console.log("Program", program);
      const pda = PublicKey.findProgramAddressSync(
        [
          Buffer.from("id"),
          Buffer.from(anchorWallet?.publicKey.toString().slice(0, 6)),
        ],
        program.programId
      );
      console.log("pda from accc", pda[0]);
      const txHash = await program.methods
        .initializeCompany(new BN(69), "ar://ququququq")
        .accounts({
          company: pda[0],
          signer: anchorWallet?.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc()
        .then((res) => {
          console.log(res, "rpc");
        })
        .catch((err) => {
          console.log(err, "rpc");
        });
      console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);
      console.log("txHash", txHash);
      // Confirm transaction
      // await connection.confirmTransaction(txHash, 'confirmed')
    } catch (error) {
      console.log(error);
    }
  };

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

  async function createUser() {
    try {
      if (!anchorWallet) return;
      const provider = new AnchorProvider(
        connection,
        anchorWallet,
        AnchorProvider.defaultOptions()
      );
      const program = new Program(idl as Idl, programID, provider);
      console.log("Program", program);
      const pda = PublicKey.findProgramAddressSync(
        [
          Buffer.from("id"),
          Buffer.from(anchorWallet?.publicKey.toString().slice(0, 6)),
        ],
        program.programId
      );
      const txHash = await program.methods
        .initializeUser(
          anchorWallet?.publicKey.toString().slice(0, 6),
          "ar://ququququq",
          false
        )
        .accounts({
          user: pda[0],
          signer: anchorWallet?.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc()
        .then((res) => {
          console.log(res, "rpc");
        })
        .catch((err) => {
          console.log(err, "rpc");
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <Button onClick={createUser} style={{ alignSelf: "center" }}>
        send
      </Button>
      <Button onClick={callProgram} style={{ alignSelf: "center" }}>
        CALALLlALLALAL
      </Button>
    </>
  );
}

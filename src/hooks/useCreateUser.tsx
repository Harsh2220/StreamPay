import { programID } from "@/constants";
import getPDA from "@/utils/getPDA";
import { AnchorProvider, Idl, Program } from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { SystemProgram } from "@solana/web3.js";
import idl from "../data/idl.json";

export default function useCreateUser() {
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();

  async function createUser(metadataURI: string) {
    if (!metadataURI) throw new Error("Metadata URI is required");
    try {
      if (!anchorWallet) return;
      const provider = new AnchorProvider(
        connection,
        anchorWallet,
        AnchorProvider.defaultOptions()
      );
      const program = new Program(idl as Idl, programID, provider);
      const pda = getPDA(anchorWallet?.publicKey?.toBuffer(), false);
      const txHash = await program.methods
        .initializeUser("ar://kjsndfnsdfsnjkd")
        .accounts({
          user: pda,
          signer: anchorWallet?.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      console.log("Tx Hash", txHash);
      return txHash;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
        console.log(error);
      }
    }
  }

  return { createUser };
}

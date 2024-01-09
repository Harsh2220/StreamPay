import { programID } from "@/constants";
import getPDA from "@/utils/getPDA";
import { AnchorProvider, Idl, Program } from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { SystemProgram } from "@solana/web3.js";
import idl from "../data/idl.json";

function useDeleteAccount() {
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();

  async function deleteUser() {
    try {
      if (!anchorWallet) return;
      const provider = new AnchorProvider(
        connection,
        anchorWallet,
        AnchorProvider.defaultOptions()
      );
      const program = new Program(idl as Idl, programID, provider);
      const pda = getPDA(anchorWallet?.publicKey?.toBuffer(), false);
      console.log("User pda", pda);
      const txHash = await program.methods
        .deleteUserAccount()
        .accounts({
          signer: anchorWallet?.publicKey,
          userAccount: pda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      console.log("Tx Hash", txHash);
      return txHash;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCompany() {
    try {
      if (!anchorWallet) return;
      const provider = new AnchorProvider(
        connection,
        anchorWallet,
        AnchorProvider.defaultOptions()
      );
      const program = new Program(idl as Idl, programID, provider);
      const pda = getPDA(anchorWallet?.publicKey?.toBuffer(), true);
      console.log("Company pda", pda);
      const txHash = await program.methods
        .deleteCompnayAccount()
        .accounts({
          companyAccount: pda,
          signer: anchorWallet?.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      console.log("Tx Hash", txHash);
      return txHash;
    } catch (error) {
      console.log(error);
    }
  }
  return { deleteCompany, deleteUser };
}

export default useDeleteAccount;

import { AnchorProvider, Idl, Program } from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import React from "react";
import idl from "../data/idl.json";
import { programID } from "@/constants";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import getPDA from "@/utils/getPDA";

export default function useEmployee() {
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();

  async function addEmployee() {
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
        .addCompanyEmployee(
          new PublicKey("CZA6Cqz59PioMHfZFjouL54DM4U7yxBDphaVjJUAzLXL")
        )
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

  async function removeEmployee() {
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
        .removeCompanyEmployee(
          new PublicKey("CZA6Cqz59PioMHfZFjouL54DM4U7yxBDphaVjJUAzLXL")
        )
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
  return { addEmployee, removeEmployee };
}

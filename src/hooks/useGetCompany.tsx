import { programID } from "@/constants";
import getPDA from "@/utils/getPDA";
import { AnchorProvider, Idl, Program } from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import idl from "../data/idl.json";

export default function useGetCompany() {
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();

  async function getCompany() {
    try {
      if (!anchorWallet) return;
      const provider = new AnchorProvider(
        connection,
        anchorWallet,
        AnchorProvider.defaultOptions()
      );
      const program = new Program(idl as Idl, programID, provider);
      const pda = getPDA(anchorWallet?.publicKey?.toBuffer(), true);
      const account = await program.account.company.fetch(pda);
      console.log("Company Account", account);
      if (account) {
        console.log("Company Account", account.allEmployees[0].toString());
      }

      return account;
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllCompanies() {
    try {
      if (!anchorWallet) return;
      const provider = new AnchorProvider(
        connection,
        anchorWallet,
        AnchorProvider.defaultOptions()
      );
      const program = new Program(idl as Idl, programID, provider);
      const accounts = await program.account.company.all();
      console.log(accounts, "accoinr");
      return accounts;
    } catch (error) {
      console.log(error);
    }
  }

  return { getCompany, getAllCompanies };
}

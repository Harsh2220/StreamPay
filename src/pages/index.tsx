import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import useEmployee from "@/hooks/useAddEmployee";
import useCreateCompany from "@/hooks/useCreateCompany";
import useCreateUser from "@/hooks/useCreateUser";
import useDeleteAccount from "@/hooks/useDeleteAccount";
import useGetCompany from "@/hooks/useGetCompany";
import useGetUser from "@/hooks/useGetUser";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function Home() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const { createUser } = useCreateUser();
  const { createCompany } = useCreateCompany();
  const { getCompany } = useGetCompany();
  const { addEmployee, removeEmployee } = useEmployee();
  const { deleteCompany, deleteUser } = useDeleteAccount();

  const { getUser } = useGetUser();

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
  }

  return (
    <>
      <Button onClick={createUser}>Create USER</Button>
      <Button onClick={getUser}>Get User</Button>
      <br />
      <br />
      <br />
      <Button onClick={createCompany}>Create company</Button>
      <Button onClick={getCompany}>Get Company</Button>
      <br />
      <br />
      <br />
      <Button onClick={addEmployee}>Add an Employee</Button>
      <Button onClick={removeEmployee}>Remove employee</Button>
      <br />
      <br />
      <br />
      <Button onClick={deleteCompany}>Delete Company</Button>
      <Button onClick={deleteUser}>Delete User</Button>


      <Navbar />
      <Hero />
    </>
  );
}

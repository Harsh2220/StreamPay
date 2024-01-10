import { programID } from "@/constants";
import { PublicKey } from "@solana/web3.js";

function getPDA(walletAddress: Buffer, isCompany: boolean) {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from(isCompany ? "c_id" : "u_id"), walletAddress],
    programID
  );
  return pda;
}

export default getPDA;

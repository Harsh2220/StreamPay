import { COMPANY_PDA_BASE_SEED, programID } from "@/constants";
import { PublicKey } from "@solana/web3.js";

function getCompanyPDA(userWalletAddress: string) {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from(COMPANY_PDA_BASE_SEED), Buffer.from(userWalletAddress.slice(0, 16))],
    programID
  );
  return pda;
}
export default getCompanyPDA;

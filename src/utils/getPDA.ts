import { programID } from "@/constants";
import { PublicKey } from "@solana/web3.js";

function getPDA(walletAddress: Buffer) {
    const [pda] = PublicKey.findProgramAddressSync(
        [Buffer.from("id"), walletAddress],
        programID
    );
    return pda;
}

export default getPDA;

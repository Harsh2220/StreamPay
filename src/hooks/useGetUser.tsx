import { programID } from '@/constants';
import getPDA from '@/utils/getPDA';
import { AnchorProvider, Idl, Program } from '@project-serum/anchor';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import idl from "../data/idl.json";

export default function useGetUser() {
    const anchorWallet = useAnchorWallet()
    const { connection } = useConnection()

    async function getUser() {
        try {
            if (!anchorWallet) return;
            const provider = new AnchorProvider(
                connection,
                anchorWallet,
                AnchorProvider.defaultOptions()
            );
            const program = new Program(idl as Idl, programID, provider);
            const pda = getPDA(anchorWallet?.publicKey?.toBuffer())
            const account = await program.account.user.fetch(pda);
            return account;
        } catch (error) {
            console.log(error);
        }
    }

    return { getUser }
}

import { ICluster } from '@streamflow/stream/dist/common/types';
import { SolanaStreamClient } from '@streamflow/stream/dist/solana';

export default function useSolanaStreamClient() {
    const client = new SolanaStreamClient(
        "https://api.devnet.solana.com",
        ICluster.Devnet
    );

    return { client }
}

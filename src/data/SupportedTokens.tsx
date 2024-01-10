import { StreamToken } from "@/store/NewStream";
import USDC from "@/icons/USDC";
import USDT from "@/icons/USDT";
import WSOL from "@/icons/WSOL";
type Token = {
  symbol: string;
  icon: React.ReactNode;
} & StreamToken;
const Supported_Tokens: Token[] = [
  {
    symbol: "USDC",
    icon: <USDC height={24} width={24} />,
    decimals: 6,
    tokenAddress: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    tokenName: "USDC",
  },
  {
    symbol: "USDT",
    icon: <USDT height={24} width={24} />,
    decimals: 6,
    tokenAddress: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    tokenName: "USDT",
  },
  {
    symbol: "wSOL",
    icon: <WSOL height={24} width={24} />,
    decimals: 9,
    tokenAddress: "So11111111111111111111111111111111111111112",
    tokenName: "Wrapped SOL",
  },
];

export default Supported_Tokens;

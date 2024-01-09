import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiPencil } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/router";

export default function ConnectButton() {
  const { connected, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const router = useRouter();

  return (
    <>
      {connected ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-full gap-2">
            {publicKey?.toBase58().slice(0, 4)}...
            {publicKey?.toBase58().slice(-4)}
            <IoIosArrowDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52 p-2">
            <DropdownMenuItem className="cursor-pointer p-3 font-medium gap-2" onClick={()=>router.push("/registercompany")}>
              <HiPencil />
              Register company
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer p-3 font-medium gap-2">
              <FaUser />
              Your profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer p-3 font-medium gap-2"
              onClick={disconnect}
            >
              <FiLogOut />
              DIsconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          className="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-full"
          onClick={() => {
            setVisible(true);
          }}
        >
          Connect wallet
        </Button>
      )}
    </>
  );
}

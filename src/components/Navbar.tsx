import { APP_NAME } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import ConnectButton from "./ConnectButton";
import Container from "./ui/container";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { connected, disconnect } = useWallet();
  const router = useRouter();

  async function handleDisconnect() {
    await disconnect();
    setIsOpened(false);
  }

  return (
    <Container>
      <div className="flex items-center justify-between py-6 rounded-full">
        <div
          className="w-auto cursor-pointer text-lg font-semibold"
          onClick={() => router.push("/")}
        >
          {APP_NAME}
        </div>
        <div className="w-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-auto hidden lg:block">
              <ul className="flex items-center justify-center gap-4">
                <li
                  className="inline-block text font-bold text-white hover:text-gray-100 cursor-pointer"
                  onClick={() => router.push("/companies")}
                >
                  Companies
                </li>
                <li
                  className="inline-block text font-bold text-white hover:text-gray-100 cursor-pointer"
                  onClick={() => router.push("/users")}
                >
                  Users
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-auto">
          <div className="flex flex-wrap items-center">
            <div
              className={`w-auto ${connected ? "hidden" : "block"} lg:block`}
            >
              <ConnectButton />
            </div>
            <div
              className={`w-auto ${!connected ? "hidden" : "block"} lg:hidden`}
              onClick={() => setIsOpened(true)}
            >
              <HiOutlineMenuAlt4 className="w-6 h-6 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div
        className={` ${
          isOpened ? "block" : "hidden"
        } navbar-menu fixed top-0 left-0 bottom-0 w-full sm:max-w-xs z-50`}
      >
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-80"></div>
        <nav className="relative z-10 px-9 pt-8 bg-gray-800 h-full overflow-y-auto">
          <div className="flex flex-wrap justify-between h-full">
            <div className="w-full">
              <div className="flex items-center justify-between -m-2">
                <div className="w-auto p-2">
                  <a className="inline-block" href="#">
                    <img
                      src="https://shuffle.dev/zanrly-assets/logos/zanrly-logo-white.svg"
                      alt=""
                    />
                  </a>
                </div>
                <div className="w-auto p-2" onClick={() => setIsOpened(false)}>
                  <MdOutlineClose className="w-6 h-6 cursor-pointer" />
                </div>
              </div>
            </div>
            <div>
              <ul className="flex flex-col justify-center py-8 w-full gap-8">
                <li
                  className="text-xl font-bold text-white hover:text-gray-100 cursor-pointer"
                  onClick={() => router.push("/companies")}
                >
                  Companies
                </li>
                <li
                  className="text-xl font-bold text-white hover:text-gray-100 cursor-pointer"
                  onClick={() => router.push("/users")}
                >
                  Users
                </li>
                <li
                  className="text-xl font-bold text-white hover:text-gray-100 cursor-pointer"
                  onClick={() => router.push("/profile")}
                >
                  Profile
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-end w-full pb-8">
              <Button
                className="w-full px-4 py-6 text-center text-white font-bold bg-blue-600 hover:bg-blue-700 rounded-full"
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </Container>
  );
}

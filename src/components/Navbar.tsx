import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import React, { useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  return (
    <section className="py-6 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between px-6 py-3.5 bg-gray-800 rounded-full">
          <div className="w-auto">
            <div className="flex flex-wrap items-center">
              <div className="w-auto">
                <a href="#">
                  <img
                    src="https://shuffle.dev/zanrly-assets/logos/zanrly-logo-white.svg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="w-auto">
            <div className="flex flex-wrap items-center">
              <div className="w-auto hidden lg:block">
                <ul className="flex items-center justify-center">
                  <li className="mr-9">
                    <a
                      className="inline-block text-sm font-bold text-gray-200 hover:text-gray-300"
                      href="#"
                    >
                      Features
                    </a>
                  </li>
                  <li className="mr-9">
                    <a
                      className="inline-block text-sm font-bold text-gray-200 hover:text-gray-300"
                      href="#"
                    >
                      Solutions
                    </a>
                  </li>
                  <li className="mr-9">
                    <a
                      className="inline-block text-sm font-bold text-gray-200 hover:text-gray-300"
                      href="#"
                    >
                      Resources
                    </a>
                  </li>
                  <li>
                    <a
                      className="inline-block text-sm font-bold text-gray-200 hover:text-gray-300"
                      href="#"
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-auto">
            <div className="flex flex-wrap items-center">
              <div className="w-auto hidden lg:block">
                <div className="w-full md:w-auto p-2">
                  <Button
                    className="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-full"
                    onClick={() => {
                      setVisible(true);
                    }}
                  >
                    Connect wallet
                  </Button>
                </div>
              </div>
              <div
                className="w-auto lg:hidden"
                onClick={() => setIsOpened(true)}
              >
                <a className="inline-block" href="#">
                  <svg
                    className="navbar-burger text-blue-500"
                    width="45"
                    height="45"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="56"
                      height="56"
                      rx="28"
                      fill="currentColor"
                    ></rect>
                    <path
                      d="M37 32H19M37 24H19"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </a>
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
                  <div
                    className="w-auto p-2"
                    onClick={() => setIsOpened(false)}
                  >
                    <a className="inline-block navbar-burger" href="#">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 18L18 6M6 6L18 18"
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center py-8 w-full">
                <ul>
                  <li className="mb-9">
                    <a
                      className="inline-block text-sm font-bold text-gray-200 hover:text-gray-300"
                      href="#"
                    >
                      Features
                    </a>
                  </li>
                  <li className="mb-9">
                    <a
                      className="inline-block text-sm font-bold text-gray-200 hover:text-gray-300"
                      href="#"
                    >
                      Solutions
                    </a>
                  </li>
                  <li className="mb-9">
                    <a
                      className="inline-block text-sm font-bold text-gray-200 hover:text-gray-300"
                      href="#"
                    >
                      Resources
                    </a>
                  </li>
                  <li>
                    <a
                      className="inline-block text-sm font-bold text-gray-200 hover:text-gray-300"
                      href="#"
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-end w-full pb-8">
                <a
                  className="block w-full p-4 text-sm text-center text-white font-bold bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 rounded-full"
                  href="#"
                >
                  Connect wallet
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}

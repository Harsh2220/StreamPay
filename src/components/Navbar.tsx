import { useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import ConnectButton from "./ConnectButton";
import Container from "./ui/container";
import { APP_NAME } from "@/constants";

export default function Navbar() {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <Container>
      <section className="py-6 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between px-6 py-3.5 bg-gray-800 rounded-full">
            <div className="w-auto">
              <div className="flex flex-wrap items-center">
                <div className="w-auto">
                  <a href="#">
                    {APP_NAME}
                  </a>
                </div>
              </div>
            </div>
            <div className="w-auto">
              <div className="flex flex-wrap items-center">
                <div className="w-auto hidden lg:block">
                  <ul className="flex items-center justify-center gap-4">
                    <li>
                      <a
                        className="inline-block text font-bold text-white hover:text-gray-100"
                        href="#"
                      >
                        Companies
                      </a>
                    </li>
                    <li>
                      <a
                        className="inline-block text font-bold text-white hover:text-gray-100"
                        href="#"
                      >
                        Users
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-auto">
              <div className="flex flex-wrap items-center">
                <div className="w-auto hidden lg:block">
                  <ConnectButton />
                </div>
                <div
                  className="w-auto lg:hidden"
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
                    <div
                      className="w-auto p-2"
                      onClick={() => setIsOpened(false)}
                    >
                      <MdOutlineClose className="w-6 h-6 cursor-pointer" />
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
                        Companies
                      </a>
                    </li>
                    <li>
                      <a
                        className="inline-block text-sm font-bold text-gray-200 hover:text-gray-300"
                        href="#"
                      >
                        Users
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col justify-end w-full pb-8">
                  <ConnectButton />
                </div>
              </div>
            </nav>
          </div>
        </div>
      </section>
    </Container>
  );
}

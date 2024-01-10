import React from "react";
import Container from "./ui/container";
import { APP_DESCRIPTION, APP_TAG_LINE } from "@/constants";

export default function Hero() {
  return (
    <Container>
      <div className="h-[calc(100vh-88px)] flex items-center justify-center">
        <div className="lg:w-2/3 text-center mx-auto">
          <h1 className="text-gray-900 dark:text-white font-bold text-4xl md:text-6xl xl:text-7xl">
            {APP_TAG_LINE}{" "}
          </h1>
          <p className="mt-8 text-gray-700 dark:text-gray-300">
            {APP_DESCRIPTION}
          </p>
          <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
            <a
              href="#"
              className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-blue-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span className="relative text-base font-semibold text-white">
                Get started
              </span>
            </a>
            <a
              href="#"
              className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
            >
              <span className="relative text-base font-semibold text-primary dark:text-white">
                Learn more
              </span>
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}

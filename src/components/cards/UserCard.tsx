import { UsersData } from "@/types";
import React from "react";

export default function UserCard({ user }: { user: UsersData }) {
  return (
    <div className="w-full md:w-1/4">
      <div className="relative max-w-max mx-auto h-full overflow-hidden rounded-3xl aspect-square border border-gray-900">
        <img
          className="object-cover transform hover:scale-105 transition ease-in-out duration-1000"
          src="https://shuffle.dev/flaro-assets/images/team/bg.png"
          alt=""
        />
        <div className="bg-gradient-to-t from-black to-transparent absolute bottom-0 left-0 w-full p-6 pt-20">
          <h3 className="text-xl font-semibold leading-snug">
            Leslie Alexander
          </h3>
          <p className="text-gray-400 font-medium line-clamp-1">
            Co-Founder, CEO
          </p>
        </div>
      </div>
    </div>
  );
}

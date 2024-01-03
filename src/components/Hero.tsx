import React from "react";

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-132px)] flex justify-center items-center">
      <div className="mb-24 text-center md:max-w-4xl mx-auto">
        <h1 className="mb-8 text-7xl lg:text-8xl text-white tracking-tighter">
          Making credit history with Nightsable
        </h1>
        <p className="mb-10 text-lg text-white md:max-w-sm mx-auto">
          Nightsable is a strategic branding agency focused on brand creation,
          rebrands, and brand
        </p>
        <div className="flex flex-wrap justify-center -m-2">
          <div className="w-auto p-2">
            <a
              className="inline-block px-8 py-4 tracking-tighter border-2 border-green-400 bg-green-400 hover:bg-green-500 text-black focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 rounded-full transition duration-300"
              href="#"
            >
              Start now for free
            </a>
          </div>
          <div className="w-auto p-2">
            <a
              className="inline-block px-8 py-4 text-white hover:text-black tracking-tighter hover:bg-green-400 border-2 border-white focus:border-green-400 focus:border-opacity-40 hover:border-green-400 focus:ring-4 focus:ring-green-400 focus:ring-opacity-40 rounded-full transition duration-300"
              href="#"
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


// https://www.socketscan.io/tx/0x1fab373cfd63f3a282a5a9d386e8c8cba0c9a03b03016b8d5dfb1662269379bf
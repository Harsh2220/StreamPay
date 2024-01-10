import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CompanyData, CompanyMetadata } from "@/types";
import getMetadata from "@/utils/getMetadata";

export default function CompanyCard({ company }: { company: CompanyData }) {
  const [data, setData] = useState<CompanyMetadata | undefined>();

  async function handleMetadata() {
    if (company.account.metadataUri.length === 0) return;
    const metadata = await getMetadata(company.account.metadataUri);
    if (metadata) {
      setData(metadata);
    }
  }

  useEffect(() => {
    handleMetadata();
  }, []);

  return (
    <section className="relative p-6 border border-gray-800 rounded-xl w-96">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20"
      >
        <div className="blur-[106px] h-32 bg-gradient-to-br to-purple-400 from-blue-700"></div>
        <div className="blur-[106px] h-24 bg-gradient-to-r from-cyan-400 to-indigo-600"></div>
      </div>
      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-purple-500 rounded-lg">
        <img
          src={`https://ipfs.io/ipfs/${data?.logo?.split("//")[1]}`}
          alt=""
        />
      </div>
      <h4 className="text-xl text-white font-bold mb-3">{data?.name}</h4>
      <p className="text-gray-300 mb-5 line-clamp-3">{data?.description}</p>
      <div className="flex flex-wrap items-center mb-6">
        <div className="flex w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src="https://shuffle.dev/trizzle-assets/images/avatar-women-circle-border.png"
            alt=""
          />
          <img
            className="w-8 h-8 -ml-2 rounded-full object-cover"
            src="https://shuffle.dev/trizzle-assets/images/avatar-men-circle-border.png"
            alt=""
          />
          <img
            className="w-8 h-8 -ml-2 rounded-full object-cover"
            src="https://shuffle.dev/trizzle-assets/images/avatar-men-2-circle-border.png"
            alt=""
          />
          <div className="flex items-center justify-center w-8 h-8 -ml-2 bg-gray-500 rounded-full">
            <div className="flex items-center justify-center w-7 h-7 bg-gray-400 text-xs text-gray-300 font-semibold rounded-full">
              +2
            </div>
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <span className="text-xs text-gray-300">Five friends work here</span>
        </div>
      </div>
      <Button
        className="w-full text-center text-white font-bold text-sm leading-6 py-6 bg-blue-600 hover:bg-blue-600 rounded-xl cursor-pointer"
        size="lg"
      >
        Read more
      </Button>
    </section>
  );
}

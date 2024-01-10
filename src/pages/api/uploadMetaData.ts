import { NextApiRequest, NextApiResponse } from "next";
import Irys from "@irys/sdk";

const NODE_URL = "https://node2.irys.xyz";
const UPLOAD_TAGS = [
  { name: "APP_ID", value: "StreamPay-Sol" },
  { name: "Content-Type", value: "application/json" },
];

export default async function uploadMetadata(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }
  try {
    const irys = getIrys();
    const { metadata } = req.body;
    const receipt = await irys.upload(JSON.stringify(metadata), {
      tags: UPLOAD_TAGS,
    });
    res.status(200).json({
      id: receipt.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const getIrys = () => {
  const token = "matic";
  const irys = new Irys({
    url: NODE_URL,
    token, // Token used for payment
    key: process.env.IRYS_WALLET_PRIVATE_KEY, // Private key
  });
  return irys;
};

//Sameple Usage

// const headersList = {
//     "Content-Type": "application/json"
//    }

//    const bodyContent = JSON.stringify({
//      "metadata":{
//        "test":"test"
//      }
//    });

//    const response = await fetch("api/uploadMetaData", {
//      method: "POST",
//      body: bodyContent,
//      headers: headersList
//    });

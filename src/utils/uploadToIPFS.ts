import { IPFS_UPLOAD_URI } from "@/constants";

export const TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY;
const uploadImageToIPFS = async (
  imageBlob: Blob | undefined
): Promise<string> => {
  try {
    const headersList = {
      Authorization: `Bearer ${TOKEN}`,
    };
    const filehash = await fetch(IPFS_UPLOAD_URI, {
      method: "POST",
      headers: headersList,
      body: imageBlob,
    });
    const data = await filehash.json();
    return data.value.cid;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
export default uploadImageToIPFS;

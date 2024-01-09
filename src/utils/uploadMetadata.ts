import { ARWEAVE_PREFIX } from "@/constants";
import { CompanyMetadata } from "@/types";

async function uploadMetadata(metadata: CompanyMetadata) {
  try {
    const headersList = {
      "Content-Type": "application/json",
    };

    const bodyContent = JSON.stringify({
      metadata: metadata,
    });

    const response = await fetch("api/uploadMetaData", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    const json = await response.json();
    return ARWEAVE_PREFIX + json.id;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
}
export default uploadMetadata;

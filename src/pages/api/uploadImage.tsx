import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs/promises";
import { IPFS_UPLOAD_URI } from "@/constants";
export const config = {
  api: {
    bodyParser: false,
  },
};
export const TOKEN = process.env.NFT_STORAGE_KEY;

export default async function uploadImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  const form = formidable({});

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
    if (!files.image) return;
    const image = files.image[0];
    const imageBuffer = await fs.readFile(image.filepath);
    const imageBlob = new Blob([imageBuffer], {
      type: image.mimetype ?? "image/jpeg",
    });
    // Upload the image to IPFS
    const headersList = {
      Authorization: `Bearer ${TOKEN}`,
    };
    const filehash = await fetch(IPFS_UPLOAD_URI, {
      method: "POST",
      headers: headersList,
      body: imageBlob,
    });
    const data = await filehash.json();

    res.status(200).json({ id: data.value.cid });
  });
}

//Sample Usage
// const formData = new FormData();
//       formData.append("image", localImage.selectedFile);

//       const response = await fetch("/api/uploadImage", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Image upload failed");
//       }

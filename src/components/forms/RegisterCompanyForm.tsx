import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BiSolidPencil } from "react-icons/bi";
import useCompanyStore from "@/store/company";
import uploadImageToIPFS from "@/utils/uploadToIPFS";
import { IPFS_PROTO_PREFIX } from "@/constants";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { CompanyMetadata, CompanyType } from "@/types";
import { v4 as uuidv4 } from "uuid";
import uploadMetadata from "@/utils/uploadMetadata";
import useCreateCompany from "@/hooks/useCreateCompany";

const companyTypes: CompanyType[] = ["Remote", "Hybrid", "In-Office"];

export default function RegisterCompanyForm() {
  const {
    name,
    description,
    location,
    setName,
    setLocation,
    setDescription,
    setCompanyType,
    localImage,
    setLocalImage,
    companyType,
    setWebsite,
    website,
  } = useCompanyStore();

  const { createCompany } = useCreateCompany();
  const [isCreating, setIsCreating] = useState(false);

  const uploadImage = async () => {
    try {
      if (!localImage.selectedFile) return;
      const cid = await uploadImageToIPFS(new Blob([localImage.selectedFile]));
      if (cid) {
        return cid;
      }
      return undefined;
    } catch (error) {}
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLocalImage({
        selectedFile: e.target.files[0],
        selectedFileUrl: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = async () => {
    setIsCreating(true);
    try {
      const cid = await uploadImage();
      const metadata: CompanyMetadata = {
        metadataId: uuidv4(),
        name,
        description,
        location,
        logo: cid ? IPFS_PROTO_PREFIX + cid : undefined,
        website: website,
        type: companyType ?? "Hybrid",
      };
      const metadataUri = await uploadMetadata(metadata);
      console.log(metadata);
      console.log(metadataUri);
      if (!metadataUri) throw new Error("Something went wrong");
      const txnHash = await createCompany(metadataUri);
      toast("Company registered !", {
        description:
          "Now, you can create list jobs and stream to your employees.",
        action: {
          label: "View On SolScan",
          onClick: () => {
            window.open(
              `https://solscan.io/tx/${txnHash}?cluster=devnet`,
              "_blank"
            );
          },
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("User rejected the request")) {
          toast("User rejected the request", {
            description: "Please accept the request to create your profile.",
          });
          return;
        }
        toast("Something went wrong!", {
          description:
            "Please try again :(, If the problem persists, please contact us.",
        });
      }
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="p-8 rounded-xl border border-gray-900 max-w-xl mx-auto flex flex-col gap-4">
      <div className="flex justify-center items-center mb-5">
        <div className="relative">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={
                localImage.selectedFileUrl ?? "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Label
            htmlFor="comapnay-logo"
            className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer"
          >
            <BiSolidPencil className="text-black" />
          </Label>
          <input
            type="file"
            id="comapnay-logo"
            hidden
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex items-center flex-wrap justify-between gap-4 md:gap-0">
        <div className="w-full md:w-1/2">
          <Label className="text-sm font-medium mb-2 block">Company Name</Label>
          <Input
            type="text"
            placeholder="Enter your company's name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-3">
          <Label className="text-sm font-medium mb-2 block">Type</Label>
          <Select
            onValueChange={(value: CompanyType) => {
              setCompanyType(value);
            }}
          >
            <SelectTrigger>
              <SelectValue
                placeholder="Select company type"
                className="placeholder:text-gray-400"
              />
            </SelectTrigger>
            <SelectContent>
              {companyTypes.map((companyType, index) => (
                <SelectItem key={index} value={companyType}>
                  {companyType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label className="text-sm font-medium mb-2 block">Website</Label>
        <Input
          type="text"
          placeholder="Your Company's Website"
          onChange={(e) => {
            setWebsite(e.target.value);
          }}
          value={website}
        />
      </div>
      <div>
        <Label className="text-sm font-medium mb-2 block">Location</Label>
        <Input
          type="text"
          placeholder="Location"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          value={location}
        />
      </div>
      <div>
        <Label className="text-sm font-medium mb-2 block">Description</Label>
        <Textarea
          placeholder="Write about your company"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
      </div>
      <Button
        className="w-full py-6 font-medium mt-4"
        onClick={handleSubmit}
        disabled={isCreating}
      >
        {isCreating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {isCreating ? "Creating your Profile..." : "Create"}
      </Button>
    </div>
  );
}

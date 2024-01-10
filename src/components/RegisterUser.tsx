import { BiSolidPencil } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { ChangeEvent, useState } from "react";
import useUserStore from "@/store/user";
import uploadImageToIPFS from "@/utils/uploadToIPFS";
import { CompanyMetadata, UserMetadata } from "@/types";
import { IPFS_PROTO_PREFIX } from "@/constants";
import uploadMetadata from "@/utils/uploadMetadata";
import useCreateUser from "@/hooks/useCreateUser";

export default function RegisterUser() {
  const {
    name,
    setName,
    bio,
    setBio,
    localImage,
    setLocalImage,
    reset,
    companyID,
  } = useUserStore();
  const { createUser } = useCreateUser();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLocalImage({
        selectedFile: e.target.files[0],
        selectedFileUrl: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

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

  const handleSubmit = async () => {
    setIsCreating(true);
    try {
      const cid = await uploadImage();
      const metadata: UserMetadata = {
        metadataId: uuidv4(),
        name,
        bio,
        companyID: "",
        picture: cid ? IPFS_PROTO_PREFIX + cid : undefined,
      };
      const metadataUri = await uploadMetadata(metadata);
      console.log(metadata);
      console.log(metadataUri);
      if (!metadataUri) throw new Error("Something went wrong");
      const txnHash = await createUser(metadataUri);
      toast("Profile registered!", {
        description:
          "Now, you can create list jobs and stream to your employees.",
        action: {
          label: "View On SolScan",
          onClick: () => {
            window.open(`https://solscan.io/tx/${txnHash}`, "_blank");
          },
        },
      });
      reset();
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
    <section className="overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="py-20 max-w-3xl mx-auto relative z-10">
          <h1 className="mb-4 text-center text-3xl lg:text-5xl font-bold font-heading">
            Register user
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Submit your info and get paid direct through stream.
          </p>
          <div className="p-8 rounded-xl border border-gray-900 max-w-xl mx-auto flex flex-col gap-4">
            <div className="flex justify-center items-center mb-5">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={
                      localImage.selectedFileUrl ??
                      "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Label
                  htmlFor="user-avatar"
                  className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer"
                >
                  <BiSolidPencil className="text-black" />
                </Label>
                <input
                  type="file"
                  id="user-avatar"
                  hidden
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Name</Label>
              <Input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Location</Label>
              <Input type="text" placeholder="Location" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Bio</Label>
              <Textarea
                placeholder="Write about yourself"
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                value={bio}
              />
            </div>
            <Button
              disabled={isCreating}
              className="w-full py-6 font-medium mt-4"
              onClick={handleSubmit}
            >
              {isCreating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isCreating ? "Creating your Profile..." : "Register "}
            </Button>
            <p className="text-gray-500 text-sm">
              <span>We process your information in accordance with our</span>
              <span> </span>
              <span className="text-orange-500 text-sm font-semibold">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

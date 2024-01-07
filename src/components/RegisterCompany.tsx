import { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BiSolidPencil } from "react-icons/bi";
import useCompanyStore, { companyType } from "@/store/company";
import uploadImageToIPFS from "@/utils/uploadToIPFS";

const companyTypes: companyType[] = ["Remote", "Hybrid", "In-Office"];

export default function RegisterCompany() {
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
  } = useCompanyStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLocalImage({
        selectedFile: e.target.files[0],
        selectedFileUrl: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const upload = async () => {
    try {
      if (!localImage.selectedFile) return;
      const cid = await uploadImageToIPFS(new Blob([localImage.selectedFile]));
      console.log("Got File CID: ", cid);
    } catch (error) {}
  };
  return (
    <section className="overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="py-20 max-w-3xl mx-auto relative z-10">
          <h1 className="mb-4 text-center text-3xl lg:text-5xl font-bold font-heading">
            Register company
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Submit your info and pay your employees to direct through stream.
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
            <div className="flex items-center flex-wrap justify-between">
              <div className="w-full md:w-7/12">
                <Label className="text-sm font-medium mb-2 block">
                  Company Name
                </Label>
                <Input
                  type="text"
                  placeholder="Enter your company's name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              </div>
              <div className="w-full md:w-4/12">
                <Label className="text-sm font-medium mb-2 block">Type</Label>
                <Select
                  onValueChange={(value: companyType) => {
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
              <Label className="text-sm font-medium mb-2 block">
                Description
              </Label>
              <Textarea
                placeholder="Write about your company"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
              />
            </div>
            <Button className="w-full py-6 font-medium mt-4" onClick={upload}>
              Submit
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

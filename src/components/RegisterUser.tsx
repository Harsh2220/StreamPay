import { BiSolidPencil } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default function RegisterUser() {
  const { name, setName, bio, setBio, localImage, setLocalImage } =
    useUserStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLocalImage({
        selectedFile: e.target.files[0],
        selectedFileUrl: URL.createObjectURL(e.target.files[0]),
      });
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
            <div className="">
              <Label className="text-sm font-medium mb-2 block">
                Select your company
              </Label>
              <ComboboxDemo />
            </div>
            <Button className="w-full py-6 font-medium mt-4">Submit</Button>
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

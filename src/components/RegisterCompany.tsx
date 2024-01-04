import React from "react";
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

export default function RegisterCompany() {
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
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer">
                  <BiSolidPencil className="text-black" />
                </div>
              </div>
            </div>
            <div className="flex items-center flex-wrap justify-between">
              <div className="w-full md:w-7/12">
                <Label className="text-sm font-medium mb-2 block">
                  Company Name
                </Label>
                <Input type="text" placeholder="Enter your company's name" />
              </div>
              <div className="w-full md:w-4/12">
                <Label className="text-sm font-medium mb-2 block">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select company type"
                      className="placeholder:text-gray-400"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="In office">In office</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Location</Label>
              <Input type="text" placeholder="Location" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Description
              </Label>
              <Textarea placeholder="Write about your company" />
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

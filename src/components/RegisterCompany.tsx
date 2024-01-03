import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

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
            <div className="flex flex-col items-center lg:flex-row gap-4">
              <div className="w-full">
                <Label className="text-sm font-medium mb-2 block">
                  First name
                </Label>
                <Input type="text" placeholder="First name" />
              </div>
              <div className="w-full">
                <Label className="text-sm font-medium mb-2 block">
                  Last name
                </Label>
                <Input type="text" placeholder="Last name" />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Email</Label>
              <Input type="text" placeholder="Email" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Message</Label>
              <Textarea placeholder="Message" />
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

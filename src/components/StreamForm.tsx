import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { IoIosInformationCircle } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const DURATION = [
  "Second",
  "Minute",
  "Hour",
  "Day",
  "Week",
  "Month",
  "Quarter",
  "Year",
];

const UNLOCK_SCHEDULE = [
  "Per second",
  "Per minute",
  "Hourly",
  "Daily",
  "Weekly",
  "Monthly",
  "Quarterly",
  "Yearly",
];

export default function StreamForm() {
  return (
    <section className="py-24 lg:py-28 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="max-w-xl mx-auto">
          <h2 className="font-heading mb-4 text-6xl text-white tracking-tighter">
            Create a Stream
          </h2>
          <p className="mb-16 text-lg text-gray-300 tracking-tight">
            Use and reuse tons of responsive sections to create the perfect
            layout. Sections are ready.
          </p>
          <div className="flex flex-wrap -m-3">
            <div className="w-full">
              <Label className="font-medium block px-3">Duration</Label>
              <div className="flex item-center">
                <div className="w-full md:w-1/2 p-3">
                  <Input type="number" placeholder="0" min={1} />
                </div>
                <div className="w-full md:w-1/2 p-3">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {DURATION.map((e, index) => (
                        <SelectItem value={e} key={index}>
                          {e}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="w-full p-3">
              <Label className="font-medium block pb-3">Unlock schedule</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  {UNLOCK_SCHEDULE.map((e, index) => (
                    <SelectItem value={e} key={index}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center w-full">
              <div className="w-full md:w-1/2 p-3">
                <Label className="font-medium block pb-3">Select Token</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {DURATION.map((e, index) => (
                      <SelectItem value={e} key={index}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-1/2 p-3">
                <Label className="font-medium block pb-3">Amount</Label>
                <Input type="number" placeholder="0" min={1} />
              </div>
            </div>
            <div className="bg-gray-900 m-3 p-3 border rounded-xl border-gray-700 w-full">
              <div className="flex gap-2 items-center">
                <Switch />
                <h1 className="text-lg font-semibold">Auto claim</h1>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <p className="text-gray-600 text-sm font-medium">
                  Tokens get claimed to recipient wallet automatically
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IoIosInformationCircle className="text-gray-600" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-48">
                      <p>
                        Additional fees per every auto-claim, this will be
                        ~0.000005 SOL per each claim.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="w-full p-3">
              <Button className="w-full py-6 font-semibold">
                Create stream
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

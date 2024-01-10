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
import { Duration, UnlockSchedule } from "@/types";
import useNewStreamStore from "@/store/NewStream";
import Supported_Tokens from "@/data/SupportedTokens";
import { toast } from "sonner";

const DURATION: Duration[] = [
  "Second",
  "Minute",
  "Hour",
  "Day",
  "Week",
  "Month",
  "Quarter",
  "Year",
];

const UNLOCK_SCHEDULE: UnlockSchedule[] = [
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
  const {
    allowAutoClaim,
    ammount,
    duration,
    durationUnit,
    unlockSchedule,
    setAllowAutoClaim,
    setAmmount,
    setDuration,
    setDurationUnit,
    setToken,
    setUnlockSchedule,
    reset,
  } = useNewStreamStore();

  const handleCreateStream = () => {
    toast("Stream created !", {
      description: "Stream created successfully !",
      position: "top-right",

      action: {
        label: "View on SolScan",
        onClick: () => {
          console.log("View clicked");
        },
      },
    });
    reset();
  };

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
                  <Input
                    type="number"
                    placeholder={`0 ${durationUnit}`}
                    min={1}
                    value={duration}
                    onChange={(e) => {
                      setDuration(e.target.valueAsNumber);
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 p-3">
                  <Select
                    onValueChange={(value: Duration) => {
                      setDurationUnit(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Stream Rate" />
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
              <Select
                onValueChange={(value: UnlockSchedule) => {
                  setUnlockSchedule(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={`Receiver can claim ${unlockSchedule}`}
                  />
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
                <Select
                  onValueChange={(value: string) => {
                    const selectedToken = Supported_Tokens.find(
                      (e) => e.symbol === value
                    );
                    setToken({
                      decimals: selectedToken?.decimals!,
                      tokenAddress: selectedToken?.tokenAddress!,
                      tokenName: selectedToken?.tokenName!,
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Token" />
                  </SelectTrigger>
                  <SelectContent>
                    {Supported_Tokens.map((e, index) => (
                      <SelectItem value={e.symbol} key={index} className="my-1">
                        <div className="flex flex-row items-center">
                          {e.icon}
                          <span className="ml-2">{e.symbol}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-1/2 p-3">
                <Label className="font-medium block pb-3">Amount</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={ammount}
                  min={1}
                  onChange={(e) => {
                    setAmmount(e.target.valueAsNumber);
                  }}
                />
              </div>
            </div>
            <div className="bg-gray-900 m-3 p-3 border rounded-xl border-gray-700 w-full">
              <div className="flex gap-2 items-center">
                <Switch
                  checked={allowAutoClaim}
                  onCheckedChange={(isChecked) => {
                    setAllowAutoClaim(isChecked);
                  }}
                />
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
              <Button
                className="w-full py-6 font-semibold"
                onClick={handleCreateStream}
              >
                Create stream
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Duration, UnlockSchedule } from "@/types";
import { create } from "zustand";
export interface StreamToken {
  tokenAddress: string;
  tokenName: string;
  decimals: number;
}

interface INewStreamStrore {
  duration: number;
  durationUnit: Duration;
  unlockSchedule: UnlockSchedule;
  token: StreamToken;
  ammount: number;
  allowAutoClaim: boolean;
  setDuration: (duration: number) => void;
  setDurationUnit: (durationUnit: Duration) => void;
  setUnlockSchedule: (unlockSchedule: UnlockSchedule) => void;
  setToken: (token: StreamToken) => void;
  setAmmount: (ammount: number) => void;
  setAllowAutoClaim: (allowAutoClaim: boolean) => void;
  reset: () => void;
}

const useNewStreamStore = create<INewStreamStrore>((set) => ({
  duration: 0,
  durationUnit: "Day",
  unlockSchedule: "Daily",
  token: {
    decimals: 6,
    tokenAddress: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    tokenName: "USDC",
  },
  ammount: 0,
  allowAutoClaim: false,
  setDuration: (duration: number) => set({ duration }),
  setDurationUnit: (durationUnit: Duration) => set({ durationUnit }),
  setUnlockSchedule: (unlockSchedule: UnlockSchedule) =>
    set({ unlockSchedule }),
  setToken: (token: StreamToken) => set({ token }),
  setAmmount: (ammount: number) => set({ ammount }),
  setAllowAutoClaim: (allowAutoClaim: boolean) => set({ allowAutoClaim }),
  reset: () =>
    set({
      duration: 0,
      durationUnit: "Day",
      unlockSchedule: "Daily",
      token: {
        decimals: 6,
        tokenAddress: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
        tokenName: "USDC",
      },
      ammount: 0,
      allowAutoClaim: false,
    }),
}));

export default useNewStreamStore;

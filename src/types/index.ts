import { PublicKey } from '@solana/web3.js';
export type CompanyType = "Remote" | "Hybrid" | "In-Office";

export type CompanyMetadata = {
  metadataId: string;
  name: string;
  description: string;
  logo: string | undefined;
  location: string;
  type: CompanyType;
  website: string;
};

export type UserMetadata = {
  metadataId: string;
  name: string;
  bio: string;
  companyID: string;
  picture: string | undefined;
};

export interface CompanyData {
  PublicKey: PublicKey,
  account: {
    allEmployees: string[],
    cId: PublicKey,
    metadataUri: string,
    signer: PublicKey
  }
}

export interface UsersData {
  PublicKey: PublicKey,
  account: {
    uId: PublicKey,
    metadataUri: string,
    signer: PublicKey
  }
}

export type Duration = "Second" | "Minute" | "Hour" | "Day" | "Week" | "Month" | "Quarter" | "Year";

export type UnlockSchedule = "Per second" | "Per minute" | "Hourly" | "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Yearly";

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

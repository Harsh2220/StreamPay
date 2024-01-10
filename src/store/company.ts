import { create } from "zustand";
import { LocalImage } from "./user";
import { CompanyType } from "@/types";

interface ICompanyStore {
  name: string;
  description: string;
  companyType: CompanyType | undefined;
  location: string;
  localImage: LocalImage;
  website: string;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setCompanyType: (companyType: CompanyType) => void;
  setLocation: (location: string) => void;
  setLocalImage: ({ selectedFile, selectedFileUrl }: LocalImage) => void;
  setWebsite: (website: string) => void;
  reset: () => void;
}

const useCompanyStore = create<ICompanyStore>((set) => ({
  name: "",
  description: "",
  companyType: undefined,
  location: "",
  localImage: {
    selectedFile: null,
    selectedFileUrl: null,
  },
  website: "",
  setName: (name) => {
    set({
      name: name,
    });
  },
  setDescription: (description) => {
    set({
      description: description,
    });
  },
  setCompanyType: (companyType) => {
    set({
      companyType: companyType,
    });
  },
  setLocation: (location) => {
    set({
      location: location,
    });
  },
  setWebsite: (website) => {
    set({
      website: website,
    });
  },
  setLocalImage: ({ selectedFile, selectedFileUrl }: LocalImage) => {
    set({
      localImage: {
        selectedFile: selectedFile,
        selectedFileUrl: selectedFileUrl,
      },
    });
  },
  reset: () => {
    set({
      name: "",
      description: "",
      companyType: undefined,
      location: "",
      localImage: {
        selectedFile: null,
        selectedFileUrl: null,
      },
      website: "",
    });
  },
}));

export default useCompanyStore;

import { create } from "zustand";
import { LocalImage } from "./user";

export type companyType = "Remote" | "Hybrid" | "In-Office";

interface ICompanyStore {
  name: string;
  description: string;
  companyType: companyType | undefined;
  location: string;
  localImage: LocalImage;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setCompanyType: (companyType: companyType) => void;
  setLocation: (location: string) => void;
  setLocalImage: ({ selectedFile, selectedFileUrl }: LocalImage) => void;
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
  setLocalImage: ({ selectedFile, selectedFileUrl }: LocalImage) => {
    set({
      localImage: {
        selectedFile: selectedFile,
        selectedFileUrl: selectedFileUrl,
      },
    });
  },
}));

export default useCompanyStore;

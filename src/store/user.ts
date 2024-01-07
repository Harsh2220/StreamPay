import { create } from "zustand";

export type LocalImage = {
  selectedFile: File | null;
  selectedFileUrl: string | null;
};
interface IUserStore {
  name: string;
  bio: string;
  companyID: string;
  localImage: LocalImage;
  setName: (name: string) => void;
  setBio: (bio: string) => void;
  setCompanyID: (companyID: string) => void;
  setLocalImage: ({ selectedFile, selectedFileUrl }: LocalImage) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  name: "",
  bio: "",
  companyID: "",
  localImage: {
    selectedFile: null,
    selectedFileUrl: null,
  },
  setName: (name) => {
    set({
      name: name,
    });
  },
  setBio: (bio) => {
    set({
      bio: bio,
    });
  },
  setCompanyID: (companyID) => {
    set({
      companyID: companyID,
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

export default useUserStore;

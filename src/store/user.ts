import { create } from "zustand";

interface IUserStore {
    name: string
    bio: string
    companyID: string
    setName: (name: string) => void
    setBio: (bio: string) => void
    setCompanyID: (companyID: string) => void
}

const useUserStore = create<IUserStore>((set) => ({
    name: "",
    bio: "",
    companyID: "",
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
            companyID: companyID
        })
    }
}));

export default useUserStore;
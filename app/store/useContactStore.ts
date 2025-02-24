import { create } from 'zustand';

interface ContactStore {
  contacts: [];
  setContacts: (contacts: []) => void;
}

const useContactStore = create<ContactStore>((set) => ({
  contacts: [],
  setContacts: (contacts) => set({ contacts }),
}));

export default useContactStore;


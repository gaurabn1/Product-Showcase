import { create } from 'zustand';

interface SubscriptionStore {
  subscriptions: [];
  setSubscriptions: (subscriptions: []) => void;
}

const useSubscriptionStore = create<SubscriptionStore>((set) => ({
  subscriptions: [],
  setSubscriptions: (subscriptions) => set({ subscriptions }),
}));

export default useSubscriptionStore;


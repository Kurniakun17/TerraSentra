import { create } from "zustand";
import { APIURL } from "../constant/type";

const useGreenCreditStore = create((set) => ({
  // State
  credits: [],
  creditDetail: {},
  loading: true,
  error: null,

  // Actions
  fetchCredits: async (id = 0) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${APIURL}/get-umkm/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch green credits");
      }

      const data = await response.json();

      set({  loading: false, creditDetail: data });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchFeaturedCredits: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${APIURL}/get-umkm/0`);

      if (!response.ok) {
        throw new Error("Failed to fetch green credits");
      }

      const data = await response.json();

      set({ credits: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addCredit: (credit) =>
    set((state) => ({
      credits: [...state.credits, credit],
    })),

  updateCredit: (id, updatedCredit) =>
    set((state) => ({
      credits: state.credits.map((credit) =>
        credit.id === id ? { ...credit, ...updatedCredit } : credit
      ),
    })),

  deleteCredit: (id) =>
    set((state) => ({
      credits: state.credits.filter((credit) => credit.id !== id),
    })),

  resetStore: () => set({ credits: [], loading: false, error: null }),
}));

export default useGreenCreditStore;

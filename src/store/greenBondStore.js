import { create } from "zustand";
import { APIURL } from "../constant/type";

const useGreenBondStore = create((set) => ({
  bonds: [],
  bondDetail: {},
  loading: true,
  error: null,

  fetchBonds: async ({ id }) => {
    try {
      set({ loading: true, error: null });

      const response = await fetch(`${APIURL}/green-bond?bond_id=${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch green bonds");
      }

      const data = await response.json();

      set({ bondDetail: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchFeaturedBonds: async ({ amount = 0 }) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${APIURL}/green-bond?amount=${amount}`);

      if (!response.ok) {
        throw new Error("Failed to fetch green bonds");
      }

      const data = await response.json();

      set({ bonds: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addBond: (bond) =>
    set((state) => ({
      bonds: [...state.bonds, bond],
    })),

  updateBond: (id, updatedBond) =>
    set((state) => ({
      bonds: state.bonds.map((bond) =>
        bond.id === id ? { ...bond, ...updatedBond } : bond
      ),
    })),

  deleteBond: (id) =>
    set((state) => ({
      bonds: state.bonds.filter((bond) => bond.id !== id),
    })),

  resetStore: () => set({ bonds: [], loading: false, error: null }),
}));

export default useGreenBondStore;

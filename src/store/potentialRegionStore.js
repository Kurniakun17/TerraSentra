import { create } from "zustand";
import { APIURL } from "../constant/type";

const usePotentialRegion = create((set) => ({
  // State
  regions: [],
  regionDetail: {},
  loading: true,
  error: null,

  // Actions
  fetchRegion: async (name) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${APIURL}/get-infrastructure/${name}`);

      if (!response.ok) {
        throw new Error("Failed to fetch green credits");
      }

      const data = await response.json();

      set({ loading: false, regionDetail: data });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchAllRegion: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${APIURL}/get-infrastructure`);

      if (!response.ok) {
        throw new Error("Failed to fetch green credits");
      }

      const data = await response.json();

      set({ regions: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default usePotentialRegion;

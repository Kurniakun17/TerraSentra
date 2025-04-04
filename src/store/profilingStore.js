import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useProfilingStore = create(
  persist(
    (set) => ({
      investmentInterests: [],
      riskLevel: '',
      investmentAmount: '',
      investmentTerm: '',
      
      setInvestmentInterests: (interests) => set({ investmentInterests: interests }),
      setRiskLevel: (level) => set({ riskLevel: level }),
      setInvestmentAmount: (amount) => set({ investmentAmount: amount }),
      setInvestmentTerm: (term) => set({ investmentTerm: term }),
      
      resetProfile: () => set({ 
        investmentInterests: [],
        riskLevel: '',
        investmentAmount: '',
        investmentTerm: '',
      }),
    }),
    {
      name: 'profiling-storage',
    }
  )
);

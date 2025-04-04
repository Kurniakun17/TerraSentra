import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            userType: null,
            profileCompleted: false,

            login: (userData) => set({ isAuthenticated: true, user: userData }),
            logout: () => set({ isAuthenticated: false, user: null, userType: null, profileCompleted: false }),
            setUserType: (type) => set({ userType: type }),
            completeProfile: () => set({ profileCompleted: true }),
        }),
        {
            name: 'auth-storage',
        }
    )
);


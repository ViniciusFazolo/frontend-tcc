import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    loadToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    isAuthenticated: false,

    login: async(token) =>{
        await AsyncStorage.setItem("authToken", token);
        set({ token, isAuthenticated: true });
    },

    logout: async() => {
        await AsyncStorage.removeItem("authToken");
        set({ token: null, isAuthenticated: false });
    },

    loadToken: async () => {
        const storedToken = await AsyncStorage.getItem("authToken");
        if (storedToken) {
            set({ token: storedToken, isAuthenticated: true });
        }
    },

}));

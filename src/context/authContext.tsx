import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { LoginResponse } from "../interfaces/LoginResponse";

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    id: string | null;
    role: string | null;
    loginName: string | null;
    login: (obj: LoginResponse) => Promise<void>;
    logout: () => Promise<void>;
    loadToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    isAuthenticated: false,
    id: null,
    role: null,
    loginName: null,

    login: async (obj) => {
        const authData = {
            token: obj.token,
            id: obj.id,
            role: obj.role,
            loginName: obj.loginName,
        };
        await AsyncStorage.setItem("authData", JSON.stringify(authData));
        set({ ...authData, isAuthenticated: true });
    },

    logout: async () => {
        await AsyncStorage.removeItem("authData");
        set({
            token: null,
            isAuthenticated: false,
            id: null,
            role: null,
            loginName: null,
        });
    },

    loadToken: async () => {
        const stored = await AsyncStorage.getItem("authData");
        if (stored) {
            const parsed: LoginResponse = JSON.parse(stored);
            set({
                token: parsed.token,
                id: parsed.id,
                role: parsed.role,
                loginName: parsed.loginName,
                isAuthenticated: true,
            });
        }
    },

}));

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface GroupState {
  currentGroupId: string | null;
  setCurrentGroupId: (id: string) => void;
  clearCurrentGroupId: () => void;
}

export const useGroupStore = create<GroupState>((set) => ({
  currentGroupId: null,
  setCurrentGroupId: async (id: string) => {
    await AsyncStorage.setItem('groupId', id)
  },
  clearCurrentGroupId: () => set({ currentGroupId: null }),
}));
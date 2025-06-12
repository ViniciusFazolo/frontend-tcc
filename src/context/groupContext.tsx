import { create } from 'zustand';

interface GroupState {
  currentGroupId: string | null;
  setCurrentGroupId: (id: string) => void;
  clearCurrentGroupId: () => void;
}

export const useGroupStore = create<GroupState>((set) => ({
  currentGroupId: null,
  setCurrentGroupId: (id: string) => set({ currentGroupId: id }),
  clearCurrentGroupId: () => set({ currentGroupId: null }),
}));
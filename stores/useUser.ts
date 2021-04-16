import create from 'zustand';

type UserStore = {
  hasAuth: boolean;
  setUser: (key: string, value: any) => void; // keyof isn't working here, why?!
};

export const useUser = create<UserStore>(set => ({
  hasAuth: false,

  setUser: (key, value) =>
    set(state => ({
      ...state,
      [key]: value
    }))
}));

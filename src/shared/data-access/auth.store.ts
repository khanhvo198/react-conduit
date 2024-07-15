import { create } from "zustand";
import { User } from "./api/models/user"
import { CONDUIT_TOKEN, CONDUIT_USER } from "../constants";

interface AuthState {
  user: User | undefined;
  isAuthenticated: boolean;
  setAuthState: (user: User | undefined, isAuthenticated: boolean) => void,
  setUser: (user: User) => void
}

const token = localStorage.getItem(CONDUIT_TOKEN)
const user = JSON.parse(localStorage.getItem(CONDUIT_USER) || "{}")

export const useAuthStore = create<AuthState>((set) => ({
  user: user,
  isAuthenticated: !!token,
  setAuthState: (user: User | undefined, isAuthenticated: boolean) => set(() => {
    console.log(user)
    if (user) {
      localStorage.setItem(CONDUIT_TOKEN, user.token)
      localStorage.setItem(CONDUIT_USER, JSON.stringify(user))
    } else {
      localStorage.removeItem(CONDUIT_TOKEN)
      localStorage.removeItem(CONDUIT_USER)
    }
    return { user, isAuthenticated }
  }),
  setUser: (user: User) => set(() => {
    localStorage.setItem(CONDUIT_USER, JSON.stringify(user))
    return { user }
  })
}))

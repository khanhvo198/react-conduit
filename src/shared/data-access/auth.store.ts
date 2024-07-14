import { create } from "zustand";
import { User } from "./api/models/user"
import { CONDUIT_TOKEN, CONDUIT_USER } from "../constants";

interface AuthState {
  user: User | undefined;
  isAuthenticated: boolean;
  setUser: (user: User | undefined, isAuthenticated: boolean) => void
}

const token = localStorage.getItem(CONDUIT_TOKEN)
const user = JSON.parse(localStorage.getItem(CONDUIT_USER) || "{}")

export const useAuthStore = create<AuthState>((set) => ({
  user: user,
  isAuthenticated: !!token,
  setUser: (user: User | undefined, isAuthenticated: boolean) => set(() => ({ user, isAuthenticated }))
}))

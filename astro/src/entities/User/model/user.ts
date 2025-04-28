import { atom, computed } from "nanostores";
import api from "@/services/api.ts";

interface User {
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

export const authStore = atom<AuthState>({
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
  isInitialized: false,
});

export const isAuthenticated = computed(
  authStore,
  (state) => state.isInitialized && !!state.accessToken,
);
export const currentUser = computed(authStore, (state) => state.user);

export async function initAuth() {
  if (typeof window === "undefined") {
    return;
  }

  try {

    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    authStore.set({
      ...authStore.get(),
      accessToken: token || null,
      refreshToken: refreshToken || null,
      isInitialized: true,
    });

    const userResponse = await api.get<User>("/users/me");

    if (userResponse.status === 200) {
      authStore.set({
        ...authStore.get(),
        user: userResponse.data,
      });
    }
  } catch (error) {
    console.error("Ошибка при инициализации авторизации:", error);
    authStore.set({
      ...authStore.get(),
      isInitialized: true,
    });
  }
}

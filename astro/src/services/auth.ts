import { authStore } from "@/entities/User";
import api from "./api";

export const authService = {
  async signUp(email: string, password: string) {
    authStore.set({ ...authStore.get(), isLoading: true, error: null });

    try {
      await api.post("/auth/register", { email, password });

      authStore.set({
        ...authStore.get(),
        isLoading: false,
      });

      window.location.href = "/sign-in";
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Ошибка регистрации";

      authStore.set({
        ...authStore.get(),
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  async signIn(email: string, password: string) {
    authStore.set({ ...authStore.get(), isLoading: true, error: null });

    try {
      console.log("Making API request to /auth/login");
      const response = await api.post("/auth/login", { email, password });
      console.log("API response received:", response.data);

      const { accessToken, refreshToken } = response.data;

      // Add try-catch blocks for localStorage operations
      try {
        console.log("Setting tokens in localStorage");
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        console.log("Tokens set successfully, verifying...");
        console.log("Stored tokens:", {
          token: localStorage.getItem("token"),
          refreshToken: localStorage.getItem("refreshToken"),
        });
      } catch (storageError) {
        console.error("Error saving to localStorage:", storageError);
      }

      authStore.set({
        ...authStore.get(),
        accessToken,
        refreshToken,
        isLoading: false,
        isInitialized: true,
      });

      return response.data;
    } catch (error: any) {
      console.error("API login error:", error);
      const errorMessage = error.response?.data?.message || "Ошибка входа";

      authStore.set({
        ...authStore.get(),
        isLoading: false,
        error: errorMessage,
        isInitialized: false,
      });
      throw error;
    }
  },

  async signOut() {
    try {
    } catch (error) {
      console.error("Ошибка при выходе", error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    authStore.set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      error: null,
      isInitialized: false,
    });
  },

  async refresh() {
    const oldRefreshToken = localStorage.getItem("refreshToken");

    if (!oldRefreshToken) {
      throw new Error("Нет refresh token");
    }

    try {
      const response = await api.post("/auth/refresh", {
        refreshToken: oldRefreshToken,
      });

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem("token", accessToken);
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      authStore.set({
        ...authStore.get(),
        accessToken,
        refreshToken,
      });

      return response.data;
    } catch (error) {
      await this.signOut();
      throw error;
    }
  },
};

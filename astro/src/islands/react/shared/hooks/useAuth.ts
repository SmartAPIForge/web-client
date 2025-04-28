import { useStore } from "@nanostores/react";
import {
  authStore,
  currentUser,
  initAuth,
  isAuthenticated,
} from "@/entities/User";
import { authService } from "@/services/auth";
import { useEffect } from "react";

export function useAuth() {
  const auth = useStore(authStore);
  const isAuth = useStore(isAuthenticated);
  const user = useStore(currentUser);

  useEffect(() => {
    if (!auth.isInitialized) {
      initAuth();
    }
  }, [auth.isInitialized]);

  return {
    user,
    isAuthenticated: isAuth,
    isLoading: auth.isLoading,
    isInitialized: auth.isInitialized,
    accessToken: auth.accessToken,
    error: auth.error,
    signUp: authService.signUp.bind(authService),
    signIn: authService.signIn.bind(authService),
    signOut: authService.signOut.bind(authService),
    refresh: authService.refresh.bind(authService),
  };
}

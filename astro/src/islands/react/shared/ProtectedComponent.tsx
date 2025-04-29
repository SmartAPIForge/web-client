import React, { useEffect, useState } from "react";
import { useAuth } from "@/react/shared/hooks/useAuth.ts";

interface ProtectedComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedComponent({
  children,
  fallback = <div>Требуется авторизация</div>,
}: ProtectedComponentProps) {
  const { isAuthenticated, isInitialized } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !isInitialized) {
    return null;
  }

  if (!isAuthenticated) {
    window.location.href = "/sign-in";
    return null;
  }

  return <>{children}</>;
}

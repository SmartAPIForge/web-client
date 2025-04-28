import * as m from "@/paraglide/messages";
import Button from "@/react/shared/ui/Button";
import { useEffect, useState } from "react";
import { CONSTS } from "@/consts.ts";
import { useAuth } from "@/react/shared/hooks/useAuth.ts";

const HeaderWidget = () => {
  const { isLoading, isAuthenticated, signOut, accessToken } = useAuth();
  const [isProfilePage, setIsProfilePage] = useState(false);

  console.log("accessToken", accessToken);
  console.log("isAuth", isAuthenticated);

  useEffect(() => {
    // Check if we're on the profile page
    if (typeof window !== "undefined") {
      setIsProfilePage(window.location.pathname === CONSTS.PROFILE_PATH);
    }
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <header className="header">
      <div className="container">
        <div className="content">
          <div className="block">
            <a href="/">
              <p>{m.metaTitle()}</p>
            </a>
          </div>
          <div className="block">
            <a href="/generator">
              <p>Generator</p>
            </a>
          </div>
          <div className="block">
            {isLoading ? (
              <p>Loading...</p>
            ) : isAuthenticated ? (
              isProfilePage ? (
                <Button onClick={handleSignOut}>
                  <div className="button-content">
                    <p>Sign Out</p>
                    <img src="/icons/right-arrow.svg" alt="sign-out" />
                  </div>
                </Button>
              ) : (
                <a href="/profile">
                  <Button>
                    <div className="button-content">
                      <p>Profile</p>
                      <img src="/icons/right-arrow.svg" alt="profile" />
                    </div>
                  </Button>
                </a>
              )
            ) : (
              <a href="/sign-in">
                <Button>
                  <div className="button-content">
                    <p>Sign In</p>
                    <img src="/icons/right-arrow.svg" alt="sign-in" />
                  </div>
                </Button>
              </a>
            )}
          </div>
        </div>
        <hr />
      </div>
    </header>
  );
};

export { HeaderWidget };

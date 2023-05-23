import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Pages } from "shared/constants/pages";
import { useAuth } from "hooks/common/useAuth";

const AuthGuard = ({ children }: { children: React.ReactNode }): any => {
  const { status } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated" && router.pathname !== Pages.login) {
      router.push(Pages.login);
    }
  }, [router, status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return children;
  }
};

export default AuthGuard;

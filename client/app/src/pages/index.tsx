import { useRouter } from "next/router";
import { useEffect } from "react";
import { Route } from "shared/constants/Routes";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace(Route.myPage);
  });
  return null;
};

export default Index;

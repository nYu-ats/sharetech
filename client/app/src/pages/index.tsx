import { useRouter } from "next/router";
import { useEffect } from "react";
import { Pages } from "shared/constants/pages";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace(Pages.myPage);
  });
  return null;
};

export default Index;

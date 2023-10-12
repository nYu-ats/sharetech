import LoginPageTemplate from "templates/loginPage/Login.template";
import { LoginPageProps, LoginFormProps } from "./LoginPage.type";
import LoginForm from "components/organisms/form/loginForm/LoginForm";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Pages } from "shared/constants/pages";
import { useAuth } from "hooks/common/useAuth";
import { CustomNextPage } from "types/custom-next-page";
import { useState } from "react";

const LoginPage: CustomNextPage<LoginPageProps> = (props) => {
  const router = useRouter();
  const nextPath = router.query.path
    ? (router.query.path as string)
    : Pages.salesRoom.top();
  const { status, signIn } = useAuth();
  const { register, handleSubmit } = useForm<LoginFormProps>();
  const [isLoading, setLoading] = useState(false);
  const onSubmit = async (data: LoginFormProps) => {
    setLoading(true);
    await signIn(data)
      .then((response) => {
        router.push(nextPath);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };
  const loginForm = (
    <LoginForm
      emailOptions={register("email", { required: true, maxLength: 100 })}
      passwordOptions={register("password", { required: true, maxLength: 30 })}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    />
  );

  if (status === "authenticated") {
    router.push(nextPath);
  }

  return <LoginPageTemplate loginForm={loginForm} />;
};

export default LoginPage;

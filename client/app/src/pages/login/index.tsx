import LoginPageTemplate from "templates/loginPage/LoginPage.template";
import { LoginPageProps, LoginFormProps } from "./LoginPage.type";
import toast from "react-hot-toast";
import { ApiError } from "shared/constants/messages";
import LoginForm from "components/organisms/form/loginForm/LoginForm";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Pages } from "shared/constants/pages";
import { useAuth } from "hooks/common/useAuth";
import { CustomNextPage } from "types/custom-next-page";

const LoginPage: CustomNextPage<LoginPageProps> = (props) => {
  // if (loadStatus.isError) {
  //   toast.error(ApiError, { id: "MyTechNote" });
  // }
  const router = useRouter();
  const { status, signIn } = useAuth();
  const { register, handleSubmit } = useForm<LoginFormProps>();
  const basicSignIn = async (data: LoginFormProps) => {
    await signIn(data)
      .then((response) => {
        router.push(Pages.myPage);
      })
      .catch((e) => console.log(e));
  };
  const loginForm = (
    <LoginForm
      emailOptions={register("email", { required: true })}
      passwordOptions={register("password", { required: true })}
      onSubmit={handleSubmit(basicSignIn)}
    />
  );

  if (status === "authenticated") {
    router.push(Pages.myPage);
  }

  return <LoginPageTemplate loginForm={loginForm} />;
};

export default LoginPage;

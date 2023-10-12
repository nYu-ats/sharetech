import { SalesContentShareProps } from "pages/salesRoom/[contentId]/SalesContentView.type";
import { UseFormRegister } from "react-hook-form";

export type PasswordUpdateProps = {
  inputRegister: UseFormRegister<SalesContentShareProps>;
  submit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

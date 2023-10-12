import { SalesContentShareProps } from "pages/salesRoom/[contentId]/SalesContentView.type";
import { FieldArrayWithId, UseFormRegister } from "react-hook-form";

export type UserDeleteProps = {
  currentUsers: Array<string>;
  inputRegister: UseFormRegister<SalesContentShareProps>;
  submit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

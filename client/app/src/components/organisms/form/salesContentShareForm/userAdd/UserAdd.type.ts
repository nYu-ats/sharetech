import { SalesContentShareProps } from "pages/salesRoom/[contentId]/SalesContentView.type";
import { FieldArrayWithId, UseFormRegister } from "react-hook-form";

export type UserAddProps = {
  sharedUserFields: Array<FieldArrayWithId<SalesContentShareProps, "newUsers", "id">>;
  inputRegister: UseFormRegister<SalesContentShareProps>;
  addUser?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  removeUser?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  submit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

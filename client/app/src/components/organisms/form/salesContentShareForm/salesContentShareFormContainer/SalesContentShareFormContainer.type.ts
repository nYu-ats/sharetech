import {
  SalesContentSharedUser,
  SalesContentShareProps,
} from "pages/salesRoom/[contentId]/SalesContentView.type";
import { FieldArrayWithId, UseFormRegister } from "react-hook-form";

export type SalesContentShareFormContainerProps = {
  sharedUserFields: Array<FieldArrayWithId<SalesContentShareProps, "newUsers", "id">>;
  currentUsers: Array<string>;
  inputRegister: UseFormRegister<SalesContentShareProps>;
  closeForm?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  copyUrl?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  copyPassword?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  addUser?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  removeUser?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  addUserSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  deleteUserSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  updatePasswordSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

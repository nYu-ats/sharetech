import {
  FieldArrayWithId,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { SalesContentShareProps } from "../../SalesContentView.type";

export type UseSalesContentShareFormProps = { contentId: string };

export type ArrayFields = {
  newUserFields: Array<FieldArrayWithId<SalesContentShareProps, "newUsers", "id">>;
};

export type FormHandler = {
  register: UseFormRegister<SalesContentShareProps>;
  watch: UseFormWatch<SalesContentShareProps>;
  handleSubmit: UseFormHandleSubmit<SalesContentShareProps>;
  addUserInput: (e: React.MouseEvent<HTMLButtonElement>) => void;
  removeUserInput: (e: React.MouseEvent<HTMLButtonElement>) => void;
  updatePasswordSubmit: (contentId: string, password: string) => void;
  sharedUserAddSubmit: (contentId: string, users: Array<string>) => void;
  sharedUserDeleteSubmit: (contentId: string, users: Array<string>) => void;
};

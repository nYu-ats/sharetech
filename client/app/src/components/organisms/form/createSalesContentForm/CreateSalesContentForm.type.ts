import { BaseFormProps } from "../BaseForm.type";
import { UseFormRegisterReturn } from "react-hook-form";

export type CreateSalesContentFormProps = BaseFormProps & {
  textOptions: UseFormRegisterReturn<"title">;
  onCancelClick?: () => void;
};

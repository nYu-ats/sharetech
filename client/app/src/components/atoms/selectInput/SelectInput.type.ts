export type SelectInputProps = {
  id: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
  onChnage?: React.ChangeEventHandler<HTMLInputElement>;
};

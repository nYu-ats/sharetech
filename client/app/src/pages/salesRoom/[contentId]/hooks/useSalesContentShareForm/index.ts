import { useFieldArray, useForm } from "react-hook-form";
import { updatePassword, updateSharedUsers } from "repositories/shareTech/salesContent";
import { SalesContentShareProps } from "../../SalesContentView.type";
import useSalesContentShare from "../useSalesContentShare";
import { ArrayFields, FormHandler, UseSalesContentShareFormProps } from "./type";

const useSalesContentShareForm = (
  props: UseSalesContentShareFormProps
): [Array<string>, string, ArrayFields, FormHandler] => {
  const [currentSharedUsers, currentPassword, shareStatus, shareHandler] =
    useSalesContentShare({ contentId: props.contentId });
  const { register, handleSubmit, control, watch, setValue } =
    useForm<SalesContentShareProps>({
      values: {
        password: currentPassword.password,
        deleteUsers: [],
        newUsers: [{ value: "" }],
      },
    });
  const {
    fields: newUserFields,
    append: newUserAppend,
    remove: newUserRemove,
  } = useFieldArray({
    name: "newUsers",
    control,
  });

  const addUserInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    newUserAppend({ value: "" });
  };

  const removeUserInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = Number(e.currentTarget.getAttribute("data-index"));
    newUserRemove(index);
  };

  const sharingPasswordUpdate = async (contentId: string, password: string) => {
    await updatePassword(contentId, password);
    shareHandler.sharedPasswordRefetch();
  };

  const sharedUserAdd = async (contentId: string, users: Array<string>) => {
    await updateSharedUsers(contentId, users, true);
    shareHandler.sharedPasswordRefetch();
  };

  const sharedUserDelete = async (contentId: string, users: Array<string>) => {
    await updateSharedUsers(contentId, users, false);
    shareHandler.sharedPasswordRefetch();
  };

  return [
    currentSharedUsers.users.map((user) => user.userId),
    currentPassword.password,
    {
      newUserFields: newUserFields,
    },
    {
      register: register,
      watch: watch,
      handleSubmit: handleSubmit,
      addUserInput: addUserInput,
      removeUserInput: removeUserInput,
      updatePasswordSubmit: (contentId: string, password: string) =>
        sharingPasswordUpdate(contentId, password),
      sharedUserAddSubmit: (contentId: string, users: Array<string>) =>
        sharedUserAdd(contentId, users),
      sharedUserDeleteSubmit: (contentId: string, users: Array<string>) =>
        sharedUserDelete(contentId, users),
    },
  ];
};

export default useSalesContentShareForm;

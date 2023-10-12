import { useQuery } from "react-query";
import { getSharedPassword, getSharedUsers } from "repositories/shareTech/salesContent";
import {
  SalesContentSharedUsers,
  SalesContentShareHandler,
  SalesContentShareStatus,
  SalesContentSharingPassword,
  UseSalesContentShareProps,
} from "./type";

const initialSharedUsers = {
  users: [],
} as SalesContentSharedUsers;

const initialSharingPassword = {
  password: "",
} as SalesContentSharingPassword;

const useSalesContentShare = (
  props: UseSalesContentShareProps
): [
  SalesContentSharedUsers,
  SalesContentSharingPassword,
  SalesContentShareStatus,
  SalesContentShareHandler
] => {
  const {
    isLoading: sharedUsersLoading,
    isError: sharedUsersError,
    data: sharedUsersData,
    refetch: sharedUsersRefetch,
  } = useQuery(["salesContentSharedUsers", props.contentId], () =>
    getSharedUsers(props.contentId)
  );

  const {
    isLoading: sharingPasswordLoading,
    isError: sharingPasswordError,
    data: sharingPasswordData,
    refetch: sharingPasswordRefetch,
  } = useQuery(["salesContentSharingPassword", props.contentId], () =>
    getSharedPassword(props.contentId)
  );

  const sharedUsers =
    sharedUsersData !== undefined
      ? {
          users: sharedUsersData.result.users.map((user) => {
            return {
              userId: user.user_id,
              isActive: user.is_active,
            };
          }),
        }
      : initialSharedUsers;

  const sharingPassword =
    sharingPasswordData !== undefined
      ? {
          password: sharingPasswordData.result.password,
        }
      : initialSharingPassword;

  return [
    sharedUsers,
    sharingPassword,
    {
      sharedUsersLoading,
      sharingPasswordLoading,
    },
    {
      sharedUsersRefetch: () => sharedUsersRefetch(),
      sharedPasswordRefetch: () => sharingPasswordRefetch(),
    },
  ];
};

export default useSalesContentShare;

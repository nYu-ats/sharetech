export type UseSalesContentShareProps = {
  contentId: string;
};

type SalesContentSharedUser = {
  userId: string;
  isActive: boolean;
};

export type SalesContentSharedUsers = {
  users: Array<SalesContentSharedUser>;
};

export type SalesContentSharingPassword = {
  password: string;
};

export type SalesContentShareStatus = {
  sharedUsersLoading: boolean;
  sharingPasswordLoading: boolean;
};

export type SalesContentShareHandler = {
  sharedUsersRefetch: () => void;
  sharedPasswordRefetch: () => void;
};

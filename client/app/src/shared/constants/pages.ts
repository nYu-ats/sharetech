export const Pages = {
  login: "/login",
  myPage: "/myPage",
  search: "/search",
  salesRoom: {
    top: () => "/salesRoom",
    view: (contentsId: string) => `/salesRoom/${contentsId}/view`,
    edit: (contentsId: string) => `/salesRoom/${contentsId}/edit`,
  },
};

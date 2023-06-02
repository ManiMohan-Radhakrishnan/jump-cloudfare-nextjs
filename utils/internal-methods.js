import appAxiosInternal from "./axios-internal-utils";

export const nftShowAllApi = ({ page, per_page, filter = {}, sort }) =>
  appAxiosInternal.get(`/dashboard/index?page=${page}&per_page=${per_page}`, {
    params: {
      filter,
      sort,
      time: new Date().getTime(),
    },
  });

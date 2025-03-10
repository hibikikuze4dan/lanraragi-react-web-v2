import { createLocalStorageInstance } from "../local-storage";
import { BEARER_TOKEN } from "../local-storage/constants";

const { get: getBearerToken } = createLocalStorageInstance(BEARER_TOKEN);

export const getAuthorizationHeader = () => {
  const bearerToken = getBearerToken() ?? "";
  return bearerToken
    ? {
        Authorization: `Bearer ${bearerToken}`,
      }
    : {};
};

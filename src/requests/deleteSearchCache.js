import axios from "axios";
import { BASE_URL, HTTP_OR_HTTPS } from "../local-storage/constants";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";
import { SEARCH_CACHE_URL } from "./constants";
import { createLocalStorageInstance } from "../local-storage";

const { get: getBaseUrl } = createLocalStorageInstance(BASE_URL);
const { get: getHttpOrHttps } = createLocalStorageInstance(HTTP_OR_HTTPS);

export const deleteSearchCache = async () => {
  const endpoint = SEARCH_CACHE_URL;

  try {
    const response = await axios({
      method: "delete",
      url: `${getHttpOrHttps()}://${getBaseUrl()}${endpoint}`,
      headers: {
        ...getAuthorizationHeader(),
      },
    });

    const { operation, success, successMessage } = response?.data ?? {};
    return {
      operation,
      success,
      error: "",
      successMessage,
    };
  } catch (err) {
    console.log(
      `Something went wrong while trying to reset the search cache: ${err}`
    );
    return {
      operation: "delete_archive",
      success: 0,
      error: err,
      successMessage: "",
    };
  }
};

export default deleteSearchCache;

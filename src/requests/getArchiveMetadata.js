import axios from "axios";
import { createLocalStorageInstance } from "../local-storage";
import { BASE_URL, HTTP_OR_HTTPS } from "../local-storage/constants";
import { METADATA_URL } from "./constants";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

const { get: getBaseUrl } = createLocalStorageInstance(BASE_URL);
const { get: getHttpOrHttps } = createLocalStorageInstance(HTTP_OR_HTTPS);

export const getArchiveMetadata = async ({ archiveId } = {}) => {
  try {
    const endpoint = METADATA_URL.replace(":id", archiveId);

    const response = await axios({
      method: "get",
      url: `${getHttpOrHttps()}://${getBaseUrl()}${endpoint}`,
      headers: {
        "Content-Type": "multipart/form-data",
        ...getAuthorizationHeader(),
      },
    });

    return response?.data ?? {};
  } catch (err) {
    const message =
      "Something went wrong while trying to get the archives metadata";
    console.log(`${message}: ${err}`);
    return {};
  }
};

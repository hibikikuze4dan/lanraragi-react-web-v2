import axios from "axios";
import { createLocalStorageInstance } from "../local-storage";
import { BASE_URL, HTTP_OR_HTTPS } from "../local-storage/constants";
import { THUMBNAIL_URL } from "./constants";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

const { get: getBaseUrl } = createLocalStorageInstance(BASE_URL);
const { get: getHttpOrHttps } = createLocalStorageInstance(HTTP_OR_HTTPS);

export const requestArchiveThumbnail = async (archiveId = "") => {
  const endpoint = THUMBNAIL_URL.replace(":id", archiveId);

  try {
    const response = await axios({
      method: "get",
      url: `${getHttpOrHttps()}://${getBaseUrl()}${endpoint}`,
      headers: {
        ...getAuthorizationHeader(),
      },
      responseType: "blob",
    });

    const blob = response?.data ?? "";

    return URL.createObjectURL(blob);
  } catch (err) {
    console.log(
      `Something went wrong while trying to get the thumbnail for the archive: ${err}`
    );

    return "";
  }
};

import axios from "axios";
import { createLocalStorageInstance } from "../local-storage";
import { BASE_URL, HTTP_OR_HTTPS } from "../local-storage/constants";
import { UPDATE_ARCHIVE_THUMBNAIL_URL } from "./constants";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

const { get: getBaseUrl } = createLocalStorageInstance(BASE_URL);
const { get: getHttpOrHttps } = createLocalStorageInstance(HTTP_OR_HTTPS);

export const putUpdateThumbnail = async ({ archiveId, page = 1 }) => {
  try {
    const endpoint = UPDATE_ARCHIVE_THUMBNAIL_URL.replace(":id", archiveId);

    const formData = new FormData();

    if (![0, 1].includes(page)) formData.append("page", page);

    const response = await axios({
      method: "put",
      url: `${getHttpOrHttps()}://${getBaseUrl()}${endpoint}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        ...getAuthorizationHeader(),
      },
    });

    const { success, operation, new_thumbnail } = response?.data ?? {};

    return {
      success,
      operation,
      new_thumbnail,
      error: "",
    };
  } catch (err) {
    const message =
      "Something went wrong while trying to regenerate the thumbnail";

    console.log(`${message}: ${err}`);
    return {
      success: 0,
      error: err,
      operation: "update_thumbnail",
      new_thumbnail: "",
    };
  }
};

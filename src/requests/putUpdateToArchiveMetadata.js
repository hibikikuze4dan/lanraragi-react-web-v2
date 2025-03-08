import axios from "axios";
import { createLocalStorageInstance } from "../local-storage";
import { BASE_URL, HTTP_OR_HTTPS } from "../local-storage/constants";
import { METADATA_URL } from "./constants";

const { get: getBaseUrl } = createLocalStorageInstance(BASE_URL);
const { get: getHttpOrHttps } = createLocalStorageInstance(HTTP_OR_HTTPS);

export const putUpdateToArchiveMetadata = async ({
  title,
  tags,
  summary,
  archiveId,
} = {}) => {
  try {
    const endpoint = METADATA_URL.replace(":id", archiveId);

    const formData = new FormData();

    if (title) formData.append("title", title);
    if (tags) formData.append("tags", tags);
    if (summary) formData.append("summary", summary);

    const response = await axios({
      method: "put",
      url: `${getHttpOrHttps()}://${getBaseUrl()}${endpoint}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { success, operation, successMessage } = response?.data ?? {};

    return {
      success,
      operation,
      successMessage,
    };
  } catch (err) {
    const message =
      "Something went wrong while trying to update the archives categories";
    console.log(`${message}: ${err}`);
    return {
      success: 0,
      error: err,
      operation: "______",
    };
  }
};

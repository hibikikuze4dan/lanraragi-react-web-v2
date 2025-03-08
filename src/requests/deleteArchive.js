import axios from "axios";
import { createLocalStorageInstance } from "../local-storage";
import { BASE_URL, HTTP_OR_HTTPS } from "../local-storage/constants";
import { DELETE_ARCHIVE_URL } from "./constants";

const { get: getBaseUrl } = createLocalStorageInstance(BASE_URL);
const { get: getHttpOrHttps } = createLocalStorageInstance(HTTP_OR_HTTPS);

export const deleteArchive = async (archiveId) => {
  const endpoint = DELETE_ARCHIVE_URL.replace(":id", archiveId);

  try {
    const response = await axios({
      method: "delete",
      url: `${getHttpOrHttps()}://${getBaseUrl()}${endpoint}`,
    });

    const { operation, success, id, filename } = response?.data ?? {};
    return {
      operation,
      success,
      id: id ?? archiveId,
      filename,
      error: "",
    };
  } catch (err) {
    console.log(
      `Something went wrong while trying to delete an archive: ${err}`
    );
    return {
      operation: "delete_archive",
      success: 0,
      error: err,
      id: archiveId,
      filename: "",
    };
  }
};

export default deleteArchive;

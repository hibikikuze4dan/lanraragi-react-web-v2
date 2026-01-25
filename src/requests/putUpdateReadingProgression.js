import axios from "axios";
import { createLocalStorageInstance } from "../local-storage";
import { BASE_URL, HTTP_OR_HTTPS } from "../local-storage/constants";
import { READING_POSITION } from "./constants";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

const { get: getBaseUrl } = createLocalStorageInstance(BASE_URL);
const { get: getHttpOrHttps } = createLocalStorageInstance(HTTP_OR_HTTPS);

export const putUpdateReadingProgression = async ({
  archiveId,
  page = 1,
} = {}) => {
  if (!archiveId) {
    console.warn(
      "No archive ID was supplied to the putUpdateReadingProgression function",
    );

    return {
      success: 0,
      operation: "update_progress",
      id: archiveId,
      page,
      lastreadtime: undefined,
      error: null,
    };
  }

  try {
    const endpoint = READING_POSITION.replace(":id", archiveId).replace(
      ":page",
      page,
    );

    const response = await axios({
      method: "put",
      url: `${getHttpOrHttps()}://${getBaseUrl()}${endpoint}`,
      headers: {
        ...getAuthorizationHeader(),
      },
    });

    const {
      success,
      operation,
      id,
      page: archivePage,
      lastreadtime,
    } = response?.data ?? {};

    return {
      success,
      operation,
      id,
      page: archivePage,
      lastreadtime,
      error: null,
    };
  } catch (err) {
    const message =
      "Something went wrong while trying to update the reading progression";
    console.log(`${message}: ${err}`);
    return {
      success: 0,
      operation: "update_progress",
      id: archiveId,
      page,
      lastreadtime: undefined,
      error: null,
    };
  }
};

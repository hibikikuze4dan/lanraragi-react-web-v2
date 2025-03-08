import axios from "axios";
import { BASE_URL, HTTP_OR_HTTPS } from "../local-storage/constants";
import { createLocalStorageInstance } from "../local-storage";
import { UPDATE_CATEGORY_URL } from "./constants";

const { get: getBaseUrl } = createLocalStorageInstance(BASE_URL);
const { get: getHttpOrHttps } = createLocalStorageInstance(HTTP_OR_HTTPS);

export const putUpdateToArchiveCategory = async ({
  archiveId = "",
  categoryId = "",
}) => {
  try {
    const endpoint = UPDATE_CATEGORY_URL.replace(":id", categoryId).replace(
      ":archive",
      archiveId
    );

    const response = await axios({
      method: "put",
      url: `${getHttpOrHttps()}://${getBaseUrl()}${endpoint}`,
    });

    const { success, successMessage, operation } = response?.data ?? {};

    return {
      success,
      successMessage,
      operation,
    };
  } catch (err) {
    const message =
      "Something went wrong while trying to update the archives categories";
    console.log(`${message}: ${err}`);
    return {
      success: 0,
      successMessage: message,
      operation: "add_to_category",
    };
  }
};

export default putUpdateToArchiveCategory;

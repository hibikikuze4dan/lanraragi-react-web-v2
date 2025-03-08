import axios from "axios";
import { createLocalStorageInstance } from "../local-storage";
import { BASE_URL, HTTP_OR_HTTPS } from "../local-storage/constants";
import { CATEGORIES_URL } from "./constants";

const { get: getBaseUrl } = createLocalStorageInstance(BASE_URL);
const { get: getHttpOrHttps } = createLocalStorageInstance(HTTP_OR_HTTPS);

export const requestAllCategories = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${getHttpOrHttps()}://${getBaseUrl()}${CATEGORIES_URL}`,
    });

    return [...(response?.data ?? [])];
  } catch (err) {
    console.log(`Something went wrong while trying to get categories: ${err}`);
    return [];
  }
};

export default requestAllCategories;

import axios from "axios";
import { RANDOM_URL } from "./constants";
import { createLocalStorageInstance } from "../local-storage";
import { BASE_URL, HTTP_OR_HTTPS } from "../local-storage/constants";

const { get: getBaseUrl } = createLocalStorageInstance(BASE_URL);
const { get: getHttpOrHttps } = createLocalStorageInstance(HTTP_OR_HTTPS);

export const requestRandomArchives = async (count = 10) => {
  try {
    const response = await axios({
      method: "get",
      url: `${getHttpOrHttps()}://${getBaseUrl()}${RANDOM_URL}?count=${count}`,
    });

    return [...(response?.data?.data ?? [])];
  } catch (err) {
    console.log(
      `Something went wrong while trying to get random archives: ${err}`
    );
    return [];
  }
};

export default requestRandomArchives;

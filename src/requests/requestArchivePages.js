import axios from "axios";
import { FILES_URL } from "./constants";
import { createLocalStorageInstance } from "../local-storage";
import { BASE_URL, HTTP_OR_HTTPS } from "../local-storage/constants";

const { get: getBaseUrl } = createLocalStorageInstance(BASE_URL);
const { get: getHttpOrHttps } = createLocalStorageInstance(HTTP_OR_HTTPS);

export const requestArchivePages = async (archiveId) => {
  const filesEndpoint = FILES_URL.replace(":id", archiveId ?? "");

  try {
    const response = await axios({
      method: "get",
      url: `${getHttpOrHttps()}://${getBaseUrl()}${filesEndpoint}`,
    });

    const { job, pages } = response?.data ?? {};
    return { job: job ?? 0, pages: pages ?? [] };
  } catch (err) {
    console.log(
      `Something went wrong while trying to get the archives files: ${err}`
    );
    return { job: 0, pages: [] };
  }
};

export default requestArchivePages;

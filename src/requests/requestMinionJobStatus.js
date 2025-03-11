import axios from "axios";
import { createLocalStorageInstance } from "../local-storage";
import { BASE_URL, HTTP_OR_HTTPS } from "../local-storage/constants";
import { MINION_URL } from "./constants";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

const { get: getBaseUrl } = createLocalStorageInstance(BASE_URL);
const { get: getHttpOrHttps } = createLocalStorageInstance(HTTP_OR_HTTPS);

export const requestMinionJobStatus = async ({ jobId }) => {
  const endpoint = MINION_URL.replace(":jobid", jobId);
  try {
    const response = await axios({
      method: "get",
      url: `${getHttpOrHttps()}://${getBaseUrl()}${endpoint}`,
      headers: {
        ...getAuthorizationHeader(),
      },
    });

    const { state, task, error } = response?.data ?? {};
    return {
      state,
      task,
      error,
    };
  } catch (err) {
    console.log(
      `Something went wrong while trying to get the job status: ${err}`
    );
    return {
      state: "",
      task: "",
      error: err,
    };
  }
};

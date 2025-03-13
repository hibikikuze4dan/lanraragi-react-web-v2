import axios from "axios";
import { createLocalStorageInstance } from "../local-storage";
import { BASE_URL, HTTP_OR_HTTPS } from "../local-storage/constants";
import { DATABASE_STATS } from "./constants";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

const { get: getBaseUrl } = createLocalStorageInstance(BASE_URL);
const { get: getHttpOrHttps } = createLocalStorageInstance(HTTP_OR_HTTPS);

export const requestDatabaseStatistics = async (minWeight) => {
  const minWeightParameter = minWeight ? `?minweight=${minWeight}` : "";
  const endpoint = `${DATABASE_STATS}${minWeightParameter}`;

  try {
    const response = await axios({
      method: "get",
      url: `${getHttpOrHttps()}://${getBaseUrl()}${endpoint}`,
      headers: {
        ...getAuthorizationHeader(),
      },
    });

    const stats = [...(response?.data ?? [])];

    return stats;
  } catch (err) {
    console.log(
      `Something went wrong while trying to get the stats of the database: ${err}`
    );

    return [];
  }
};

export default requestDatabaseStatistics;

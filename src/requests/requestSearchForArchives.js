import axios from "axios";
import { createLocalStorageInstance } from "../local-storage";
import { BASE_URL, HTTP_OR_HTTPS } from "../local-storage/constants";
import { SEARCH_URL } from "./constants";
import { SEARCH_PARAMETER_DEFAULTS } from "../constants";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

const { get: getBaseUrl } = createLocalStorageInstance(BASE_URL);
const { get: getHttpOrHttps } = createLocalStorageInstance(HTTP_OR_HTTPS);

export const requestSearchForArchives = async ({
  category = "",
  filter = "",
  start = "0",
  sortby = "date_added",
  order = "desc",
  newonly,
  untaggedonly,
  groupby_tanks = true,
} = SEARCH_PARAMETER_DEFAULTS) => {
  const endpoint = SEARCH_URL;
  try {
    const response = await axios({
      method: "get",
      url: `${getHttpOrHttps()}://${getBaseUrl()}${endpoint}`,
      params: {
        filter,
        start,
        sortby,
        order,
        groupby_tanks,
        ...(untaggedonly !== undefined ? { untaggedonly } : {}),
        ...(newonly !== undefined ? { newonly } : {}),
        ...(category ? { category } : {}),
      },
      headers: {
        ...getAuthorizationHeader(),
      },
    });

    const { data, draw, recordsFiltered, recordsTotal } = response?.data ?? {};
    return {
      data,
      draw,
      recordsFiltered,
      recordsTotal,
    };
  } catch (err) {
    console.log(
      `Something went wrong while trying to perform a search: ${err}`
    );
    return {
      data: [],
      draw: 0,
      recordsFiltered: 0,
      recordsTotal: 0,
    };
  }
};

export default requestSearchForArchives;

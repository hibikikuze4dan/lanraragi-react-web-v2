import axios from "axios";
import { createLocalStorageInstance } from "../local-storage";
import {
  BASE_URL,
  FORCE_NO_FUN_MODE,
  HTTP_OR_HTTPS,
} from "../local-storage/constants";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";
import { SERVER_INFO_URL } from "./constants";

const { get: getBaseUrl } = createLocalStorageInstance(BASE_URL);
const { get: getHttpOrHttps } = createLocalStorageInstance(HTTP_OR_HTTPS);
const { get: getForceNoFunMode } =
  createLocalStorageInstance(FORCE_NO_FUN_MODE);

export const requestServerInformation = async () => {
  const endpoint = SERVER_INFO_URL;

  try {
    const response = await axios({
      method: "get",
      url: `${getHttpOrHttps()}://${getBaseUrl()}${endpoint}`,
      headers: {
        ...getAuthorizationHeader(),
      },
    });

    const {
      archives_per_page,
      cache_last_cleared,
      debug_mode,
      has_password,
      motd,
      name,
      nofun_mode,
      server_resizes_images,
      server_tracks_progress,
      total_archives,
      total_pages_read,
      version,
      version_desc,
      version_name,
    } = response?.data ?? {};

    return {
      archives_per_page,
      cache_last_cleared,
      debug_mode,
      has_password,
      motd,
      name,
      nofun_mode: nofun_mode || getForceNoFunMode() === "true",
      server_resizes_images,
      server_tracks_progress,
      total_archives,
      total_pages_read,
      version,
      version_desc,
      version_name,
    };
  } catch (err) {
    console.log(
      `Something went wrong while trying to get the thumbnail for the archive: ${err}`
    );

    return {};
  }
};

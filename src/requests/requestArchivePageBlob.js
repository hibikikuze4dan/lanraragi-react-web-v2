import axios from "axios";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

export const requestArchivePageBlob = async (url) => {
  if (!url) {
    return "";
  }

  try {
    const response = await axios({
      method: "get",
      url,
      headers: {
        ...getAuthorizationHeader(),
      },
      responseType: "blob",
    });

    const blob = response?.data ?? "";

    return URL.createObjectURL(blob);
  } catch (err) {
    console.log(
      `Something went wrong while trying to get the page blob: ${err}`
    );

    return "";
  }
};

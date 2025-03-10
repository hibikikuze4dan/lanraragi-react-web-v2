import { Button } from "@mui/material";
import {
  DATE_ADDED_NAMESPACE,
  GENERAL_TAG_TYPE,
  SEARCH,
  SEARCH_PARAMETER_DEFAULTS,
} from "../../../../constants";
import dayjs from "dayjs";
import { isValidUrl } from "../../../../utils/isValidUrl";

export const TagButton = ({
  tag,
  namespace,
  handleNewSearch,
  updateAppPage,
  handleUpdateSearchParameters,
  closeDialog,
}) => {
  const isTagAUrl = isValidUrl(tag);
  const dateTag =
    namespace === DATE_ADDED_NAMESPACE
      ? dayjs.unix(tag).format("MMMM DD YYYY HH:mm")
      : "";

  const onClick = () => {
    const newSearchFilter = [GENERAL_TAG_TYPE].includes(namespace)
      ? tag
      : `${namespace}:${tag}`;

    const newSearchParameters = {
      ...SEARCH_PARAMETER_DEFAULTS,
      filter: newSearchFilter,
    };

    handleUpdateSearchParameters(newSearchParameters);
    handleNewSearch(newSearchParameters);
    closeDialog();
    updateAppPage(SEARCH);
  };

  return (
    <Button
      className="normal-case block overflow-ellipsis w-full h-full overflow-hidden"
      fullWidth
      variant="outlined"
      onClick={onClick}
      {...(isTagAUrl
        ? {
            href: tag,
            target: "_blank",
            rel: "noopener noreferrer",
            onClick: null,
          }
        : {})}
    >
      {dateTag || tag}
    </Button>
  );
};

export const RANDOM = "random";

export const SEARCH = "search";

export const HISTORY = "history";

export const SETTINGS = "settings";

export const IMAGES = "images";

export const BASIC_PAGES = [RANDOM, SEARCH, HISTORY, SETTINGS];

export const ALL_PAGES = [RANDOM, SEARCH, HISTORY, SETTINGS, IMAGES];

export const VIEW_ARCHIVE_INFO = "view_archive_info";

export const UPDATE_ARCHIVE_METADATA = "update_archvive_metadata";

export const UPDATE_ARCHIVE_CATEGORY = "update_archive_category";

export const DELETE_ARCHIVE = "delete_archive";

export const REGENERATE_ARCHIVE_THUMBNAIL = "regenerate_archive_thumbnail";

export const USE_PLUGIN_ON_ARCHIVE = "use_plugin_on_archive";

export const MORE_ARCHIVE_ACTIONS = [
  VIEW_ARCHIVE_INFO,
  UPDATE_ARCHIVE_METADATA,
  UPDATE_ARCHIVE_CATEGORY,
  REGENERATE_ARCHIVE_THUMBNAIL,
  DELETE_ARCHIVE,
];

export const RATING = "Rating";

export const SCORE = "Score";

export const STARS = "Stars";

export const RATING_NAMESPACES = [RATING, SCORE, STARS];

export const COLON_FOLLOWED_BY_NUMBER_REGEX = /:\s*\d*\.?\d+/g;

export const NAMESPACE_REGEX = {
  [RATING]: /[Rr]ating:\s*\d*\.?\d+/g,
  [SCORE]: /[Ss]core:\s*\d*\.?\d+/g,
  [STARS]: /[Ss]tars:\s*\d*\.?\d+/g,
};

export const NAMESPACE_REGEX_WITH_COMMA = {
  [RATING]: /[Rr]ating:\s*\d*\.?\d+,?/g,
  [SCORE]: /[Ss]core:\s*\d*\.?\d+,?/g,
  [STARS]: /[Ss]tars:\s*\d*\.?\d+,?/g,
};

export const SEARCH_PARAMETER_DEFAULTS = {
  category: "",
  filter: "",
  start: "0",
  sortby: "date_added",
  order: "desc",
  newonly: undefined,
  untaggedonly: undefined,
  groupby_tanks: true,
};

export const TOP_OF_PAGE_ID = "top-of-non-url-page";

export const SNACKBAR_DEFAULT_STATUS = {
  severity: "info",
  message: "",
};

export const GENERAL_TAG_TYPE = "other/misc";

export const DATE_ADDED_NAMESPACE = "date_added";

export const TAGS = "tags";
export const TITLE = "title";
export const SUMMARY = "summary";

export const BUTTON_INHERIT_BACKGROUND = {
  "button:not(:hover)": {
    backgroundColor: "inherit",
  },
};

export const UNDERSCORE_REGEX = /_/g;

export const SINGLE_PAGE_VIEW_MODE = "single_page";

export const SCROLLING_PAGE_VIEW_MODE = "infinite_scroll";

export const VIEW_MODES_FOR_ARCHIVE_IMAGES = [
  SINGLE_PAGE_VIEW_MODE,
  SCROLLING_PAGE_VIEW_MODE,
];

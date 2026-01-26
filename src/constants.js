import Casino from "@mui/icons-material/Casino";
import Search from "@mui/icons-material/Search";
import History from "@mui/icons-material/History";
import Settings from "@mui/icons-material/Settings";

export const RANDOM = "random";

export const SEARCH = "search";

export const HISTORY = "history";

export const SETTINGS = "settings";

export const IMAGES = "images";

export const BASIC_PAGES = [RANDOM, SEARCH, HISTORY, SETTINGS];

export const ALL_PAGES = [RANDOM, SEARCH, HISTORY, SETTINGS, IMAGES];

export const PAGE_ICONS = {
  [RANDOM]: Casino,
  [SEARCH]: Search,
  [HISTORY]: History,
  [SETTINGS]: Settings,
};

export const TEMP_VIEW_MODE_DIALOG = "temp_view_mode_dialog";

export const VIEW_ARCHIVE_INFO = "view_archive_info";

export const UPDATE_ARCHIVE_METADATA = "update_archvive_metadata";

export const UPDATE_ARCHIVE_CATEGORY = "update_archive_category";

export const RATE_ARCHIVE = "rate_archive";

export const UPDATE_ARCHIVE_RATING = "update_archive_rating";

export const DELETE_ARCHIVE = "delete_archive";

export const REGENERATE_ARCHIVE_THUMBNAIL = "regenerate_archive_thumbnail";

export const USE_PLUGIN_ON_ARCHIVE = "use_plugin_on_archive";

export const MORE_ARCHIVE_ACTIONS = [
  VIEW_ARCHIVE_INFO,
  UPDATE_ARCHIVE_METADATA,
  UPDATE_ARCHIVE_CATEGORY,
  UPDATE_ARCHIVE_RATING,
  REGENERATE_ARCHIVE_THUMBNAIL,
  DELETE_ARCHIVE,
];

export const RATING = "rating";

export const SCORE = "score";

export const STARS = "stars";

export const LANRARAGI_STARS_ARRAY = [
  "Remove Rating",
  "⭐",
  "⭐⭐",
  "⭐⭐⭐",
  "⭐⭐⭐⭐",
  "⭐⭐⭐⭐⭐",
];

export const RATING_NAMESPACES = [RATING, SCORE, STARS];

export const COLON_FOLLOWED_BY_NUMBER_REGEX = /:\s*\d*\.?\d+/g;

export const NAMESPACE_REGEX = {
  [RATING]: /[Rr]ating:\s*⭐+/g,
  [SCORE]: /[Ss]core:\s*⭐+/g,
  [STARS]: /[Ss]tars:\s*⭐+/g,
};

export const NAMESPACE_REGEX_WITH_COMMA = {
  [RATING]: /[Rr]ating:\s*⭐+,?/g,
  [SCORE]: /[Ss]core:\s*⭐+,?/g,
  [STARS]: /[Ss]tars:\s*⭐+,?/g,
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

export const ALWAYS_ASK = "always_ask";

export const VIEW_MODES_FOR_ALWAYS_ASK_DIALOG = [
  SINGLE_PAGE_VIEW_MODE,
  SCROLLING_PAGE_VIEW_MODE,
];

export const VIEW_MODES_FOR_ARCHIVE_IMAGES = [
  SINGLE_PAGE_VIEW_MODE,
  SCROLLING_PAGE_VIEW_MODE,
  ALWAYS_ASK,
];

export const READING_DIRECTIONS = {
  LEFT_TO_RIGHT: "LEFT_TO_RIGHT",
  RIGHT_TO_LEFT: "RIGHT_TO_LEFT",
};

export const IMAGES_PAGE_ID = "images-page";

export const SCROLL_IMAGES_START_ID = "images-start";

export const RETURN_NULL = () => null;

export const ARROW_LEFT = "ArrowLeft";

export const ARROW_RIGHT = "ArrowRight";

export const ARROW_UP = "ArrowUp";

export const ARROW_DOWN = "ArrowDown";

export const ENTER = "Enter";

export const SPACE = "Space";

export const KEYBOARD_KEY_CODES = {
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_UP,
  ARROW_DOWN,
  ENTER,
  SPACE,
};

export const COMPONENT_IDS = {
  ARCHIVE_ACTIONS_DIALOG_CLOSE_BUTTON: "archive-actions-dialog-close-button",
  END_OF_ARCHIVE_BUTTON_CATEGORIZE: "end-of-archive-button-categorize",
  END_OF_ARCHIVE_BUTTON_RATE: "end-of-archive-button-rate",
  END_OF_ARCHIVE_BUTTON_LAST_IMAGE: "end-of-archive-button-last-image",
  END_OF_ARCHIVE_BUTTON_ARCHIVES: "end-of-archive-button-archives",
  END_OF_ARCHIVE_BUTTON_PREVIOUS: "end-of-archive-button-previous",
  END_OF_ARCHIVE_BUTTON_NEXT: "end-of-archive-button-next",
  LOADED_CHILDREN_WRAPPER: "loaded-children-wrapper",
  TITLE_BUTTON: (archiveId = "") => `arcive-card-title-button-${archiveId}`,
  RANDOM_PAGE: "random-page",
  SEARCH_PAGE: "search-page",
  IMAGES_PAGE: IMAGES_PAGE_ID,
  HISTORY_PAGE: "history-page",
  PAGES_CONTAINER: "pages-container",
};

export const PAGE_IDS = {
  [RANDOM]: COMPONENT_IDS.RANDOM_PAGE,
  [SEARCH]: COMPONENT_IDS.SEARCH_PAGE,
  [HISTORY]: COMPONENT_IDS.HISTORY_PAGE,
  [IMAGES]: COMPONENT_IDS.IMAGES_PAGE,
};

export const COMPONENT_CLASSNAMES = {
  ARCHIVE_CARD_ACTIONS_BUTTON: "archive-card-actions-button-classname",
  ARCHIVE_CARD_READ_BUTTON: "archive-card-read-button-classname",
  ARCHIVE_CARD_TITLE_BUTTON: "archive-card-title-button",
  IMAGE_BUTTON_CLASSNAME: "image-page-image-button",
  END_OF_ARCHIVE_BUTTON: "end-of-archive-button",
  MORE_ARCHIVES_BUTTON: "more-archives-button",
};

export const TARGETED_BUTTON_CLASSNAMES_FOR_ARCHIVE_CARD_ARROW_KEY_NAVIGATION =
  [
    COMPONENT_CLASSNAMES.ARCHIVE_CARD_ACTIONS_BUTTON,
    COMPONENT_CLASSNAMES.ARCHIVE_CARD_READ_BUTTON,
    COMPONENT_CLASSNAMES.ARCHIVE_CARD_TITLE_BUTTON,
    COMPONENT_CLASSNAMES.MORE_ARCHIVES_BUTTON,
  ];

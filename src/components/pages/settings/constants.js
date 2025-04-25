import { BaseUrlSetter } from "../../base-url-setter";
import { ArchivesRenderedSetting } from "./archives-rendered-setting";
import { BearerTokenSetting } from "./bearer-token-setting";
import { ColumnsDisplayedSetting } from "./columns-displayed-setting";
import { DeleteSearchCacheButton } from "./delete-search-cache-button";
import { ImagesViewMode } from "./images-view-mode";
import { RatingNamespaceSetting } from "./rating-namespace-setting";
import { ForceNoFunMode } from "./force-no-fun-mode";

export const SETTINGS_TO_DISPLAY = [
  {
    title: "Base Url",
    description: "Refresh the page for changes to take effect",
    component: BaseUrlSetter,
  },
  {
    title: "Bearer Token",
    description:
      "Basse64 encoded LANraragi API key used for authenticating requests to endpoints requiring such.",
    component: BearerTokenSetting,
  },
  {
    title: "Columns",
    description: "The number of columns",
    component: ColumnsDisplayedSetting,
  },
  {
    title: "Archives Displayed at Once",
    description:
      "The amount of archives displayed on the random and search results page.",
    component: ArchivesRenderedSetting,
  },
  {
    title: "Images View Mode",
    description:
      "Determines the way archive images are displayed when reading an archive.",
    component: ImagesViewMode,
  },
  {
    title: "Rating Namespace",
    description:
      "The namsespace that archive ratings are saved with (Ex: Rating:4.5)",
    component: RatingNamespaceSetting,
  },
  {
    title: "Force No Fun Mode",
    description:
      "Force No Fun Mode behavior for the application. Determines how images are accessed from the Lanraragi API.",
    component: ForceNoFunMode,
  },
  {
    title: "Reset Search Cache",
    component: DeleteSearchCacheButton,
    description:
      "Delete the search cache for LANraragi. Potentially helpful if you are having trouble with search data.",
  },
];

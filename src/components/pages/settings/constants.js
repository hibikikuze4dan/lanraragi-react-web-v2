import { BaseUrlSetter } from "../../base-url-setter";
import { ArchivesRenderedSetting } from "./archives-rendered-setting";
import { BearerTokenSetting } from "./bearer-token-setting";
import { ColumnsDisplayedSetting } from "./columns-displayed-setting";
import { RatingNamespaceSetting } from "./rating-namespace-setting";

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
    title: "Rating Namespace",
    description:
      "The namsespace that archive ratings are saved with (Ex: Rating:4.5)",
    component: RatingNamespaceSetting,
  },
];

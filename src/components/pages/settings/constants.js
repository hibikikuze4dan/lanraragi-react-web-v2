import { BaseUrlSetter } from "../../base-url-setter";
import { ArchivesRenderedSetting } from "./archives-rendered-setting";
import { ColumnsDisplayedSetting } from "./columns-displayed-setting";
import { RatingNamespaceSetting } from "./rating-namespace-setting";

export const SETTINGS_TO_DISPLAY = [
  {
    title: "Base Url",
    description: "Refresh the page for changes to take effect",
    component: BaseUrlSetter,
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

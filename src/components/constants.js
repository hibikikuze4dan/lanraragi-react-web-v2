import Info from "@mui/icons-material/Info";
import Tag from "@mui/icons-material/Tag";
import Label from "@mui/icons-material/Label";
import Image from "@mui/icons-material/Image";
import Delete from "@mui/icons-material/Delete";

import {
  DELETE_ARCHIVE,
  REGENERATE_ARCHIVE_THUMBNAIL,
  UPDATE_ARCHIVE_CATEGORY,
  UPDATE_ARCHIVE_METADATA,
  VIEW_ARCHIVE_INFO,
} from "../constants";

export const ARCHIVE_ACTION_ICONS = {
  [VIEW_ARCHIVE_INFO]: Info,
  [UPDATE_ARCHIVE_METADATA]: Tag,
  [UPDATE_ARCHIVE_CATEGORY]: Label,
  [REGENERATE_ARCHIVE_THUMBNAIL]: Image,
  [DELETE_ARCHIVE]: Delete,
};

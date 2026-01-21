import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  TEMP_VIEW_MODE_DIALOG,
  VIEW_MODES_FOR_ALWAYS_ASK_DIALOG,
} from "../../../constants";
import { useArchiveActionsDialogLogic } from "../../../hooks/useArchiveActionsDialogLogic";
import { Dialog } from "../../dialog";
import { useState } from "react";
import useReadingButtonLogic from "../../../hooks/useReadingButtonLogic";
import useImageViewMode from "../../../hooks/useImageViewMode";
import useCurrentArchive from "../../../hooks/useCurrentArchive";

export const TempViewModeDialog = () => {
  const formLabel = "temp-view-mode-dialog-radio-group-label";
  const [dialogTempViewMode, setDialogTempViewMode] = useState(
    VIEW_MODES_FOR_ALWAYS_ASK_DIALOG[0]
  );
  const { currentArchiveId } = useCurrentArchive();
  const { setActionType, dialogActionType } = useArchiveActionsDialogLogic();
  const { setTempViewMode } = useImageViewMode();
  const { openImagePageAndGetImages } = useReadingButtonLogic();

  const onRadioButtonChange = (_event, value) => {
    setDialogTempViewMode(value);
  };
  const onClose = () => setActionType("");
  const onClick = () => {
    onClose();
    setTempViewMode(dialogTempViewMode);
    openImagePageAndGetImages(currentArchiveId);
  };

  return (
    <Dialog open={dialogActionType === TEMP_VIEW_MODE_DIALOG} onClose={onClose}>
      <Grid2 container>
        <Grid2 size={12}>
          <FormControl className="w-full">
            <FormLabel className="pb-6" id={formLabel}>
              View Mode
            </FormLabel>
            <RadioGroup
              aria-labelledby={formLabel}
              name="temp-view-mode-dialog-radio-group"
              value={dialogTempViewMode}
              onChange={onRadioButtonChange}
            >
              {VIEW_MODES_FOR_ALWAYS_ASK_DIALOG.map((viewMode) => {
                return (
                  <FormControlLabel
                    key={viewMode}
                    className="mb-4"
                    value={viewMode}
                    label={
                      <span className="first-cap">
                        {viewMode.replace(/_/g, " ")}
                      </span>
                    }
                    control={<Radio />}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </Grid2>
        <Grid2 size={12}>
          <Button fullWidth variant="outlined" onClick={onClick}>
            Read
          </Button>
        </Grid2>
      </Grid2>
    </Dialog>
  );
};

export default TempViewModeDialog;

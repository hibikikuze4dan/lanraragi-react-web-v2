import { Radio } from "@mui/material";
import { useLayoutEffect, useRef } from "react";
import { COMPONENT_IDS } from "../../../../constants";

export const TempViewModeDialogRadioButton = ({
  children,
  autoFocus = false,
  viewMode = "",
  ...props
}) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (ref.current && autoFocus) {
      ref?.current?.focus();
    }
  }, [autoFocus]);

  return (
    <Radio
      {...props}
      id={COMPONENT_IDS.TEMP_VIEW_MODE_DIALOG_RADIO(viewMode)}
      autoFocus={autoFocus}
      slotProps={{
        input: {
          ref,
        },
      }}
    >
      {children ?? null}
    </Radio>
  );
};

export default TempViewModeDialogRadioButton;

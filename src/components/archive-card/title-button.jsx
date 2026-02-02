import { Typography } from "@mui/material";
import { Truncate } from "@re-dev/react-truncate";
import { useRef, useState } from "react";
import {
  COMPONENT_CLASSNAMES,
  COMPONENT_IDS,
  KEYBOARD_KEY_CODES,
  TARGETED_BUTTON_CLASSNAMES_FOR_ARCHIVE_CARD_ARROW_KEY_NAVIGATION,
} from "../../constants";
import { focusCardTitleOnArrowKeyDown } from "../../utils/focusCardTitleOnArrowKeyDown";
import moveFocusRelative from "../../utils/moveFocusRelative";
import getElementsByMultipleClassnames from "../../utils/getElementsByMultipleClassnames";

export const TitleButton = ({ archive }) => {
  const ref = useRef();
  const [shouldTuncate, setShouldTruncate] = useState(true);
  const { ENTER, SPACE, ARROW_DOWN, ARROW_UP, ARROW_LEFT, ARROW_RIGHT } =
    KEYBOARD_KEY_CODES;

  const archiveId = archive?.arcid ?? "";

  const onClick = () => {
    console.log(archive);
    setShouldTruncate(!shouldTuncate);
  };

  const onKeyUp = (event) => {
    event.preventDefault();
    const isValidKey = [ENTER, SPACE].includes(event?.code);
    if (isValidKey) {
      onClick();
    }
  };

  const onKeyDown = (event) => {
    const eventCode = event?.code;
    const isSpaceKey = [SPACE].includes(eventCode);
    const isUpDownArrowKeys = [ARROW_DOWN, ARROW_UP].includes(eventCode);
    const isLeftRightArrowKeys = [ARROW_LEFT, ARROW_RIGHT].includes(eventCode);
    if (isSpaceKey) {
      event.preventDefault();
    } else if (isUpDownArrowKeys) {
      event.preventDefault();
      focusCardTitleOnArrowKeyDown({
        arrowKeyDirection: eventCode,
        archiveId: archiveId,
      });
    } else if (isLeftRightArrowKeys) {
      event.preventDefault();
      moveFocusRelative({
        element: event?.target,
        arrowKey: eventCode,
        elementList: getElementsByMultipleClassnames(
          TARGETED_BUTTON_CLASSNAMES_FOR_ARCHIVE_CARD_ARROW_KEY_NAVIGATION,
        ),
      });
    }
  };

  return (
    <Typography
      className={`${COMPONENT_CLASSNAMES.ARCHIVE_CARD_TITLE_BUTTON}`}
      id={`${COMPONENT_IDS.TITLE_BUTTON(archiveId)}`}
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    >
      {shouldTuncate ? (
        <Truncate trimWhitespace lines={3}>
          {archive?.title}
        </Truncate>
      ) : (
        <span>{archive?.title}</span>
      )}
    </Typography>
  );
};

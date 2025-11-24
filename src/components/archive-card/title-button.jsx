import { Typography } from "@mui/material";
import { Truncate } from "@re-dev/react-truncate";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentArchiveId } from "../../redux/selectors";
import {
  COMPONENT_CLASSNAMES,
  COMPONENT_IDS,
  KEYBOARD_KEY_CODES,
  TARGETED_BUTTON_CLASSNAMES_FOR_ARCHIVE_CARD_ARROW_KEY_NAVIGATION,
} from "../../constants";
import { focusCardTitleOnArrowKeyDown } from "../../utils/focusCardTitleOnArrowKeyDown";
import moveFocusRelative from "../../utils/moveFocusRelative";
import getElementsByMultipleClassnames from "../../utils/getElementsByMultipleClassnames";
import { updateFocusFirstArchiveCard } from "../../redux/slices/appSlice";

export const TitleButton = ({ archive, focusTitle = false }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const currentArchiveId = useSelector(getCurrentArchiveId);
  const [shouldTuncate, setShouldTruncate] = useState(true);
  const [attemptedScroll, setAttemptedScroll] = useState(false);
  const { ENTER, SPACE, ARROW_DOWN, ARROW_UP, ARROW_LEFT, ARROW_RIGHT } =
    KEYBOARD_KEY_CODES;

  const archiveId = archive?.arcid ?? "";

  useEffect(() => {
    if ((archiveId === currentArchiveId && !attemptedScroll) || focusTitle) {
      setTimeout(() => {
        ref.current?.focus?.({ preventScroll: true });
        const scrollBlock = focusTitle ? "end" : "center";
        ref.current?.scrollIntoView({ behavior: "smooth", block: scrollBlock });
        dispatch(updateFocusFirstArchiveCard(false));
      }, 500);
    }
    setAttemptedScroll(true);
  }, [archiveId, currentArchiveId, attemptedScroll, focusTitle, dispatch]);

  const onClick = () => {
    setShouldTruncate(!shouldTuncate);
  };

  const onKeyUp = (event) => {
    event.preventDefault();
    const isValidKey = [ENTER, SPACE].includes(event?.code);
    if (isValidKey) {
      onClick();
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
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
          TARGETED_BUTTON_CLASSNAMES_FOR_ARCHIVE_CARD_ARROW_KEY_NAVIGATION
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
      <Truncate trimWhitespace lines={shouldTuncate ? 3 : 100}>
        {archive?.title}
      </Truncate>
    </Typography>
  );
};

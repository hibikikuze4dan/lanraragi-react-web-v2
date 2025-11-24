import {
  COMPONENT_CLASSNAMES,
  COMPONENT_IDS,
  KEYBOARD_KEY_CODES,
} from "../constants";
import { getWrappedArrayIndex } from "./getWrappedArrayIndex";

export const focusCardTitleOnArrowKeyDown = ({
  arrowKeyDirection = "",
  archiveId = "",
}) => {
  if (!archiveId || !arrowKeyDirection) {
    return;
  }

  const targetId = COMPONENT_IDS.TITLE_BUTTON(archiveId);
  const titleButtons = Array.from(
    document.getElementsByClassName(
      COMPONENT_CLASSNAMES.ARCHIVE_CARD_TITLE_BUTTON
    )
  );
  const currentTitleButtonIndex = titleButtons.findIndex(
    (button) => button?.id === `${targetId}`
  );

  if (currentTitleButtonIndex === -1) return;

  if (KEYBOARD_KEY_CODES.ARROW_DOWN === arrowKeyDirection) {
    const nextTitleButtonIndex = getWrappedArrayIndex(
      titleButtons,
      currentTitleButtonIndex + 1
    );
    const nextTitleButton = titleButtons[nextTitleButtonIndex];
    nextTitleButton?.focus();
  } else if (KEYBOARD_KEY_CODES.ARROW_UP === arrowKeyDirection) {
    const previousTitleButtonIndex = getWrappedArrayIndex(
      titleButtons,
      currentTitleButtonIndex + -1
    );
    const previousTitleButton = titleButtons[previousTitleButtonIndex];
    previousTitleButton?.focus();
  }

  return;
};

export default focusCardTitleOnArrowKeyDown;

import { Typography } from "@mui/material";
import { Truncate } from "@re-dev/react-truncate";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentArchiveId } from "../../redux/selectors";
import { KEYBOARD_KEY_CODES } from "../../constants";

export const TitleButton = ({ archive }) => {
  const ref = useRef();
  const currentArchiveId = useSelector(getCurrentArchiveId);
  const [shouldTuncate, setShouldTruncate] = useState(true);
  const [attemptedScroll, setAttemptedScroll] = useState(false);
  const { ENTER, SPACE } = KEYBOARD_KEY_CODES;

  const archiveId = archive?.arcid ?? "";

  useEffect(() => {
    if (archiveId === currentArchiveId && !attemptedScroll) {
      setTimeout(() => {
        ref.current?.focus?.({ preventScroll: true });
        ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 500);
    }
    setAttemptedScroll(true);
  }, [archiveId, currentArchiveId, attemptedScroll]);

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
    const isValidKey = [SPACE].includes(event?.code);
    if (isValidKey) {
      event.preventDefault();
    }
  };

  return (
    <Typography
      id={`arcive-card-title-button-${archiveId}`}
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

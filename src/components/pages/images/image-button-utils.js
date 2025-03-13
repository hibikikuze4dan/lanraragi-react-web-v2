export const scrollToTargetImage = ({
  imagesScrollTarget,
  topOfImagesSectionRef,
}) => {
  try {
    if (!imagesScrollTarget) {
      topOfImagesSectionRef?.current?.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    } else {
      document
        .querySelector(imagesScrollTarget)
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    }
  } catch (err) {
    console.log(
      `Something went wrong while trying to scroll to image page element: ${err}`
    );
    return;
  }
};

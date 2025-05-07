export const ImageOverlayButtons = ({
  previousImage,
  nextImage,
  onFloatingButtonKeyDown,
  centerFloatingButtonId,
  onCenterClick,
}) => {
  return (
    <>
      <button
        onClick={previousImage}
        className="absolute left-0 top-0 h-full w-1/3 cursor-pointer z-10 bg-transparent border-none"
        onKeyDown={onFloatingButtonKeyDown}
        tabIndex={-1}
      />
      <button
        id={centerFloatingButtonId}
        onClick={onCenterClick}
        className="absolute top-0 left-1/3 h-full w-1/3 cursor-pointer z-10 bg-transparent border-none outline-none"
        onKeyDown={onFloatingButtonKeyDown}
      />
      <button
        onClick={nextImage}
        className="absolute right-0 top-0 h-full w-1/3 cursor-pointer z-10 bg-transparent border-none"
        onKeyDown={onFloatingButtonKeyDown}
        tabIndex={-1}
      />
    </>
  );
};

export default ImageOverlayButtons;

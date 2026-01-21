import { useState } from "react";
import createLocalStorageInstance, { IMAGES_VIEW_MODE } from "../local-storage";
import { ALWAYS_ASK, VIEW_MODES_FOR_ARCHIVE_IMAGES } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { getTempViewMode } from "../redux/selectors";
import { updateTempViewMode } from "../redux/slices/appSlice";

const { get: getImagesViewMode, set: setImagesViewMode } =
  createLocalStorageInstance(IMAGES_VIEW_MODE);

export const useImageViewMode = () => {
  const dispatch = useDispatch();
  const [imageViewMode, setImageViewModeState] = useState(
    getImagesViewMode() ?? VIEW_MODES_FOR_ARCHIVE_IMAGES[1]
  );
  const isViewModeAlwaysAsk = getImagesViewMode() === ALWAYS_ASK;
  const tempViewMode = useSelector(getTempViewMode);

  const setTempViewMode = (newViewMode) => {
    dispatch(updateTempViewMode(newViewMode));
  };

  const updateImagesViewMode = (newViewMode) => {
    setImageViewModeState(newViewMode);
    setImagesViewMode(newViewMode);
  };

  return {
    imageViewMode,
    isViewModeAlwaysAsk,
    setTempViewMode,
    tempViewMode,
    updateImagesViewMode,
  };
};

export default useImageViewMode;

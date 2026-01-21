import { useCallback, useMemo, useState } from "react";
import { createLocalStorageInstance } from "../local-storage";
import { ARCHIVE_HISTORY, USE_API_HISTORY } from "../local-storage/constants";
import requestSearchForArchives from "../requests/requestSearchForArchives";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../redux/selectors";
import { updateHistory } from "../redux/slices/appSlice";

const { get: getArchiveHistory, set: setArchiveHistory } =
  createLocalStorageInstance(ARCHIVE_HISTORY);
const { get: getUseApiHistory } = createLocalStorageInstance(USE_API_HISTORY);

const defaultHistory = JSON.stringify([]);

export const useArchiveHistory = () => {
  const dispatch = useDispatch();
  const history = useSelector(getHistory);
  const [performedHistorySearch, setPerformedHistorySearch] = useState(false);
  const useApiHistory = getUseApiHistory() === "true";

  const clearHistoryState = useCallback(() => {
    dispatch(updateHistory([]));
  }, [dispatch]);

  const addArchiveToHistory = useCallback((archive) => {
    try {
      if (!archive || Object.keys(archive ?? {}).length < 1) {
        return;
      }
      const localStorageArchiveHistory = getArchiveHistory();
      const historyString = localStorageArchiveHistory ?? defaultHistory;
      const parsedHistory = JSON.parse(historyString);

      if (!Array.isArray(parsedHistory)) {
        return null;
      }

      const newHistory =
        parsedHistory?.length === 20
          ? [...parsedHistory.slice(1, 20), archive]
          : [...parsedHistory, archive];

      const newHistoryStringified = JSON.stringify(newHistory);

      setArchiveHistory(newHistoryStringified);
      updateHistory(newHistory);

      return null;
    } catch {
      return null;
    }
  }, []);

  const archiveHistoryAsString = useMemo(
    () => JSON.stringify(history),
    [history]
  );

  const refreshHistory = useCallback(() => {
    if (useApiHistory) {
      setPerformedHistorySearch(true);
      requestSearchForArchives({ sortby: "lastread", order: "asc" }).then(
        (response) => {
          dispatch(updateHistory(response?.data?.slice?.(0, 20) ?? []));
        }
      );
    } else if (!useApiHistory) {
      const localStorageArchiveHistory = JSON.parse(
        getArchiveHistory() ?? defaultHistory
      );
      setPerformedHistorySearch(true);
      dispatch(updateHistory(localStorageArchiveHistory));
    }
  }, [dispatch, useApiHistory]);

  return {
    addArchiveToHistory,
    clearHistoryState,
    archiveHistoryAsString,
    getArchiveHistory,
    history,
    performedHistorySearch,
    refreshHistory,
    useApiHistory,
  };
};

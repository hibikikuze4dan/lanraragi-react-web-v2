import { useCallback, useEffect, useMemo, useState } from "react";
import { createLocalStorageInstance } from "../local-storage";
import { ARCHIVE_HISTORY, USE_API_HISTORY } from "../local-storage/constants";
import requestSearchForArchives from "../requests/requestSearchForArchives";
import useAppPages from "./useAppPages";
import { HISTORY } from "../constants";
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
  const { appPage } = useAppPages();
  const [archiveHistory, setArchiveHistoryState] = useState(
    getArchiveHistory() ?? defaultHistory
  );
  const [performedHistorySearch, setPerformedHistorySearch] = useState(false);
  const useApiHistory = getUseApiHistory() === "true";
  const currentlyOnHistoryPage = appPage === HISTORY;

  const clearHistoryState = useCallback(() => {
    dispatch(updateHistory([]));
  }, [dispatch]);

  const makeHistorySearch = useCallback(() => {
    setPerformedHistorySearch(true);
    requestSearchForArchives({ sortby: "lastread", order: "asc" }).then(
      (response) => {
        console.log(response, response?.data?.slice?.(0, 20));
        dispatch(updateHistory(response?.data?.slice?.(0, 20) ?? []));
      }
    );
  }, [dispatch]);

  const addArchiveToHistory = (archive) => {
    try {
      if (!archive || Object.keys(archive).length < 1) {
        return;
      }
      const historyString = getArchiveHistory() ?? defaultHistory;
      const history = JSON.parse(historyString);

      if (!Array.isArray(history)) {
        return null;
      }

      const newHistory =
        history.length === 20
          ? [...history.slice(1, 20), archive]
          : [...history, archive];

      const newHistoryStringified = JSON.stringify(newHistory);

      setArchiveHistory(newHistoryStringified);
      setArchiveHistoryState(newHistoryStringified);

      return null;
    } catch {
      return null;
    }
  };

  const archiveHistoryAsString = `${archiveHistory}`;
  const archiveHistoryAsJSON = useMemo(
    () => JSON.parse(archiveHistoryAsString),
    [archiveHistoryAsString]
  );

  useEffect(() => {
    if (
      !performedHistorySearch &&
      currentlyOnHistoryPage &&
      useApiHistory &&
      !history.length
    ) {
      makeHistorySearch();
    } else if (
      !useApiHistory &&
      currentlyOnHistoryPage &&
      !performedHistorySearch
    ) {
      setPerformedHistorySearch(true);
      dispatch(updateHistory(archiveHistoryAsJSON));
    }
  }, [
    makeHistorySearch,
    performedHistorySearch,
    useApiHistory,
    archiveHistoryAsJSON,
    currentlyOnHistoryPage,
    history,
    dispatch,
  ]);

  return {
    addArchiveToHistory,
    clearHistoryState,
    archiveHistoryAsJSON,
    archiveHistoryAsString,
    getArchiveHistory,
    history,
    performedHistorySearch,
    useApiHistory,
  };
};

import { useState } from "react";
import { createLocalStorageInstance } from "../local-storage";
import { ARCHIVE_HISTORY } from "../local-storage/constants";

const { get: getArchiveHistory, set: setArchiveHistory } =
  createLocalStorageInstance(ARCHIVE_HISTORY);

const defaultHistory = JSON.stringify([]);

export const useArchiveHistory = () => {
  const [archiveHistory, setArchiveHistoryState] = useState(
    getArchiveHistory() ?? defaultHistory
  );

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
  const archiveHistoryAsJSON = JSON.parse(archiveHistoryAsString);

  return {
    addArchiveToHistory,
    archiveHistoryAsJSON,
    archiveHistoryAsString,
    getArchiveHistory,
  };
};

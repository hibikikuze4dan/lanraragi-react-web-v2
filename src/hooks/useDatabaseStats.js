import { useDispatch, useSelector } from "react-redux";
import { getDatabseStats } from "../redux/selectors";
import { useEffect } from "react";
import requestDatabaseStatistics from "../requests/requestDatabaseStatistics";
import { updateDatabaseStats } from "../redux/slices/appSlice";
import { useMemo } from "react";

export const useDatabaseStats = (initialLoad = false) => {
  const dispatch = useDispatch();
  const databaseStats = useSelector(getDatabseStats);
  const numberOfStats = databaseStats.length;

  const statsAsStrings = useMemo(
    () =>
      databaseStats?.map((stat) => {
        const namespace = `${stat?.namespace ?? ""}`;
        const namespaceWithColon = namespace ? `${namespace}:` : "";
        const text = stat?.text ?? "";
        return `${namespaceWithColon}${text}`;
      }),
    [databaseStats]
  );

  useEffect(() => {
    if (!numberOfStats && initialLoad) {
      requestDatabaseStatistics(5).then((stats) => {
        dispatch(updateDatabaseStats(stats));
      });
    }
  }, [numberOfStats, initialLoad, dispatch]);

  return {
    databaseStats,
    statsAsStrings,
  };
};

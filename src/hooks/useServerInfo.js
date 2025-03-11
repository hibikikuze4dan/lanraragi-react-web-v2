import { useDispatch, useSelector } from "react-redux";
import { getServerInfo } from "../redux/selectors";
import { useEffect } from "react";
import { requestServerInformation } from "../requests/requestServerInformation";
import { updateServerInfo } from "../redux/slices/appSlice";

export const useServerInfo = (loadServerInfo = false) => {
  const dispatch = useDispatch();
  const serverInfo = useSelector(getServerInfo);
  const isServerInfoEmpty = Object.keys(serverInfo).length === 0;

  useEffect(() => {
    if (isServerInfoEmpty && loadServerInfo) {
      requestServerInformation().then((response) => {
        dispatch(updateServerInfo({ ...response }));
      });
    }
  }, [dispatch, isServerInfoEmpty, loadServerInfo]);

  return {
    serverInfo,
  };
};

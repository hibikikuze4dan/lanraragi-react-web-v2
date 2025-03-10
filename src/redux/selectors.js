import { createSelector } from "@reduxjs/toolkit";
import { RANDOM, SEARCH_PARAMETER_DEFAULTS } from "../constants";

export const getReduxState = (state) => state.main;

export const getCurrentPage = createSelector(getReduxState, (state) => {
  return state?.currentPage ?? "";
});

export const getRandomArchives = createSelector(getReduxState, (state) => {
  return state?.randomArchives ?? [];
});

export const getInitialLoadRandom = createSelector(getReduxState, (state) => {
  return !!state?.initialLoadRandom;
});

export const getInitialLoadSearch = createSelector(getReduxState, (state) => {
  return !!state?.initialLoadSearch;
});

export const shouldMakeInitialRandomArchivesRequest = createSelector(
  getRandomArchives,
  getInitialLoadRandom,
  (randomArchives, initialLoadRandom) => {
    return initialLoadRandom === true && randomArchives.length === 0;
  }
);

export const getLoadingRandomArchives = createSelector(
  getReduxState,
  (state) => {
    return !!state?.loadingRandomArchives;
  }
);

export const getArchivePages = createSelector(getReduxState, (state) => {
  return state?.archivePages ?? [];
});

export const getCurrentArchiveId = createSelector(getReduxState, (state) => {
  return state?.currentArchiveId ?? "";
});

export const getDisplayAppBar = createSelector(getReduxState, (state) => {
  return !!(state?.displayAppBar ?? true);
});

export const getImagesScrollTarget = createSelector(getReduxState, (state) => {
  return state?.imagesScrollTarget;
});

export const getApiCategories = createSelector(getReduxState, (state) => {
  return state?.apiCategories ?? [];
});

export const getStaticApiCategories = createSelector(
  getApiCategories,
  (categories) => {
    return categories?.filter((category) => category?.search === "") ?? [];
  }
);

export const getSearchData = createSelector(getReduxState, (state) => {
  return state?.searchData ?? {};
});

export const getSearchArchives = createSelector(getSearchData, (searchData) => {
  return searchData?.data ?? [];
});

export const getLoadingSearchArchives = createSelector(
  getReduxState,
  (state) => {
    return !!state?.loadingSearchArchives;
  }
);

export const getSearchParameters = createSelector(getReduxState, (state) => {
  return state?.searchParameters ?? SEARCH_PARAMETER_DEFAULTS;
});

export const getCurrentSearchParameters = createSelector(
  getReduxState,
  (state) => {
    return state?.currentSearchParameters ?? SEARCH_PARAMETER_DEFAULTS;
  }
);

export const getArchiveOpenedFrom = createSelector(getReduxState, (state) => {
  return state?.archiveOpenedFrom ?? RANDOM;
});

export const getDialogActionType = createSelector(getReduxState, (state) => {
  return state?.dialogActionType ?? "";
});

export const getCurrentArchiveFromRandomArchives = createSelector(
  getCurrentArchiveId,
  getRandomArchives,
  (archiveId, randomArchives) => {
    return randomArchives?.find((archive) => archive?.arcid === archiveId);
  }
);

export const getCurrentArchiveFromSearchArchives = createSelector(
  getCurrentArchiveId,
  getSearchArchives,
  (archiveId, searchArchives) => {
    return searchArchives?.find((archive) => archive?.arcid === archiveId);
  }
);

export const getSnackbarStatus = createSelector(getReduxState, (state) => {
  return state?.snackbarStatus;
});

export const getLastSearch = createSelector(getReduxState, (state) => {
  return state?.lastSearch ?? SEARCH_PARAMETER_DEFAULTS;
});

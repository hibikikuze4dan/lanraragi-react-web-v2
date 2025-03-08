import { createSlice } from "@reduxjs/toolkit";
import {
  SEARCH_PARAMETER_DEFAULTS,
  SNACKBAR_DEFAULT_STATUS,
} from "../../constants";

const initialState = {
  apiCategories: [],
  archiveOpenedFrom: "",
  archivePages: [],
  currentArchiveId: "",
  currentSearchParameters: SEARCH_PARAMETER_DEFAULTS,
  currentPage: "random",
  dialogActionType: "",
  displayAppBar: true,
  imagesScrollTarget: "",
  initialLoadRandom: true,
  initialLoadSearch: true,
  loadingRandomArchives: false,
  loadingSearchArchives: false,
  randomArchives: null,
  searchData: { data: [] },
  searchParameters: SEARCH_PARAMETER_DEFAULTS,
  snackbarStatus: SNACKBAR_DEFAULT_STATUS,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setRandomArchives: (state, action) => {
      return { ...state, randomArchives: [...(action?.payload ?? [])] };
    },
    updateInitialLoadRandom: (state, { payload }) => {
      state.initialLoadRandom = !!payload;
    },
    updateInitialLoadSearch: (state, { payload }) => {
      state.initialLoadSearch = !!payload;
    },
    updateLoadingRandomArchives: (state, { payload }) => {
      state.loadingRandomArchives = !!payload;
    },
    updateCurrentArchiveId: (state, { payload }) => {
      state.currentArchiveId = payload ?? "";
    },
    updateArchivePages: (state, { payload }) => {
      state.archivePages = [...(payload ?? [])];
    },
    updateDisplayAppBar: (state, { payload }) => {
      state.displayAppBar = !!payload;
    },
    updateImagesScrollTarget: (state, { payload }) => {
      state.imagesScrollTarget = payload;
    },
    updateApiCategories: (state, { payload }) => {
      state.apiCategories = [...(payload ?? [])];
    },
    updateSearchData: (state, { payload }) => {
      state.searchData = { ...(state.searchData ?? {}), ...(payload ?? {}) };
    },
    updateSearchArchives: (state, { payload }) => {
      state.searchData.data = [...payload];
    },
    updateLoadingSearchArchives: (state, { payload }) => {
      state.loadingSearchArchives = !!payload;
    },
    updateSearchParameters: (state, { payload }) => {
      state.searchParameters = { ...(payload ?? {}) };
    },
    updateArchiveOpenedFrom: (state, { payload }) => {
      state.archiveOpenedFrom = payload;
    },
    updateCurrentSearchParameters: (state, { payload }) => {
      state.currentSearchParameters = { ...(payload ?? {}) };
    },
    updateDialogActionType: (state, { payload }) => {
      state.dialogActionType = payload;
    },
    updateSnackbarStatus: (state, { payload = {} }) => {
      state.snackbarStatus = { ...SNACKBAR_DEFAULT_STATUS, ...payload };
    },
  },
});

export const {
  updateCurrentPage,
  setRandomArchives,
  updateInitialLoadRandom,
  updateInitialLoadSearch,
  updateLoadingRandomArchives,
  updateCurrentArchiveId,
  updateArchivePages,
  updateDisplayAppBar,
  updateImagesScrollTarget,
  updateApiCategories,
  updateSearchData,
  updateLoadingSearchArchives,
  updateSearchParameters,
  updateArchiveOpenedFrom,
  updateCurrentSearchParameters,
  updateDialogActionType,
  updateSearchArchives,
  updateSnackbarStatus,
} = mainSlice.actions;
export default mainSlice.reducer;

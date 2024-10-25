import { RootState } from "..";
import { IAdminDataItem } from "./types";

export const getAdminData = (state: RootState): IAdminDataItem[] =>
 state.admin.data;

export const getAdminLoading = (state: RootState): boolean =>
 state.admin.isLoading;

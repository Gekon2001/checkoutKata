import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "..";
import {
 setAdminData,
 updateAdminDataItem,
 deleteAdminDataItem as deleteDataItem,
 setLoadingState,
} from "./slice";
import { IAdminDataItem } from "./types";

const FETCH_ADMIN_DATA = "FETCH_ADMIN_DATA";
const UPDATE_ADMIN_DATA_ITEM = "UPDATE_ADMIN_DATA_ITEM";
const DELETE_ADMIN_DATA_ITEM = "DELETE_ADMIN_DATA_ITEM";

const fetchedData: IAdminDataItem[] = [];

export const fetchAdminData = createAsyncThunk<
 void,
 void,
 { state: RootState }
>(FETCH_ADMIN_DATA, async (_, { dispatch }) => {
 try {
  dispatch(setLoadingState(true));
  const response: IAdminDataItem[] = await new Promise((resolve) =>
   setTimeout(() => resolve(fetchedData), 1000)
  );
  dispatch(setAdminData(response));
 } catch (err) {
  console.log(err);
 } finally {
  dispatch(setLoadingState(false));
 }
});

export const postAdminDataItem = createAsyncThunk<
 void,
 IAdminDataItem,
 { state: RootState }
>(UPDATE_ADMIN_DATA_ITEM, async (data, { dispatch }) => {
 try {
  dispatch(setLoadingState(true));
  const response: IAdminDataItem = await new Promise((resolve) =>
   setTimeout(() => resolve(data), 1000)
  );
  dispatch(updateAdminDataItem(response));
 } catch (err) {
  console.log(err);
 } finally {
  dispatch(setLoadingState(false));
 }
});

export const deleteAdminDataItem = createAsyncThunk<
 void,
 string,
 { state: RootState }
>(DELETE_ADMIN_DATA_ITEM, async (id, { dispatch }) => {
 try {
  dispatch(setLoadingState(true));
  const response: string = await new Promise((resolve) =>
   setTimeout(() => resolve(id), 1000)
  );
  dispatch(deleteDataItem(response));
 } catch (err) {
  console.log(err);
 } finally {
  dispatch(setLoadingState(false));
 }
});

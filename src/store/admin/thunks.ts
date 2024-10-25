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

const fetchedData: IAdminDataItem[] = [
 {
  name: "Item 1",
  price: 100,
  specialPrice: { data: { "3": 270, "5": 430 }, name: "3 for 270, 5 for 430" },
  id: "887f1b14-8019-4ee4-86de-630f36d021b7",
 },
 {
  name: "Item 2",
  price: 50,
  specialPrice: { data: null, name: "" },
  id: "700ef8d5-dce3-4a5a-9577-c2dbf5c21997",
 },
 {
  name: "item 3",
  price: 1000,
  specialPrice: {
   data: { "2": 1900, "3": 2800 },
   name: "2 for 1900, 3for2800",
  },
  id: "f56c34ac-d88a-42d5-9b06-9d6b7cdfe8e3",
 },
];

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

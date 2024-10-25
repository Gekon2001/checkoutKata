import { useCallback, useState } from "react";
import { Button, TableCell, TableRow, Text } from "../../styles";
import { deleteAdminDataItem } from "../../../../store/admin/thunks";

import EditAdminItem from "../EditAdminItem";
import { AdminDataItemProps } from "./types";
import { useAppDispatch } from "../../../../store/hooks";

const AdminDataItem = ({ item }: AdminDataItemProps) => {
 const dispatch = useAppDispatch();
 const [editState, setEditState] = useState(false);

 const handleCancelEdit = useCallback(() => {
  setEditState(false);
 }, []);

 const handleEditItem = useCallback(() => {
  setEditState(true);
 }, []);

 const handleDeleteItem = useCallback(() => {
  dispatch(deleteAdminDataItem(item.id));
 }, [dispatch, item.id]);

 return editState ? (
  <EditAdminItem item={item} handleCancel={handleCancelEdit} />
 ) : (
  <TableRow>
   <TableCell>
    <Text>{item.name}</Text>
   </TableCell>
   <TableCell>
    <Text>{item.price}</Text>
   </TableCell>
   <TableCell>
    <Text>{item.specialPrice.name}</Text>
   </TableCell>
   <TableCell $button>
    <Button onClick={handleEditItem}>Edit</Button>
    <Button onClick={handleDeleteItem}>Delete</Button>
   </TableCell>
  </TableRow>
 );
};

export default AdminDataItem;

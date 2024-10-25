import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Header } from "../../components";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getAdminData } from "../../store/admin/selectors";
import { fetchAdminData } from "../../store/admin/thunks";

import {
 AdminContainer,
 Table,
 TableRow,
 TableHeader,
 TableCell,
 Button,
} from "./styles";
import { IAdminDataItem } from "../../store/admin/types";
import { AdminDataItem, EditAdminItem } from "./components";

const Admin = () => {
 const [newItem, setNewItem] = useState<IAdminDataItem | null>(null);
 const adminData = useAppSelector(getAdminData);

 const dispatch = useAppDispatch();

 const handleFetchMockData = useCallback(() => {
  dispatch(fetchAdminData());
 }, [dispatch]);

 const handleCreateNewItem = useCallback(() => {
  setNewItem({
   name: "",
   // if accidentaly set without price will be 99999
   price: 99999,
   specialPrice: {
    data: [],
    name: "",
   },
   id: uuidv4(),
  });
 }, []);

 const clearNewItem = useCallback(() => {
  setNewItem(null);
 }, []);

 return (
  <>
   <Header />
   <AdminContainer>
    <Table>
     <thead>
      <TableRow>
       <TableHeader>Item</TableHeader>
       <TableHeader>Unit Price (pence)</TableHeader>
       <TableHeader>Special Price (pence)</TableHeader>
       <TableHeader></TableHeader>
      </TableRow>
     </thead>
     <tbody>
      {adminData.map((dataItem) => (
       <AdminDataItem key={dataItem.id} item={dataItem} />
      ))}
      {newItem && <EditAdminItem item={newItem} handleCancel={clearNewItem} />}
      <TableRow>
       <TableCell colSpan={4} $small />
      </TableRow>
      <TableRow>
       <TableCell $button colSpan={4}>
        <Button onClick={handleCreateNewItem} $fullSize>
         +
        </Button>
       </TableCell>
      </TableRow>
      <TableRow>
       <TableCell colSpan={4} $small />
      </TableRow>
      <TableRow>
       <TableCell $button colSpan={4}>
        <Button onClick={handleFetchMockData} $fullSize>
         Fetch Mock Data
        </Button>
       </TableCell>
      </TableRow>
      <TableRow>
       <TableCell colSpan={4} $small />
      </TableRow>
     </tbody>
    </Table>
   </AdminContainer>
  </>
 );
};

export default Admin;

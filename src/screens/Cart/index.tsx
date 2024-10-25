import { Header } from "../../components";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getAdminData } from "../../store/admin/selectors";
import { getCartData } from "../../store/cart/selectors";
import { addCartItems, resetCart } from "../../store/cart/slice";

import {
 AdminContainer,
 Button,
 ButtonContainer,
 Table,
 TableRow,
 TableHeader,
 TableCell,
} from "./styles";
import { useCallback, useMemo } from "react";

const Cart = () => {
 const adminData = useAppSelector(getAdminData);
 const cartData = useAppSelector(getCartData);
 const dispatch = useAppDispatch();

 const handleScan = useCallback(() => {
  const itemsAmount = adminData.length;
  const scannedAdminItemIndex = Math.round(Math.random() * (itemsAmount - 1));
  const scannedAdminItem = adminData[scannedAdminItemIndex];
  const { name, id } = scannedAdminItem;
  dispatch(addCartItems({ name, id, quantity: 1 }));
 }, [adminData, dispatch]);

 const handleScanX10 = useCallback(() => {
  for (let i = 0; i < 10; i += 1) {
   handleScan();
  }
 }, [handleScan]);

 const handleReset = useCallback(() => {
  dispatch(resetCart());
 }, [dispatch]);

 const mergedData = useMemo(
  // every time we get data from a server with new prices and rules we recount cart
  () =>
   cartData
    .map((cartItem) => {
     const adminDataItem = adminData.find(({ id }) => id === cartItem.id);
     if (!adminDataItem) return null;

     const sum = cartItem.quantity * adminDataItem.price;
     let quantity = cartItem.quantity;
     let specialSum = null;

     if (adminDataItem.specialPrice.data) {
      specialSum = Object.keys(adminDataItem.specialPrice.data).reduceRight(
       (acc, cur, index) => {
        // as reduceRight - last item will be with index 0
        const isLastItem = !index;
        const curValue = Number(cur);

        if (quantity >= curValue) {
         const specialPriceQuantity = Math.trunc(quantity / curValue);
         quantity -= specialPriceQuantity * curValue;

         if (adminDataItem.specialPrice.data) {
          return (
           acc +
           specialPriceQuantity * adminDataItem.specialPrice.data[curValue] +
           (isLastItem ? quantity * adminDataItem.price : 0)
          );
         }
        }
        return acc + (isLastItem ? quantity * adminDataItem.price : 0);
       },
       0
      );
     }

     if (specialSum === sum) {
      specialSum = null;
     }

     return {
      ...cartItem,
      ...adminDataItem,
      sum,
      specialSum,
      savings: specialSum ? sum - specialSum : "-",
     };
    })
    .filter((v) => v !== null),
  [adminData, cartData]
 );

 return (
  <>
   <Header />
   <AdminContainer>
    <ButtonContainer>
     <Button onClick={handleScan}>Scan</Button>
     <Button onClick={handleScanX10}>Scan 10</Button>
     <Button onClick={handleReset}>Reset Cart</Button>
    </ButtonContainer>

    <Table>
     <thead>
      <TableRow>
       <TableHeader>N</TableHeader>
       <TableHeader>Item</TableHeader>
       <TableHeader>Quantity</TableHeader>
       <TableHeader>Unit Price</TableHeader>
       <TableHeader>Sum</TableHeader>
       <TableHeader>Special Price</TableHeader>
       <TableHeader>Special Sum</TableHeader>
       <TableHeader>Savings</TableHeader>
      </TableRow>
     </thead>
     <tbody>
      {mergedData?.map((cartItem, number) => (
       <TableRow key={cartItem.id}>
        <TableCell>{number + 1}</TableCell>
        <TableCell>{cartItem.name}</TableCell>
        <TableCell>{cartItem.quantity}</TableCell>
        <TableCell>{cartItem.price}</TableCell>
        <TableCell>{cartItem.sum}</TableCell>
        <TableCell>{cartItem.specialPrice.name || "-"}</TableCell>
        <TableCell>{cartItem.specialSum || "-"}</TableCell>
        <TableCell>{cartItem.savings}</TableCell>
       </TableRow>
      ))}
     </tbody>
    </Table>
   </AdminContainer>
  </>
 );
};

export default Cart;

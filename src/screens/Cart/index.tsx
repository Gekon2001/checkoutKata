import { Header } from "../../components";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getAdminData } from "../../store/admin/selectors";
import { getCartData } from "../../store/cart/selectors";
import { addCartItems, resetCart } from "../../store/cart/slice";

const initialSumData = { savings: 0, quantity: 0, sum: 0, finalSum: 0 };

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
  () => {
   const sumData = { ...initialSumData };
   const items = cartData
    .map((cartItem) => {
     const adminDataItem = adminData.find(({ id }) => id === cartItem.id);
     if (!adminDataItem) return null;

     const sum = cartItem.quantity * adminDataItem.price;
     let quantity = cartItem.quantity;
     let finalSum = null;

     if (adminDataItem.specialPrice.data) {
      finalSum = Object.keys(adminDataItem.specialPrice.data).reduceRight(
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
     if (!finalSum) {
      finalSum = sum;
     }
     let savings;
     if (finalSum) {
      savings = sum - finalSum;
      sumData.savings += savings;
     } else {
      savings = "-";
     }

     sumData.quantity += cartItem.quantity;
     sumData.sum += sum;
     sumData.finalSum += finalSum;

     return {
      ...cartItem,
      ...adminDataItem,
      sum,
      finalSum,
      savings,
     };
    })
    .filter((v) => v !== null);
   return { sumData, items };
  },
  [adminData, cartData]
 );

 return (
  <>
   <Header />
   <AdminContainer>
    <ButtonContainer>
     <Button disabled={!adminData.length} onClick={handleScan}>
      Scan
     </Button>
     <Button disabled={!adminData.length} onClick={handleScanX10}>
      Scan 10
     </Button>
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
       <TableHeader>Final Sum</TableHeader>
       <TableHeader>Savings</TableHeader>
      </TableRow>
     </thead>
     <tbody>
      {mergedData.items?.map((cartItem, number) => (
       <TableRow key={cartItem.id}>
        <TableCell>{number + 1}</TableCell>
        <TableCell>{cartItem.name}</TableCell>
        <TableCell>{cartItem.quantity}</TableCell>
        <TableCell>{cartItem.price}</TableCell>
        <TableCell>{cartItem.sum}</TableCell>
        <TableCell>{cartItem.specialPrice.name || "-"}</TableCell>
        <TableCell>{cartItem.finalSum}</TableCell>
        <TableCell>{cartItem.savings}</TableCell>
       </TableRow>
      ))}
     </tbody>
     <tfoot>
      <TableRow $bold>
       <TableCell colSpan={2}>Sum</TableCell>
       <TableCell>{mergedData.sumData.quantity}</TableCell>
       <TableCell>-</TableCell>
       <TableCell>{mergedData.sumData.sum}</TableCell>
       <TableCell>-</TableCell>
       <TableCell>{mergedData.sumData.finalSum}</TableCell>
       <TableCell>{mergedData.sumData.savings}</TableCell>
      </TableRow>
     </tfoot>
    </Table>
   </AdminContainer>
  </>
 );
};

export default Cart;

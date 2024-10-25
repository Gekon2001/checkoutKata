import { useFormik } from "formik";

import { useAppDispatch } from "../../../../store/hooks";
import { postAdminDataItem } from "../../../../store/admin/thunks";

import { Button, TableCell, TableRow } from "../../styles";

import { EditAdminItemProps } from "./types";
import { adminDataItemValidate, formatSpecialPriceToObject } from "./utils";
import { Input } from "./styles";

const EditAdminItem = ({
 item,
 handleSaveItem,
 handleDeleteItem,
}: EditAdminItemProps) => {
 const dispatch = useAppDispatch();
 const formik = useFormik({
  initialValues: {
   name: item.name,
   price: item.price,
   specialPrice: item.specialPrice.name,
  },
  onSubmit: (values) => {
   alert(JSON.stringify(values, null, 2));
  },
  validate: adminDataItemValidate,
  validateOnMount: true,
 });

 const isErrors = Object.values(formik.errors).some((error) => error);
 const saveItem = async () => {
  if (isErrors) {
   console.log("return");
   return;
  }
  const { name, price, specialPrice } = formik.values;
  await dispatch(
   postAdminDataItem({
    ...item,
    name,
    price,
    specialPrice: {
     data: formatSpecialPriceToObject(specialPrice),
     name: specialPrice,
    },
   })
  );
  if (handleSaveItem) {
   handleSaveItem();
  }
 };

 return (
  <TableRow>
   <TableCell>
    <Input
     id="name"
     name="name"
     type="text"
     onChange={formik.handleChange}
     value={formik.values.name}
     $error={Boolean(formik.errors.name)}
    />
   </TableCell>
   <TableCell>
    <Input
     id="price"
     name="price"
     type="number"
     onChange={formik.handleChange}
     value={formik.values.price}
     $error={Boolean(formik.errors.price)}
    />
   </TableCell>
   <TableCell>
    <Input
     id="specialPrice"
     name="specialPrice"
     type="text"
     onChange={formik.handleChange}
     value={formik.values.specialPrice}
     $error={Boolean(formik.errors.specialPrice)}
    />
   </TableCell>
   <TableCell $button>
    <Button disabled={isErrors} onClick={saveItem}>
     Save
    </Button>
    <Button onClick={handleDeleteItem}>Cancel</Button>
   </TableCell>
  </TableRow>
 );
};

export default EditAdminItem;

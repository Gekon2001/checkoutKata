import { FormValues } from "./types";

export const formatSpecialPriceToObject = (specialPrice: string) => {
 if (!specialPrice.trim()) {
  return null;
 }
 const specialPriceArray = specialPrice.split(",");
 return specialPriceArray.reduce((sum, cur) => {
  const value = cur.split("for").map((price) => Number(price.trim()));
  sum[value[0]] = value[1];
  return sum;
 }, {} as Record<number, number>);
};

const regexp = /^(\d+ ?for ?\d+,? ?)+$/;

export const adminDataItemValidate = (values: FormValues) => {
 const errors = {
  name: "",
  price: "",
  specialPrice: "",
 };

 if (!values.name.length) {
  errors.name = "Name is required";
 }

 if (values.price === 0 || values.price > 99999) {
  errors.price = "Price should be more then 0 and less 99999";
 }

 if (values.specialPrice.length) {
  const specialPriceArray = values.specialPrice.split(",");
  if (
   specialPriceArray.some(
    (specialItem) => !specialItem.trim().match(regexp)?.length
   )
  ) {
   errors.specialPrice = "Is not in correct format";
  }
 }

 return errors;
};

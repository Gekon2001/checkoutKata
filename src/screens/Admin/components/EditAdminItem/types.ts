import { IAdminDataItem } from "../../../../store/admin/types";

export interface EditAdminItemProps {
 item: IAdminDataItem;
 handleCancel: () => void;
}

export interface FormValues {
 name: string;
 price: number;
 specialPrice: string;
}

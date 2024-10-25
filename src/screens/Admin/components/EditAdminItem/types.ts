import { IAdminDataItem } from "../../../../store/admin/types";

export interface EditAdminItemProps {
 item: IAdminDataItem;
 handleSaveItem?: () => void;
 handleDeleteItem: () => void;
}

export interface FormValues {
 name: string;
 price: number;
 specialPrice: string;
}

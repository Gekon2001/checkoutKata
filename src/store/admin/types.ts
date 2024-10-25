export interface SpecialPrice {
 name: string;
 data: Record<number, number> | null;
}

export interface IAdminDataItem {
 name: string;
 price: number;
 specialPrice: SpecialPrice;
 id: string;
}

export interface AdminState {
 data: IAdminDataItem[];
 isLoading: boolean;
}

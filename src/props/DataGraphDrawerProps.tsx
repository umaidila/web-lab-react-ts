import { DayInfo } from "../dtos/ProductData";
import { Product } from "../dtos/Products";

export interface DataGraphDrawerProps {
    data: DayInfo[];
    selectedProducts: Product[];
}
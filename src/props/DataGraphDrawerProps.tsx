import { ProductData } from "../dtos/ProductData";
import { Product } from "../dtos/Products";

export interface DataGraphDrawerProps {
    data: ProductData[];
    selectedProducts: Product[];
    isPriceSelected: boolean;
}
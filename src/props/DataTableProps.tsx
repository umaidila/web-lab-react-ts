import { ProductData } from "../dtos/ProductData";
import { Product } from "../dtos/Products";

export interface DataTableProps {
    data: ProductData[];
    selectedProducts: Product[];
    isPriceSelected: boolean;
  }
  
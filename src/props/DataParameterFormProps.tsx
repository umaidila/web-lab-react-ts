import { Product } from "../dtos/Products";

export interface DataParametersFormProps {
    isPriceSelected: boolean;
    setPriceSelected: (value: boolean) => void;
    selectedProducts: Product[];
    setSelectedProducts: (items: Product[]) => void;
  }
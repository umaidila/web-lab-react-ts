import { Product } from "../dtos/Products";

export interface DataParametersFormProps {
  selectedProducts: Product[];
  setSelectedProducts: (items: Product[]) => void;
  selectedMarker: string;
  setSelectedMarker: (value: string) => void;
  groupSelect: string;
  setGroupSelect: (value: string) => void;
  startDate: Date;
  setStartDate: (value: Date) => void;
  endDate: Date;
  setEndDate: (value: Date) => void;
}
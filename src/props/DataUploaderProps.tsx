import { ProductData } from "../dtos/ProductData";

export interface DataUploaderProps {
    onDataLoaded: (data: ProductData[]) => void;
}
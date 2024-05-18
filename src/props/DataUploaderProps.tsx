import { DayInfo } from "../dtos/ProductData";

export interface DataUploaderProps {
    onDataLoaded: (data: DayInfo[]) => void;
}
import { Product } from "./Products";

export class DayInfo {
    constructor(public day: Date, public price: number | null, public volume: number | null) {}
}

export class ProductData {
    constructor(public product: Product, public infoArray: DayInfo[] = []) {}

    addDayInfo(dayInfo: DayInfo) {
        this.infoArray.push(dayInfo);
    }
}
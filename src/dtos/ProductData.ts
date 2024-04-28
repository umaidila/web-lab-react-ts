
// interface DayInfo {
//     day: Date;
//     price: number | null;
//     volume: number | null;
// }

export class DayInfo {
    constructor(public day: Date, public price: number | null, public volume: number | null) {}
}

// interface ProductData {
//     name: string;
//     data: DayInfo[];
// }

export class ProductData {
    constructor(public name: string, public infoArray: DayInfo[] = []) {}

    addDayInfo(dayInfo: DayInfo) {
        this.infoArray.push(dayInfo);
    }
}
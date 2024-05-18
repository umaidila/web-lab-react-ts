export class DayInfo {
    public day: Date;
    public prices: { [productName: string]: number | null };

    constructor(day: Date) {
        this.day = day;
        this.prices = {};
    }

    addPrice(productName: string, price: number | null) {
        this.prices[productName] = price;
    }
}
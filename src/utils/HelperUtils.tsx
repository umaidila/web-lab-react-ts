import * as d3 from 'd3';
import { DayInfo } from '../dtos/ProductData';
import { Product } from '../dtos/Products';

export const groupAndFilterAndSelectValues = (
  globalData: DayInfo[],
  selectedProducts: Product[],
  groupMethod: string,
  selectedMarker: string,
  startDate: Date ,
  endDate: Date
): DayInfo[] => {

  const selectedProductsStrings = selectedProducts.map(product => product.backName);

  const filteredDataByProducts = globalData.map(dayInfo => {
    const prices = Object.keys(dayInfo.prices)
      .filter(product => selectedProductsStrings.includes(product))
      .reduce<{ [key: string]: number | null }>((acc, product) => {
        acc[product] = dayInfo.prices[product];
        return acc;
      }, {});

    return { ...dayInfo, prices };
  }).filter(dayInfo => Object.keys(dayInfo.prices).length > 0);


  let filteredDataByDate =  filteredDataByProducts.filter(dayInfo => {
      return dayInfo.day >= startDate && dayInfo.day <= endDate;})
  

  const groupedData = d3.groups(
    filteredDataByDate,
    dayInfo => {
      switch (groupMethod) {
        case 'week': return d3.timeWeek.floor(dayInfo.day);
        case 'month': return d3.timeMonth.floor(dayInfo.day);
        case 'year': return d3.timeYear.floor(dayInfo.day);
        default: return dayInfo.day;
      }
    }
  );

  const aggregatedData: DayInfo[] = groupedData.map(([key, values]) => {
    let prices: { [key: string]: number | null } = {};
    selectedProductsStrings.forEach(product => {
      let productPrices = values.map(v => v.prices[product]).filter(p => p !== null) as number[];
      let value: number | undefined;
      switch (selectedMarker) {
        case 'min': value = d3.min(productPrices); break;
        case 'mean': value = d3.mean(productPrices); break;
        case 'max': value = d3.max(productPrices); break;
      }
      if (value !== undefined && value !== null) {
        prices[product] = value;
      }
    });

    const dayInfo = new DayInfo(key);
    dayInfo.prices = prices;
    return dayInfo;
  });

  return aggregatedData;
};
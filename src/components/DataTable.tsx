import React, { useState, useMemo } from 'react';
import { ProductData } from '../dtos/ProductData';
import { DataTableProps } from '../props/DataTableProps';


  interface DataRow {
    date: string;
    [key: string]: number | null | string; // так и не понял, зачем оставлять string
  }
  

  const DataTable: React.FC<DataTableProps> = ({ data, selectedProducts, isPriceSelected }) => {
    const [showTable, setShowTable] = useState(false);
  
    const headers = ['Дата'].concat(selectedProducts.map(p => p.frontName));
  
    // Подготовка данных для таблицы
    const tableData = useMemo(() => {
      const rows: DataRow[] = [];
  
      data.forEach(productData => {
        if (selectedProducts.map(p => p.backName).includes(productData.product.backName)) {
          productData.infoArray.forEach(dayInfo => {
            let row = rows.find(r => r.date === dayInfo.day.toLocaleDateString());
            if (!row) {
              row = { date: dayInfo.day.toLocaleDateString() };
              rows.push(row);
            }
            row[productData.product.frontName] = isPriceSelected ? dayInfo.price : dayInfo.volume;
          });
        }
      });
  
      return rows;
    }, [data, selectedProducts, isPriceSelected]);
  
    return (
      <div>
        <button onClick={() => setShowTable(!showTable)}>{showTable ? 'Скрыть таблицу' : 'Показать таблицу'}</button>
        {showTable && (
          <table>
            <thead>
              <tr>
                {headers.map(header => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.date}</td>
                  {headers.slice(1).map(header => (
                    <td key={header}>{row[header]}</td> 
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };
  
  export default DataTable;
  

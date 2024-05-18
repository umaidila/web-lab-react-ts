import React, { useState, useMemo } from 'react';
import { DataTableProps } from '../props/DataTableProps';

interface DataRow {
  date: Date;
  product: string;
  price: number | null;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [showTable, setShowTable] = useState(false);
  const [primarySortKey, setPrimarySortKey] = useState<string | null>(null);
  const [primarySortOrder, setPrimarySortOrder] = useState<boolean>(true);
  const [secondarySortKey, setSecondarySortKey] = useState<string | null>(null);
  const [secondarySortOrder, setSecondarySortOrder] = useState<boolean>(true);

  const headers = ["Дата", "Продукт", "Цена"];

  const compare = (a: DataRow, b: DataRow, key: string, ascending: boolean) => {
    if (key === "дата") {
      const dateA = a.date;
      const dateB = b.date;
      return ascending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else if (key === "цена") {
      const valueA = a.price !== null ? a.price : Number.MIN_VALUE;
      const valueB = b.price !== null ? b.price : Number.MIN_VALUE;
      return ascending ? valueA - valueB : valueB - valueA;
    } else {
      return ascending ? a.product.localeCompare(b.product) : b.product.localeCompare(a.product);
    }
  };

  const tableData = useMemo(() => {
    const rows: DataRow[] = [];
    data.forEach(dayInfo => {
      Object.keys(dayInfo.prices).forEach(product => {
        rows.push({
          date: dayInfo.day,
          product: product,
          price: dayInfo.prices[product]
        });
      });
    });
    return rows;
  }, [data]);


  const sortedTableData = useMemo(() => {
    if (!primarySortKey) return tableData;

    const sortedData = [...tableData].sort((a, b) => {
      const primaryComparison = compare(a, b, primarySortKey, primarySortOrder);
      if (primaryComparison !== 0 || !secondarySortKey) return primaryComparison;

      return compare(a, b, secondarySortKey, secondarySortOrder);
    });

    return sortedData;
  }, [tableData, primarySortKey, primarySortOrder, secondarySortKey, secondarySortOrder]);

  const handleSort = (header: string) => {
    const key = header.toLowerCase();
    if (primarySortKey === key) {
      setPrimarySortOrder(!primarySortOrder);
    } else {
      if (!primarySortKey) {
        setPrimarySortKey(key);
        setPrimarySortOrder(true);
      } else if (!secondarySortKey) {
        setSecondarySortKey(primarySortKey);
        setSecondarySortOrder(primarySortOrder);
        setPrimarySortKey(key);
        setPrimarySortOrder(true);
      } else {
        setSecondarySortKey(primarySortKey);
        setSecondarySortOrder(primarySortOrder);
        setPrimarySortKey(key);
        setPrimarySortOrder(true);
      }
    }
  };



  return (
    <div>
      <button onClick={() => setShowTable(!showTable)}>
        {showTable ? 'Скрыть таблицу' : 'Показать таблицу'}
      </button>
      {showTable && (
        <table>
          <thead>
            <tr>
              {headers.map(header => (
                <th
                  key={header}
                  onClick={() => handleSort(header)}
                  className={
                    primarySortKey === header.toLowerCase()
                      ? primarySortOrder
                        ? "asc"
                        : "desc"
                      : secondarySortKey === header.toLowerCase()
                      ? secondarySortOrder
                        ? "asc2"
                        : "desc2"
                      : ""
                  }
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedTableData.map((row, index) => (
              <tr key={index}>
                <td>{row.date.toLocaleDateString()}</td>
                <td>{row.product}</td>
                <td>{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataTable;
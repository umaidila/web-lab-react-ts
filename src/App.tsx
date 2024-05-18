import React, { useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import DataParametersForm from "./components/DataParametersForm";
import DataUploader from './components/DataUploader';
import { DayInfo } from './dtos/ProductData';
import { Product } from './dtos/Products';
import DataGraphDrawer from './components/DataGraphDrawer';
import DataTable from './components/DataTable';
import { groupAndFilterAndSelectValues } from './utils/HelperUtils';

const App: React.FC = () => {
  const [data, setData] = useState<DayInfo[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [groupSelect, setGroupSelect] = useState<string>("month");
  const [selectedMarker, setSelectedMarker] = useState<string>("mean");
  const [startDate, setStartDate] = useState<Date >(new Date('2019-01-01'));
  const [endDate, setEndDate] = useState<Date >(new Date('2024-08-10'));


  const filteredAndGroupedData: DayInfo[] = useMemo(() => {
    return groupAndFilterAndSelectValues(
      data,
      selectedProducts,
      groupSelect,
      selectedMarker,
      startDate,
      endDate
    );
  }, [data, selectedProducts, groupSelect, selectedMarker, startDate, endDate]);

 

  return (
    <div>
      <h3>Список цен на основные активы</h3>
      <DataUploader onDataLoaded={setData} />
      <DataParametersForm
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        groupSelect={groupSelect}
        setGroupSelect={setGroupSelect}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
        <DataGraphDrawer
        data={filteredAndGroupedData}
        selectedProducts={selectedProducts}
      />
      <DataTable data={filteredAndGroupedData} 
      />
    </div>
  );
};

export default App;
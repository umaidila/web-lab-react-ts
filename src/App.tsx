import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import DataParametersForm from "./components/DataParametersForm";
import DataUploader from './components/DataUploader';
import { ProductData } from './dtos/ProductData';
import { Product } from './dtos/Products';
import DataGraphDrawer from './components/DataGraphDrawer';
import DataTable from './components/DataTable';

function App() {
  const [isPriceSelected, setPriceSelected] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [productsData, setProductsData] = useState<ProductData[]>([]);


  return (<div>
    <DataParametersForm 
      isPriceSelected={isPriceSelected}
      setPriceSelected={setPriceSelected}
      selectedProducts={selectedProducts}
      setSelectedProducts={setSelectedProducts}
    />
    <DataUploader onDataLoaded={setProductsData}/>
    <DataGraphDrawer data={productsData} selectedProducts={selectedProducts} isPriceSelected={isPriceSelected}/>
    <DataTable data={productsData} selectedProducts={selectedProducts} isPriceSelected={isPriceSelected}/>
    </div>
  );
}

export default App;

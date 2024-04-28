import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import DataParametersForm from "./components/DataParametersForm";
import DataUploader from './components/DataUploader';
import { ProductData } from './dtos/ProductData';
import { Product } from './dtos/Products';

function App() {
  const [isPriceSelected, setPriceSelected] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [productsData, setProductsData] = useState<ProductData[]>([]);

  const handleDataLoaded = (data: ProductData[]) => {
    setProductsData(data);
  }



  return (<div>
    <DataParametersForm 
      isPriceSelected={isPriceSelected}
      setPriceSelected={setPriceSelected}
      selectedProducts={selectedProducts}
      setSelectedProducts={setSelectedProducts}
    />
    <DataUploader onDataLoaded={handleDataLoaded}/>

    </div>
  );
}

export default App;

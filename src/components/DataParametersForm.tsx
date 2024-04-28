import React, { useState } from 'react';
import { products } from '../dtos/Products';
import { DataParametersFormProps } from '../props/DataParameterFormProps';



const DataParametersForm: React.FC<DataParametersFormProps> =({ isPriceSelected, setPriceSelected, selectedProducts, setSelectedProducts }) => {
    // const [oy, setOy] = useState('Цена');
    // const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleOyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === 'Цена') {
            setPriceSelected(true);
        } else {
            setPriceSelected(false);
        }
    };

    const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const selectedProduct = products.find(product => product.frontName === value);
        if (!selectedProduct) {
            console.error(`Product with backName ${value} not found`);
            return;
        }
        const newProducts = selectedProducts.includes(selectedProduct)
            ? selectedProducts.filter(product => product !== selectedProduct)
            : [...selectedProducts, selectedProduct];
        setSelectedProducts(newProducts);
    };

    return (
        <div>
            <form>
                <p>Выводимое значение</p>
                <input type="radio" name="oy" value="Цена" checked={ isPriceSelected} onChange={handleOyChange} /> Цена<br />
                <input type="radio" name="oy" value="Объем" checked={!isPriceSelected} onChange={handleOyChange} /> Объем<br />
                <p>Выберите активы</p>
                {products.map((product) => (
                    <div key={product.backName}>
                        <input
                            type="checkbox"
                            name="selectedItems"
                            value={product.frontName}
                            checked={selectedProducts.includes(product)}
                            onChange={handleItemChange}
                        /> {product.frontName}<br />
                    </div>
                ))}
            </form>
        </div>
    );
}

export default DataParametersForm;

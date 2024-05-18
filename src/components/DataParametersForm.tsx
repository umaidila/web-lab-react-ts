import React from 'react';
import { products } from '../dtos/Products';
import { DataParametersFormProps } from '../props/DataParameterFormProps';

const formatDateToInputValue = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const DataParametersForm: React.FC<DataParametersFormProps> = ({
    selectedProducts, setSelectedProducts,
    selectedMarker, setSelectedMarker,
    groupSelect, setGroupSelect,
    startDate, setStartDate,
    endDate, setEndDate
}) => {

    const handleMarkerChange = ( event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMarker(event.target.value);
    };

    const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroupSelect(event.target.value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'startDate') {
            setStartDate(new Date(event.target.value));
        } else {
            setEndDate(new Date(event.target.value));
        }
    };

    const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            <h3>Список цен на основные активы</h3>
            <form>
                <p>Выбрать категорию</p>
                <label>
                    <input type="radio" name="priceSelectedMarker" value="min" checked={selectedMarker === 'min'} onChange={handleMarkerChange} /> Минимальный<br />
                </label>
                <label>
                    <input type="radio" name="priceSelectedMarker" value="mean" checked={selectedMarker === 'mean'} onChange={handleMarkerChange} /> Средний<br />
                </label>
                <label>
                    <input type="radio" name="priceSelectedMarker" value="max" checked={selectedMarker === 'max'} onChange={handleMarkerChange} /> Максимальный<br />
                </label>
                
                <p>Выберите группировку</p>
                <label>
                    <input type="radio" name="groupSelect" value="week" checked={groupSelect === 'week'} onChange={handleGroupChange} /> Неделя<br />
                </label>
                <label>
                    <input type="radio" name="groupSelect" value="month" checked={groupSelect === 'month'} onChange={handleGroupChange} /> Месяц<br />
                </label>
                <label>
                    <input type="radio" name="groupSelect" value="year" checked={groupSelect === 'year'} onChange={handleGroupChange} /> Год<br />
                </label>

                <p>Фильтр по времени</p>
                <input type="date" name="startDate" value={formatDateToInputValue(startDate)} onChange={handleDateChange} />
                <input type="date" name="endDate" value={formatDateToInputValue(endDate)} onChange={handleDateChange} />

                <p>Выбранные товары</p>
                {products.map((product) => (
                    <div key={product.backName}>
                        <input
                            type="checkbox"
                            name="productSelect"
                            value={product.frontName}
                            checked={selectedProducts.includes(product)}
                            onChange={handleProductChange}
                        /> {product.frontName}<br />
                    </div>
                ))}
            </form>
        </div>
    );
}

export default DataParametersForm;
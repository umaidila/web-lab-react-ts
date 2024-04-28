import { DayInfo, ProductData } from '../dtos/ProductData';
import { DataGraphDrawerProps } from '../props/DataGraphDrawerProps';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';

const DataGraphDrawer: React.FC<DataGraphDrawerProps> = ({data, selectedProducts, isPriceSelected}) => {

    const selectedBackNames = selectedProducts.map(p => p.backName);

    const formattedData = data
        .filter(productData => selectedBackNames.includes(productData.product.backName))
        .flatMap(productData => 
        productData.infoArray.map(dayInfo => ({
            name: productData.product.frontName,
            date: dayInfo.day.getTime(),
            value: isPriceSelected ? dayInfo.price : dayInfo.volume
        }))
        )
        .sort((a, b) => a.date - b.date);


    return (
        <ResponsiveContainer width="80%" height={400}>
            <LineChart
                data={formattedData}
                margin={{ top: 20, right: 300, left: 200, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" type="number" domain={['dataMin', 'dataMax']} tickFormatter={timeStr => new Date(timeStr).toLocaleDateString()} />
                <YAxis />
                <Tooltip />
                <Legend />
                {selectedProducts.map((product, index) => (
                    <Line
                        key={index}
                        type="monotone"
                        dataKey="value"
                        data={formattedData.filter(item => item.name === product.frontName)}
                        stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} 
                        activeDot={{ r: 8 }}
                        name={product.frontName}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}

export default DataGraphDrawer;
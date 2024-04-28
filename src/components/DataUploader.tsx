import React, { useState, useRef, ChangeEvent } from 'react';
import { DayInfo, ProductData } from '../dtos/ProductData';
import { DataUploaderProps } from '../props/DataUploaderProps';




const DataUploader: React.FC<DataUploaderProps> = ({ onDataLoaded }) => {

    const [fileName, setFileName] = useState<string | null>(null);  // Состояние для хранения названия файла
   
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (!file) {
            console.log("No file selected.");
            alert("No file selected.");
            setFileName(null);
            return;
        }

        setFileName(file.name);
        const reader = new FileReader();

        reader.onload = function(event: ProgressEvent<FileReader>) {
            const text = event.target?.result as string;
            const data = csvToObject(text);
            console.log("Data loaded successfully:", data);
            onDataLoaded(data);
        };

        reader.onerror = function() {
            alert('Unable to read file');
        };

        reader.readAsText(file);
    };

    return (
        <div>
            <label> Выберите датасет:</label>
            <input type="file" onChange={handleFileChange} />
            {fileName && <p>Загружен файл: {fileName}</p>}
        </div>
    );
};

function csvToObject(csvString: string): ProductData[] {
    console.log("CSV string = ", csvString);
    const lines = csvString.trim().split('\n');
    const headers = lines[0].split(',');

    const items: { [key: string]: ProductData } = {};

    lines.slice(1).forEach(valueLine => {
        const values = parseCSVLine(valueLine);
        const date = parseDate(values[headers.indexOf('Date')]);

        headers.forEach((header, index) => {
            if (header.endsWith("_Price") || header.endsWith("_Vol")) {
                const name_parts = header.split('_');
                name_parts.pop();
                const name = name_parts.join("_");
                const priceIndex = headers.indexOf(name + "_Price");
                const volumeIndex = headers.indexOf(name + "_Vol");

                const price = values[priceIndex] ? parseFloat(values[priceIndex].replace(/,/g, '')) : null;
                const volume = values[volumeIndex] ? parseFloat(values[volumeIndex].replace(/,/g, '')) : null;

                if (!items[name]) {
                    items[name] = new ProductData(name);
                }

                const dayInfo = new DayInfo(date, price, volume);
                items[name].addDayInfo(dayInfo);
            }
        });
    });

    return Object.values(items);
}

function parseCSVLine(text: string): string[] {
    const regex = /(?:^|,)(?:"([^"]*)"|([^,]*))/g;
    let result: string[] = [];
    let match;

    while (match = regex.exec(text)) {
        result.push(match[1] !== undefined ? match[1].replace(/,/g, '') : match[2]);
    }
    return result;
}

function parseDate(dateStr: string): Date {
    const parts = dateStr.split('-');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; 
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
}


export default DataUploader;


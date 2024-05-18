import React, { useState, ChangeEvent } from 'react';
import { DayInfo } from '../dtos/ProductData';
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

function csvToObject(csvString: string): DayInfo[] {
    const lines = csvString.trim().split('\n');
    const headers = lines[0].split(',');
    const days: { [date: string]: DayInfo } = {};

    lines.slice(1).forEach(line => {
        const values = parseCSVLine(line);
        const dateStr = values[headers.indexOf('Date')];
        const date = parseDate(dateStr);

        if (!days[dateStr]) {
            days[dateStr] = new DayInfo(date);
        }

        headers.forEach((header, index) => {
            if (header.endsWith("_Price")) {
                const baseName = header.split('_').slice(0, -1).join('_');
                const price = values[index] ? parseFloat(values[index].replace(/,/g, '')) : null;

                days[dateStr].addPrice(baseName, price);
            }
        });
    });

    return Object.values(days);
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


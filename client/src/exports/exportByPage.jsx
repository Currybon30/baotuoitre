import { useState } from 'react';
import { Button, MenuItem, Select, FormControl, InputLabel } from '@material-ui/core';
import { exportByPage } from './api-exports'; // Assuming you have an API file for making requests
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import auth from '../auth/auth-helper';

const ExportByPage = () => {
    const jwt = auth.isAuthenticated();
    const token = jwt.token;
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleData = (data) => {
        if (!data || data.length === 0) {
            alert('Không có dữ liệu để xuất');
            return;
        }
        const headerMapping = {
            date: 'Ngày',   // Format the date
            sumOfSize: 'Tổng kích thước',
            sumOfTotal: 'Tổng tiền'
        }

        const formattedData = data.map((item) => {
            // Format date
            const [year, month, day] = item.date.split('T')[0].split('-');
            const formattedDate = `${day}/${month}/${year}`;

            let sumOfSize = '';
            if (typeof item.sumOfSize === 'object' && Object.prototype.hasOwnProperty.call(item.sumOfSize, '$numberDecimal')) {
                sumOfSize = item.sumOfSize.$numberDecimal; // Extract Decimal128 value
            } else {
                sumOfSize = String(item.sumOfSize); // Convert to string directly
            }

        
            return {
                'Ngày': formattedDate,
                'Tổng kích thước': sumOfSize,
                'Tổng tiền': item.sumOfTotal
            }
        });

        const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: Object.values(headerMapping) });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const dataExcel = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(dataExcel, 'thongketrangthang' + month + '.xlsx');    
    }

    const handleExport = async () => {
        try {
            const data = await exportByPage(year, month, token);
            console.log(data);
            handleData(data);
        }
        catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Handle error as needed
        }
    }

    return (
        <>
        <h1>Thống kê theo trang</h1>
        <div style={{margin: '10px'}}>
            <FormControl variant="outlined" style={{ marginRight: '10px', width: '200px' }}>
                <InputLabel id="year-label">Chọn năm</InputLabel>
                <Select
                    labelId="year-label"
                    id="year-select"
                    label="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                >
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2025}>2025</MenuItem>
                    <MenuItem value={2026}>2026</MenuItem>
                    <MenuItem value={2027}>2027</MenuItem>
                    <MenuItem value={2028}>2028</MenuItem>
                    <MenuItem value={2029}>2029</MenuItem>
                    <MenuItem value={2030}>2030</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined" style={{ marginRight: '10px', width: '200px' }}>
                <InputLabel id="month-label">Chọn tháng</InputLabel>
                <Select
                    labelId="month-label"
                    id="month-select"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    label="Month"
                >
                    <MenuItem value="01">Tháng 1</MenuItem>
                    <MenuItem value="02">Tháng 2</MenuItem>
                    <MenuItem value="03">Tháng 3</MenuItem>
                    <MenuItem value="04">Tháng 4</MenuItem>
                    <MenuItem value="05">Tháng 5</MenuItem>
                    <MenuItem value="06">Tháng 6</MenuItem>
                    <MenuItem value="07">Tháng 7</MenuItem>
                    <MenuItem value="08">Tháng 8</MenuItem>
                    <MenuItem value="09">Tháng 9</MenuItem>
                    <MenuItem value="10">Tháng 10</MenuItem>
                    <MenuItem value="11">Tháng 11</MenuItem>
                    <MenuItem value="12">Tháng 12</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                onClick={handleExport}
            >
                Xuất
            </Button>
        </div>
        </>
    );
}

export default ExportByPage;
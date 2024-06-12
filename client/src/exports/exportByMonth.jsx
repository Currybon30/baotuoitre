import { useState } from 'react';
import { Button, MenuItem, Select, FormControl, InputLabel } from '@material-ui/core';
import { exportByMonth } from './api-exports'; // Assuming you have an API file for making requests
import Fraction from 'fraction.js';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import auth from '../auth/auth-helper';

const ExportByMonth = () => {
    const jwt = auth.isAuthenticated();
    const token = jwt.token;
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');

    const decToFrac = (decimal) => {
        const maxDenominator = 10000;
        const fraction = new Fraction(decimal).toFraction(maxDenominator);
        return fraction.toString();
    }

    const handleData = (data) => {
        if(data.error) {
            console.error('Error exporting data:', data.error);
        }
        if (!data || data.length === 0) {
            alert('Không có dữ liệu để xuất');
            return;
        }
        else if(!data.error){
            const headerMapping = {
                orderId: 'Phiếu yêu cầu',
                customerName: 'Tên khách hàng/Đơn vị',
                address: 'Địa chỉ',
                content: 'Nội dung',
                publishDates: 'Ngày đăng',
                productType: 'Loại báo',
                size: 'Kích thước',
                quantity: 'Số lượng',
                totalPrice: 'Tổng tiền'
            };
        
            const formattedData = data.map((item) => {
                // Format publishDates array
                const formattedDates = item.publishDates?.map((date) => {
                    const [year, month, day] = date.split('T')[0].split('-');
                    const formattedDate = `${day}/${month}/${year}`;
                    return formattedDate;
                }).join(', '); // Join formatted dates into a string
    
                // format size
                item.size = decToFrac(item.size ? item.size.$numberDecimal : 0);
        
                return {
                    'Phiếu yêu cầu': item.orderId,
                    'Tên khách hàng/Đơn vị': item.customerName,
                    'Địa chỉ': item.address,
                    'Nội dung': item.content,
                    'Ngày đăng': formattedDates,
                    'Loại báo': item.productType,
                    'Kích thước': item.size,
                    'Số lượng': item.quantity,
                    'Tổng tiền': item.totalPrice
                };
            });
        
            const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: Object.values(headerMapping) });
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const dataFile = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            saveAs(dataFile, 'thongkethang' + month + '.xlsx');
        }
    };    

    const handleExport = async () => {
        try {
            const data = await exportByMonth(year, month, token);
            handleData(data);
        } catch (error) {
            console.error('Error exporting data:', error);
            // Handle error as needed
        }
    };

    return (
        <>
        <h1>Thống kê theo tháng</h1>
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
};

export default ExportByMonth;

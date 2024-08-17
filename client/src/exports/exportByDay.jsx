import React from "react";
import { useState } from 'react';
import { Button, MenuItem, Select, FormControl, InputLabel } from '@material-ui/core';
import { exportByDay } from './api-exports'; // Assuming you have an API file for making requests
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Fraction from 'fraction.js';
import auth from '../auth/auth-helper';

const ExportByDay = () => {
    const jwt = auth.isAuthenticated();
    const token = jwt.token;
    const [year, setYear] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');

    const decToFrac = (decimal) => {
        const maxDenominator = 10000;
        const fraction = new Fraction(decimal).toFraction(maxDenominator);
        return fraction.toString();
    }

    const handleData = (data) => {
        if (!data || data.length === 0) {
            alert('Không có dữ liệu để xuất');
            return;
        }
        
        const headerMapping = {
            orderId: "Phiếu yêu cầu",
            customerName: "Đơn vị",
            size: "Kích thước",
            pricePerUnit: "Tổng tiền"
        }

        const formattedData = data.map((item) => {
            item.size = decToFrac(item.size ? item.size.$numberDecimal : 0);
            return {
                'Phiếu yêu cầu': item.orderId,
                'Đơn vị': item.customerName,
                'Kích thước': item.size,
                'Tổng tiền': item.pricePerUnit
            }
        });

        const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: Object.values(headerMapping) });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const dataFile = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(dataFile, `thongkethang${month}-ngay${day}.xlsx`);
    }

    const handleExport = async () => {
        try{
            const data = await exportByDay(year, month, day, token);
            handleData(data);
        }
        catch(error){
            console.error('There was a problem with the fetch operation:', error);
            // Handle error as needed
        }
    }

    return (
        <>
        <h1>Thống kê theo ngày</h1>
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
                    label="Month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                >
                    <MenuItem value={1}>Tháng 1</MenuItem>
                    <MenuItem value={2}>Tháng 2</MenuItem>
                    <MenuItem value={3}>Tháng 3</MenuItem>
                    <MenuItem value={4}>Tháng 4</MenuItem>
                    <MenuItem value={5}>Tháng 5</MenuItem>
                    <MenuItem value={6}>Tháng 6</MenuItem>
                    <MenuItem value={7}>Tháng 7</MenuItem>
                    <MenuItem value={8}>Tháng 8</MenuItem>
                    <MenuItem value={9}>Tháng 9</MenuItem>
                    <MenuItem value={10}>Tháng 10</MenuItem>
                    <MenuItem value={11}>Tháng 11</MenuItem>
                    <MenuItem value={12}>Tháng 12</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined" style={{ marginRight: '10px', width: '200px' }}>
                <InputLabel id="day-label">Chọn ngày</InputLabel>
                <Select
                    labelId="day-label"
                    id="day-select"
                    label="Day"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={11}>11</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={13}>13</MenuItem>
                    <MenuItem value={14}>14</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={16}>16</MenuItem>
                    <MenuItem value={17}>17</MenuItem>
                    <MenuItem value={18}>18</MenuItem>
                    <MenuItem value={19}>19</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={21}>21</MenuItem>
                    <MenuItem value={22}>22</MenuItem>
                    <MenuItem value={23}>23</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={26}>26</MenuItem>
                    <MenuItem value={27}>27</MenuItem>
                    <MenuItem value={28}>28</MenuItem>
                    <MenuItem value={29}>29</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={31}>31</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained"
                color="primary"
                onClick={handleExport}>Xuất</Button>
        </div>
        </>
    )             
}

export default ExportByDay;
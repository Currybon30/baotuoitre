import { useState, useEffect } from 'react';
import { listById } from "./api-quanly";
import { useParams, useNavigate, Navigate, useLocation } from 'react-router-dom';
import Fraction from 'fraction.js';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { removeById } from './api-quanly';
import auth from '../auth/auth-helper';


export default function BieuMauOne() {
    const [values, setValues] = useState([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State to control dialog visibility
    const { id } = useParams();
    const jwt = auth.isAuthenticated();
    const navigate = useNavigate();
    const location = useLocation();

    const formattedDates = values.publishDates?.map((date, index, array) => {
        const [year, month, day] = date.split('T')[0].split('-');
        const formattedDate = `${day}/${month}/${year}`;
        return index === array.length - 1 ? formattedDate : formattedDate + ', ';
    });

    const decToFrac = (decimal) => {
        const maxDenominator = 10000;
        const fraction = new Fraction(decimal).toFraction(maxDenominator);
        return fraction.toString();
    }

    const handleEdit = () => {
        navigate('/quanlybieumau/edit/' + id);
    }

    const handleDelete = () => {
        setOpenDeleteDialog(true); // Open the delete confirmation dialog
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false); // Close the delete confirmation dialog
    };

    const handleDeleteConfirmed = () => {
        const token = jwt.token;
        removeById(id, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                navigate('/quanlybieumau');

            }
        }).catch(error => {
            console.error("Error deleting data:", error);
        });
        setOpenDeleteDialog(false); // Close the delete confirmation dialog
    };

    useEffect(() => {
        const token = jwt.token;
        listById(id, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues(data);
            }
        }).catch(error => {
            console.error("Error fetching data:", error); // Log any errors that occur
        });
    }, [id, jwt.token])


    if (!jwt){
        return <Navigate to="/dangnhap" state={{prevUrl: location.pathname}}/>;
    }
    else {
        return (
            <div>
                <p>Phiếu yêu cầu: {values.orderId}</p>
                <p>Tên khách hàng: {values.customerName}</p>
                <p>Địa chỉ: {values.address}</p>
                <p>Nội dung: {values.content}</p>
                <p>Loại báo: {values.productType}</p>
                <p>Kích thước: {decToFrac(values.size ? values.size.$numberDecimal : 0)}</p>
                <p>Ngày đăng: {formattedDates}</p>
                <p>Số lượng: {values.quantity}</p>
                <p>Đơn giá: {values.pricePerUnit}</p>
                <p>Tổng: {values.total}</p>
                <Button variant="contained" onClick={handleEdit} style={{ marginBottom: '10px', marginLeft: '10px' }}>Sửa</Button>
                <Button variant="contained" onClick={handleDelete} style={{ marginBottom: '10px', marginLeft: '10px' }}>Xóa</Button>



                {/* Delete confirmation dialog */}
                <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                    <DialogTitle>Xác nhận xóa</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteDialog} color="primary">Hủy</Button>
                        <Button onClick={handleDeleteConfirmed} color="primary">Xóa</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

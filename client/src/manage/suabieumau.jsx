import {useState, useEffect} from 'react';
import {listById, updateById} from "./api-quanly.js";
import Fraction from 'fraction.js';
import { makeStyles } from "@material-ui/core";
import {useParams, useNavigate} from "react-router-dom";
import DatePicker from 'react-multi-date-picker';


const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
    form: {
        width: "50%",
        display: "flex",
        flexDirection: "column",
    },
    label: {
        fontWeight: "bold",
        marginBottom: "5px",
    },
    btn: {
        display: "flex",
        justifyContent: "center",
        gap: "10px",
    },
    radiobtn: {
        display: "flex",
        gap: "10px",
    },
}));

export default function Suabieumau() {
    const classes = useStyles();

    const [values, setValues] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        listById(id).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                data.publishDates = data.publishDates.map(date => date.split('T')[0].split('-').reverse().join('/'));
                data.size = decToFrac(data.size ? data.size.$numberDecimal : 0);
                setValues(data);
            }
        });
    }, [id]);

    const handleChangeDate = (dateArray) => {
        const newPublishDates = dateArray.map(date => date.format("DD/MM/YYYY"));
        const newQuantity = dateArray.length;
        const parsedPricePerUnit = parseFloat(values.pricePerUnit);
        let newTotal = newQuantity * parsedPricePerUnit;
    
        if (isNaN(newTotal)) {
            newTotal = '';
        }
    
        setValues({
            ...values,
            publishDates: newPublishDates,
            quantity: newQuantity,
            total: newTotal
        });
    };

    const handleChangePricePerUnitOrQuantity = () => {
        const parsedQuantity = parseInt(values.quantity);
        const parsedPricePerUnit = parseFloat(values.pricePerUnit);
        let newTotal = parsedQuantity * parsedPricePerUnit;
        if (isNaN(newTotal)) {
            newTotal = '';
        }
        setValues({
            ...values,
            total: newTotal
        });
    }

    const handleTypeChange = (e) => {
        setValues({
            ...values,
            productType: e.target.value,
            size: e.target.value === 'Online' ? 0 : ''
        });
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedValues = { //default date format in MongoDB is ISODate
            ...values,
            publishDates: values.publishDates.map(dateStr => {
                const [day, month, year] = dateStr.split('/');
                return new Date(`${year}-${month}-${day}`);
            }),
            size: (eval(values.size)).toFixed(5)
        };

        
        updateById(id, formattedValues).then((data) => {
            if (data.error) {
                console.log(data.error);
                alert(data.error);
            } else {
                alert("Cập nhật thành công");
                navigate('/quanlybieumau/' + id);
            }
        });       
    }

    const decToFrac = (decimal) => {
        const maxDenominator = 10000;
        const fraction = new Fraction(decimal).toFraction(maxDenominator);
        return fraction.toString();
    }

    const handleReset = () => {
        listById(id).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues(data);
                navigate('/quanlybieumau/' + id);
            }
        });

    }

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit} className={classes.form}>
                <h1 style={{textAlign: 'center'}}>Sửa số phiếu {values.orderId}</h1>
                <label htmlFor='name' className={classes.label}>Họ và Tên:</label>
                <input type='text' id='name' value={values.customerName} onChange={(e) => setValues({...values, customerName: e.target.value})} />
                <br />
                <label htmlFor='address' className={classes.label}>Địa chỉ:</label>
                <input type='text' id='address' value={values.address} onChange={(e) => setValues({...values, address: e.target.value})} />
                <br />
                <label htmlFor='content' className={classes.label}>Nội dung:</label>
                <textarea id='content' value={values.content} onChange={(e) => setValues({...values, content: e.target.value})} />
                <br />
                <label htmlFor='type' className={classes.label}>Loại báo:</label>
                <div className={classes.radiobtn}>
                    <label htmlFor='MT'>MT</label>
                    <input type='radio' name='type' checked={values.productType === 'MT'} value='MT' onChange={handleTypeChange} />
                    <label htmlFor='TQ'>TQ</label>
                    <input type='radio' name='type' checked={values.productType === 'TQ'} value='TQ' onChange={handleTypeChange} />
                    <label htmlFor='Online'>Online</label>
                    <input type='radio' name='type' checked={values.productType === 'Online'} value='Online' onChange={handleTypeChange} />
                </div>
                <br />
                <label htmlFor='size' className={classes.label}>Kích thước:</label>
                <input type='text' id='size' value={values.size} onChange={(e) => setValues({...values, size: e.target.value})}  />
                <br />
                <label htmlFor='publishDate' className={classes.label}>Ngày đăng:</label>
                <DatePicker
                    value={values.publishDates}
                    onChange={handleChangeDate}
                    format='DD/MM/YYYY'
                    multiple
                />
                <br />
                <label htmlFor='quantity' className={classes.label}>Số lượng:</label>
                <input type='number' id='quantity' value={values.quantity} onChange={(e) => setValues({...values, quantity: e.target.value})} readOnly/>
                <br />
                <label htmlFor='price' className={classes.label}>Đơn giá:</label>
                <input type='number' id='price' value={values.pricePerUnit} onChange={(e) => setValues({...values, pricePerUnit: e.target.value})} onBlur={handleChangePricePerUnitOrQuantity}/>
                <br />
                <label htmlFor='total' className={classes.label}>Tổng tiền:</label>
                <input type='number' id='total' value={values.total} onChange={(e) => setValues({...values, total: e.target.value})} readOnly/>
                <br />
                <div className={classes.btn}>
                    <button type='submit'>Lưu</button>
                    <button type='reset' onClick={handleReset}>Hủy</button>
                </div>
            </form>
        </div>
    );
}
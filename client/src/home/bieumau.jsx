import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { makeStyles } from "@material-ui/core";
import {create} from "./api-bieumau";
import auth from "../auth/auth-helper";
import { Navigate } from "react-router-dom";

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

export default function MyForm() {
    const jwt = auth.isAuthenticated();
    const token = jwt.token;
    const classes = useStyles();

    const [orderId, setOrderId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [address, setAddress] = useState('');
    const [content, setContent] = useState('');
    const [productType, setProductType] = useState('');
    const [size, setSize] = useState('');
    const [publishDates, setPublishDates] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [pricePerUnit, setPricePerUnit] = useState('');
    const [total, setTotal] = useState('');

    const handleChangeDate = (dateArray) => {
        setPublishDates(dateArray.map(date => date.format("DD/MM/YYYY")));
        const newQuantity = dateArray.length;
        setQuantity(newQuantity);
        const parsedPricePerUnit = parseFloat(pricePerUnit);
        let newTotal = newQuantity * parsedPricePerUnit;
        setTotal(newTotal);
        if(isNaN(newTotal)){
            setTotal('');
        }
    }

    const handleChangePricePerUnitOrQuantity = () => {
        const parsedQuantity = parseInt(quantity);
        const parsedPricePerUnit = parseFloat(pricePerUnit);
        let newTotal = parsedQuantity * parsedPricePerUnit;
        setTotal(newTotal);
        if(isNaN(newTotal)){
            setTotal('');
        }
    }

    const handleTypeChange = (e) => {
        setProductType(e.target.value);
        if (e.target.value === "Online") {
            setSize("0");
        }
        else {
            setSize("");
        }
    }

    const handleReset = () => {
        setOrderId('');
        setCustomerName('');
        setAddress('');
        setContent('');
        setProductType('');
        setSize('');
        setPublishDates([]);
        setQuantity('');
        setPricePerUnit('');
        setTotal('');
        window.scrollTo(0, 0);
    }

    const handleSubmit = (e) => {
        //change dates format before sending to the server
        let formattedDates = publishDates.map(date => {
            let [day, month, year] = date.split("/");
            return `${year}-${month}-${day}`;
        });

        e.preventDefault();
        const bieumau = {
            orderId: orderId || undefined,
            customerName: customerName || undefined,
            address: address || undefined,
            content: content || undefined,
            productType: productType || undefined,
            size: eval(size).toFixed(5) || undefined,
            publishDates: formattedDates || undefined,
            quantity: quantity || undefined,
            pricePerUnit: pricePerUnit !== undefined && pricePerUnit !== null ? parseFloat(pricePerUnit) : 0,
            total: total !== undefined && total !== null ? parseFloat(total) : 0,
        }
        create(bieumau, token).then(()=>{
            try {
                alert("Đã lưu thành công");
                handleReset();
            }
            catch(err){
                alert("Lỗi: " + err);
            }
        });
    }

    if(!jwt || !jwt.token) {
        return <Navigate to="/dangnhap" />;
    }
    else{
        return (
            <div className={classes.container}>
                <form onSubmit={handleSubmit} method="post" className={classes.form}>
                    <label htmlFor="orderId" className={classes.label}>Số phiếu yêu cầu:</label>
                    <input type="text" id="orderId" value={orderId} onChange={(e) => setOrderId(e.target.value)} required/>
                    <br />
                    <label htmlFor="name" className={classes.label}>Họ và Tên:</label>
                    <input type="text" id="name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required/>
                    <br />
                    <label htmlFor="address" className={classes.label}>Địa chỉ:</label>
                    <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                    <br />
                    <label htmlFor="content" className={classes.label}>Nội dung:</label>
                    <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required/>
                    <br />
                    <label htmlFor="type" className={classes.label}>Loại báo:</label>
                    <div className={classes.radiobtn}>
                        <label htmlFor="MT">MT</label>
                        <input type="radio" name="type" checked={productType === "MT"} value="MT" onChange={handleTypeChange} />
                        <label htmlFor="TQ">TQ</label>
                        <input type="radio" name="type" checked={productType === "TQ"} value="TQ" onChange={handleTypeChange} />
                        <label htmlFor="Online">Online</label>
                        <input type="radio" name="type" checked={productType === "Online"} value="Online" onChange={handleTypeChange} />
                    </div>
                    <br />
                    <label htmlFor="size" className={classes.label}>Kích thước:</label>
                    <input type="text" id="size" value={size} onChange={(e) => setSize(e.target.value)} placeholder="1/4" />
                    <br />
                    <label htmlFor="publishDate" className={classes.label}>Ngày đăng:</label>
                    <DatePicker
                        value={publishDates}
                        onChange={handleChangeDate}
                        multiple
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày đăng"
                    />
                    <br />
                    <label htmlFor="quantity" className={classes.label}>Số lượng:</label>
                    <input type="text" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Máy tự động điền" readOnly/>
                    <br />
                    <label htmlFor="pricePerUnit" className={classes.label}>Đơn giá:</label>
                    <input type="text" id="pricePerUnit" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} onBlur={handleChangePricePerUnitOrQuantity} required/>
                    <br />
                    <label htmlFor="total" className={classes.label}>Tổng tiền:</label>
                    <input type="text" id="total" value={total} placeholder="Máy tự động điền" readOnly />
                    <br />
                    <div className={classes.btn}>
                        <button type="submit">Tạo mới</button>
                        <button type="reset" onClick={handleReset}>Nhập lại</button>
                    </div>
                </form>
            </div>
        );
    }
}
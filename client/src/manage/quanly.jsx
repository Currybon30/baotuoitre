import {useState, useEffect} from 'react';
import { makeStyles } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {listAll, searchName, searchNameCaseInsensitive} from './api-quanly';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import Checkbox from '@mui/material/Checkbox';
import {Button, TextField, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText} from '@material-ui/core';
import { CgAdd } from "react-icons/cg";
import './manage.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteMultiItems } from './api-quanly';
import auth from '../auth/auth-helper';
import { useNavigate } from 'react-router-dom';





const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        marginBottom: '10px',
    },
    list:{
        maxHeight:'400px',
        overflow:'auto',
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        marginTop: '10px',
        justifyContent: 'center',
    },
    searchButton: {
        marginLeft: '10px',
    }
}));

export default function QuanLy() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState([]);
    const [caseInsensitive, setCaseInsensitive] = useState(false);
    const [, setError] = useState(null);
    const [serverCheck, setServerCheck] = useState(false);
    const [multiSelect, setMultiSelect] = useState(false);
    const [deletedItems, setDeletedItems] = useState([]);
    const [openNotification, setOpenNotification] = useState(false);
    const jwt = auth.isAuthenticated();

    useEffect(() => {
        const checkServerStatus = async () => {
            try {
                await fetch('https://thuytrang-tuoitre-server.onrender.com/', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                setServerCheck(true)
            }
            catch (err) {
                setServerCheck(false)
            }  
        }
        
        checkServerStatus()
        listAll()
            .then(data => {
                setData(data)
            })
            .catch(err => {
                setError(err)
            })
    }, [])


    const handleCheckboxClick = (e, itemId) => {
        if(e.target.checked){
            setDeletedItems(() => {
                const items = [...deletedItems, itemId]
                return items
            })
        }
        else{
            setDeletedItems(() => {
                const items = deletedItems.filter(item => item !== itemId)
                return items
            })
        }
    };

    const handleSearch = () => {
        if(searchValue === ''){
            listAll()
                .then(data => {
                    setData(data)
                })
                .catch(err => {
                    setError(err)
                })
        }
        else if (caseInsensitive){
            searchNameCaseInsensitive(searchValue)
                .then(data => {
                    setData(data)
                })
                .catch(err => {
                    setError(err)
                })
        }
        else {
            searchName(searchValue)
                .then(data => {
                    setData(data)
                })
                .catch(err => {
                    setError(err)
                })
        }
    }



    const handleCloseNotification = () => {
        setOpenNotification(false)
    }

    const handleConfirmDeleteMultiple = async () => {
        const jsonDeletedItems = {
            pressIds: deletedItems
        };
        await deleteMultiItems(jsonDeletedItems, jwt.token).then(async (data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                await listAll()
                    .then(data => {
                        setData(data);
                    })
                    .catch(err => {
                        setError(err);
                    });
                setDeletedItems([]);
                handleCloseNotification();
                await setTimeout(() => {
                    alert('Xóa thành công');
                }, 500);
            }
        });
        
    }

    const handleDeleteMultiple = () => {
        if(!jwt){
            navigate('/dangnhap');
        }
        else {
            setOpenNotification(true);
        }
    }
    

    if(!serverCheck){
        return (
            <div className={classes.root}>
                <p>Server đang được khởi động</p>
            </div>
        )
    }
    if(data.length === 0){
        return (
            <div className={classes.root}>
                <p>Không tìm thấy dữ liệu</p>
                <Link to="/taobieumau">
                Tạo mới <CgAdd />
                </Link>
            </div>
        )
    }
    else{
        return (
            <div>
                <div className={classes.search}>
                    <TextField
                        label="Tìm kiếm"
                        variant="outlined"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {e.key === 'Enter' && handleSearch()}}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.searchButton}
                        onClick={handleSearch}
                    >
                        <SearchIcon />
                    </Button>
                </div>
                <div className={classes.search}>
                    <Checkbox checked={caseInsensitive} onChange={(e) => setCaseInsensitive(e.target.checked)} />
                    <p>Không phân biệt chữ hoa và chữ thường</p>
                </div>

                <div className="btn-multi-select-container">
                    {
                        multiSelect && deletedItems.length == 0 &&
                        <button className="btn-delete" onClick={handleDeleteMultiple} disabled>
                            <DeleteIcon className='btn-delete-icon'/>
                            <p>Xóa</p>
                        </button>
                    }
                    {
                        multiSelect && deletedItems.length > 0 &&
                        <button className="btn-delete" onClick={handleDeleteMultiple}>
                            <DeleteIcon className='btn-delete-icon'/>
                            <p>Xóa</p>
                        </button>
                    }
                    {
                        !multiSelect &&
                        <button className='btn-multi-select' onClick={() => setMultiSelect(true)}>Chọn nhiều</button>
                    }
                    {
                        multiSelect &&
                        <button className='btn-multi-select' onClick={() => {setMultiSelect(false); setDeletedItems([])}}>Hủy</button>
                    }
                </div>
                
                
                <Paper>
                    <Typography variant="h6" color="primary" align='center'> Danh sách biểu mẫu
                    </Typography>
                    <Divider />
                    <List className={classes.list}>
                        {data.map((item, i) => {
                            return multiSelect ? (
                                <div key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <ListItem className={deletedItems.includes(item._id)  ? "checked-item" : "unchecked-item"}>
                                        <ListItemText primary={item.orderId} 
                                        secondary={<p>{"Tên khách hàng: " + item.customerName}</p>} 
                                        />
                                        <Checkbox
                                            checked={deletedItems.includes(item._id)}
                                            onClick={(e) => handleCheckboxClick(e, item._id)}
                                        />
                                    </ListItem>
                                </div>
                            ) : (
                                <Link to={`/quanlybieumau/${item._id}`} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <ListItem button>
                                        <ListItemText primary={item.orderId} secondary={<p>{"Tên khách hàng: " + item.customerName}</p>} />
                                    </ListItem>
                                </Link>
                            );
                        })}
                    </List>
                </Paper>


                {/* Delete confirmation dialog */}
                <Dialog open={openNotification} onClose={handleCloseNotification}>
                    <DialogTitle>Xác nhận xóa</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Dữ liệu không thể được khôi phục lại sau khi xóa thành công.
                            <br/>
                            <b>Kiểm tra lại các danh mục đã chọn:</b>
                            {deletedItems.map((id) => {
                                const item = data.find((item) => item._id === id);
                                return (
                                    <p key={id}>{item.orderId}: {item.customerName}</p>
                                );
                            })}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseNotification} color="primary">
                            Hủy
                        </Button>
                        <Button onClick={handleConfirmDeleteMultiple} color="primary">
                            Xác nhận
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

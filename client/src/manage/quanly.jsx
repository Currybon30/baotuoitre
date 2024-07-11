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
import Checkbox from '@material-ui/core/Checkbox';
import {Button, TextField} from '@material-ui/core';
import { CgAdd } from "react-icons/cg";



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
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState([]);
    const [caseInsensitive, setCaseInsensitive] = useState(false);
    const [, setError] = useState(null);
    const [serverCheck, setServerCheck] = useState(false);

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

    if(!serverCheck){
        return (
            <div className={classes.root}>
                <p>Server đang được khởi động hoặc gặp vài vấn đề</p>
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


                <Paper>
                    <Typography variant="h6" color="primary" align='center'> Danh sách biểu mẫu
                    </Typography>
                    <Divider />
                    <List className={classes.list}>
                        {data.map((item, i) => {
                            return (
                                <Link to={`/quanlybieumau/${item._id}`} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <ListItem button>
                                        <ListItemText primary={item.orderId} secondary={<p>{"Tên khách hàng: "+item.customerName}</p>} />
                                    </ListItem>
                                </Link>
                            )
                        })}
                    </List>
                </Paper>
            </div>
        )
    }
}

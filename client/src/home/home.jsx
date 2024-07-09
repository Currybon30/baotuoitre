// Next update:
// - Delete multiple applications by year
// - Choose multiple applications then delete

import logo from '../assets/Tuổi_Trẻ_Logo.svg.png'

const Home = () => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="jumbotron">
                            <img src={logo} alt="Tuổi Trẻ" style={{width: '80%', height: '100%', margin: '20px auto', display: 'block'}} />
                        </div>
                    </div>
                </div>
                <br />
                <h2 style={{color:'red'}}>Cập nhật mới </h2>
                <ul>
                    <li style={{fontWeight: 'bold'}}>09/07/2024</li>
                    <ul>
                        <li>Tìm kiếm theo tên</li>
                    </ul>
                    <li style={{fontWeight: 'bold'}}>12/06/2024</li>
                    <ul>
                        <li>Đăng nhập/Đăng xuất</li>
                    </ul>
                    <li style={{fontWeight: 'bold'}}>24/05/2024</li>
                    <ul>
                        <li>Chỉnh sửa biểu mẫu theo số phiếu yêu cầu</li>
                    </ul>
                </ul>
            </div>
        </div>
    );
};

export default Home;
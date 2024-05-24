// Next update:
// - Delete multiple applications by year
// - Choose multiple applications then delete

// Unnecessary update:
// - Login page

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
                <h2 style={{color:'red'}}>Cập nhật mới - 24/05/2024</h2>
                <ul>
                    <li>Chỉnh sửa biểu mẫu theo số phiếu yêu cầu</li>
                </ul>
            </div>
        </div>
    );
};

export default Home;
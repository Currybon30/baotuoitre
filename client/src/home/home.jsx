import React from "react";
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
            </div>
        </div>
    );
};

export default Home;
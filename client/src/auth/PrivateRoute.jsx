import React from "react";
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import auth from './auth-helper.js';

const PrivateRoute = ({ children }) => {
    const location = useLocation();

    return auth.isAuthenticated() ? (
        children
    ) : (
        <Navigate to={{ pathname: '/dangnhap', state: { from: location } }} replace />
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default PrivateRoute;

import React from 'react';
import { NavLink } from 'react-router-dom';

const Error = () => {
    return (
        <div className="container">
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "85vh" }}>
                <h2 className="mb-3">PAGE NOT FOUND</h2>
                <NavLink to="/" className="btn btn-primary" style={{ fontSize: "18px" }}>Back To Home Page</NavLink>
            </div>
        </div>
    );
}

export default Error;

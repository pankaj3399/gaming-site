import React from "react";
import '../styles/navbar.css';
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('jwt-token');
        navigate('/login');
    };

    return (
        <div className="Navbar">
            <Link to='/home'>Home</Link>
            <Link to='/profile'>Profile</Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
};

export default Navbar;
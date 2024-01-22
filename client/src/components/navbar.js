import React, { useEffect, useState } from "react";
import '../styles/navbar.css';
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { message } from 'antd';
import { BsCart2 } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import userService from "../services/userService";

const Navbar = () => {
    const [userDetails, setUserDetails] = useState('');
    const navigate = useNavigate();

    const fetchDetails = async () => {
        try {
            const response = await userService.getUserInfo();
            if (response.user) {
                let filteredUser = response.user;
                delete filteredUser.__v;
                setUserDetails({
                    ...userDetails,
                    ...filteredUser
                })
            }
        } catch (error) {
            message.error(error.response.data);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    const handleLogout = () => {
        Cookies.remove('jwt-token');
        navigate('/login');
    };

    return (
        <div className="Navbar">
            <div className="sub-nav-1">
                <div><Link to='/home'>Logo</Link></div>
                <div><Link to='/home'>NFT</Link></div>
                <div>
                    <form>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-white svg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="input" placeholder="Search" required />
                        </div>
                    </form>
                </div>

            </div>
            <div className="sub-nav-2">
                <div><Link>Marketplace</Link></div>
                <div><Link>Drops</Link></div>
                <div><Link>Top Collection</Link></div>
                <div><Link>My NFTs</Link></div>
                <div><Link className="btn">Create</Link></div>
                <div><Link to='/profile' className="icon-container"><IoPersonSharp size={20} />{userDetails.userName ? userDetails.userName : 'not set'}</Link></div>
                <div><Link>EN</Link></div>
                <div className="icon-container"><Link><BsCart2 size={22} /></Link></div>
            </div>
        </div>
    )
};

export default Navbar;
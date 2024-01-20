import React, { useState, useEffect } from "react";
import './index.css';
import { message } from "antd";
import Image from '../../assets/person.png'
import userService from "../../services/userService";

const Profile = () => {
    const [formData, setFormData] = useState({
        name: "",
        userName: "",
        avatarURL: "",
        dateOfBirth: "",
        age: "",
        gender: "",
        pronouns: "",
        region: "",
        headerURL: "",
        cellNumber: "",
        bio: "",
        role: "",
    });
    const maxDate = new Date().toISOString().split('T')[0];

    const fetchDetails = async () => {
        try {
            const response = await userService.getUserInfo();
            if (response.user) {
                let filteredUser = response.user;
                delete filteredUser.__v;
                setFormData({
                    ...formData,
                    ...filteredUser,
                });
            }
        } catch (error) {
            message.error(error.response.data);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    const calculateAge = (value) => {
        const birthDate = new Date(value);
        const currentDate = new Date();
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        if (
            currentDate.getMonth() < birthDate.getMonth() ||
            (currentDate.getMonth() === birthDate.getMonth() &&
                currentDate.getDate() < birthDate.getDate())
        ) {
            age = age - 1;
        }
        return age;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'dateOfBirth') {
            const age = calculateAge(value);
            const dateWithoutTime = new Date(value).toISOString().split('T')[0];
            setFormData({
                ...formData,
                [name]: dateWithoutTime,
                age: age
            })
        }
        else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await userService.updateUser(formData);
            message.success(response);
            fetchDetails();
        } catch (error) {
            message.error(error.response.data);
        }
    }
    return (
        <div className="Profile">
            <div className="avatar-div">
                <img src={formData.avatarURL ? formData.avatarURL : Image} onError={(e) => { e.target.src = Image }} alt="profile" className="avatar" />
            </div>
            <form onSubmit={handleSubmit} className="form">

                <div className="field">
                    <label>
                        Bio
                    </label>
                    <textarea
                        name="bio"
                        rows={3}
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Enter your bio"
                    />
                </div>

                <div className="field">
                    <label>
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                    />
                </div>

                <div className="field">
                    <label>
                        Username
                    </label>
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        placeholder="Choose a username"
                    />
                </div>

                <div className="field">
                    <label>
                        Avatar URL
                    </label>
                    <input
                        type="text"
                        name="avatarURL"
                        value={formData.avatarURL}
                        onChange={handleChange}
                        placeholder="Enter avatar URL"
                    />
                </div>

                <div className="field">
                    <label>
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        max={maxDate}
                    />
                </div>

                <div className="field">
                    <label>
                        Age
                    </label>
                    <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        disabled
                    />
                </div>

                <div className="field">
                    <label>
                        Gender
                    </label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="field">
                    <label>
                        Pronouns
                    </label>
                    <input
                        type="text"
                        name="pronouns"
                        value={formData.pronouns}
                        onChange={handleChange}
                        placeholder="Enter your pronouns"
                    />
                </div>

                <div className="field">
                    <label>
                        Region
                    </label>
                    <input
                        type="text"
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        placeholder="Enter your region"
                    />
                </div>

                <div className="field">
                    <label>
                        Header URL
                    </label>
                    <input
                        type="text"
                        name="headerURL"
                        value={formData.headerURL}
                        onChange={handleChange}
                        placeholder="Enter header URL"
                    />
                </div>

                <div className="field">
                    <label>
                        Cell Number
                    </label>
                    <input
                        type="text"
                        name="cellNumber"
                        value={formData.cellNumber}
                        onChange={handleChange}
                        placeholder="Enter your cell number"
                    />
                </div>

                <div className="field">
                    <label>
                        Role
                    </label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="Gamer">Gamer</option>
                        <option value="SideKick">SideKick</option>
                    </select>
                </div>

                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default Profile;
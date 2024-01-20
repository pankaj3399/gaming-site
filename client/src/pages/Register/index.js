import React, { useState, useEffect } from "react";
import './index.css';
import { message } from "antd";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { isValidPassword } from "../../utils/validationUtils";
import { isAuthenticated } from "../../utils/authUtils";
import userService from "../../services/userService";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/');
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isValidPassword(formData.password)) {
                return message.error("Password must be at least 8 digits");
            }
            const response = await userService.registerUser(formData);
            if (response.user) {
                message.success('User registed successfully');
                navigate('/login');
            }
        } catch (error) {
            message.error(error.response.data);
        }
    }

    return (
        <div className="flex min-h-screen Register">
            <div className="w-full md:w-1/2 flex items-center section-1">
                <div className="w-full max-w-70 mx-auto px-4 py-15">
                    <div className="flex items-center justify-center">
                        <a href="#">
                            <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.44011 24.4129L15.506 28.1336C16.5057 28.595 17.2114 29.3693 17.5924 30.2575C18.5563 32.5067 17.239 34.8071 15.1709 35.6343C13.1025 36.4613 10.8981 35.9291 9.89582 33.5901L6.38556 25.3782C6.11354 24.7416 6.79687 24.1162 7.44011 24.4129" fill="#FFC233"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.92482 22.0046L16.2509 18.8643C19.018 17.8206 22.0408 19.7953 22 22.6646C21.9994 22.7021 21.9987 22.7395 21.9977 22.7773C21.938 25.5714 18.9993 27.4494 16.293 26.4609L7.93271 23.4078C7.26581 23.1644 7.26088 22.255 7.92482 22.0046" fill="#FFC233"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.45767 20.9168L15.6425 17.4468C18.3623 16.2936 19.0525 12.8325 16.9224 10.8326C16.8945 10.8063 16.8666 10.7803 16.8383 10.7543C14.7499 8.82013 11.2974 9.50112 10.1085 12.0487L6.43564 19.9194C6.14259 20.5471 6.8049 21.1935 7.45767 20.9168" fill="#FFC233"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.35143 19.5456L8.32719 11.4044C8.69612 10.395 8.62779 9.36556 8.24637 8.47734C7.28051 6.22905 4.66482 5.50331 2.5971 6.33186C0.529704 7.16073 -0.638522 9.04315 0.365771 11.3812L3.89903 19.5843C4.17302 20.2199 5.11424 20.1948 5.35143 19.5456" fill="#FFC233"></path>
                            </svg>
                        </a>
                    </div>
                    <div className="text-center my-5">
                        <h1 className="text-24 font-medium">Sign up to Lemon Squeezy</h1>
                    </div>
                    <div className="lg:flex lg:items-center mb-2">
                        <div className="mb-2 lg:w-1/2 lg:mb-0 lg:mr-2">
                            <a href="#" className="flex items-center justify-center pl-2 pr-2.25 py-1.5 font-medium border boreder-light-91 rounded hover:border-light-84">
                                <svg className="flex-shrink-0 w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M19.68 12.1818C19.68 11.6145 19.6291 11.0691 19.5345 10.5454H12V13.64H16.3055C16.12 14.64 15.5564 15.4873 14.7091 16.0545V18.0618H17.2945C18.8073 16.6691 19.68 14.6182 19.68 12.1818Z" fill="#4285F4"></path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.0007 20C14.1607 20 15.9716 19.2836 17.2952 18.0618L14.7097 16.0545C13.9934 16.5345 13.077 16.8182 12.0007 16.8182C9.91702 16.8182 8.15338 15.4109 7.52429 13.52H4.85156V15.5927C6.16793 18.2073 8.87338 20 12.0007 20Z" fill="#34A853"></path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.52364 13.52C7.36364 13.04 7.27273 12.5273 7.27273 12C7.27273 11.4727 7.36364 10.96 7.52364 10.48V8.40726H4.85091C4.30909 9.48726 4 10.7091 4 12C4 13.2909 4.30909 14.5127 4.85091 15.5927L7.52364 13.52Z" fill="#FBBC05"></path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.0007 7.18182C13.1752 7.18182 14.2297 7.58545 15.0588 8.37818L17.3534 6.08364C15.9679 4.79273 14.157 4 12.0007 4C8.87338 4 6.16793 5.79273 4.85156 8.40727L7.52429 10.48C8.15338 8.58909 9.91702 7.18182 12.0007 7.18182Z" fill="#EA4335"></path>
                                </svg>
                                <span>Sign up with Google</span>
                            </a>
                        </div>
                        <div className="lg:w-1/2">
                            <a href="#" className="flex items-center justify-center pl-2 pr-2.25 py-1.5 font-medium border boreder-light-91 rounded hover:border-light-84">
                                <svg className="flex-shrink-0 w-3 h-3 mr-1" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.15416 20C15.939 20 19.6496 14.2284 19.6496 9.22393C19.6496 8.94418 19.8544 8.69618 20.1178 8.58077C21.0208 8.18495 22.1921 7.09931 20.9825 5.27393C20.1811 5.69091 19.5225 5.91874 18.6401 6.19337C17.2436 4.66871 14.9069 4.59523 13.4213 6.02913C12.463 6.95383 12.0569 8.33223 12.3541 9.64765C9.3879 9.49541 6.62473 8.057 4.75194 5.6909C3.77317 7.42179 4.27278 9.63566 5.89358 10.7479C5.30632 10.7299 4.73221 10.567 4.21947 10.2739V10.3219C4.21947 12.1248 5.45752 13.6772 7.17839 14.0341C6.63568 14.1864 6.06596 14.2089 5.51303 14.0994C5.99657 15.6421 7.38071 16.6987 8.95914 16.7294C7.65242 17.7831 6.03893 18.3554 4.37796 18.3538C4.08434 18.3531 3.79144 18.3351 3.5 18.2991C5.18727 19.4106 7.1499 20 9.15416 19.997V20Z" fill="#00ACFF"></path>
                                </svg>
                                <span>Sign up with Twitter</span>
                            </a>
                        </div>
                    </div>
                    <div className="relative flex items-center justify-center h-5 mb-2">
                        <div className="absolute top-[50%] w-full border-t border-light-95"></div>
                        <div className="relative z-10 text-13 text-grey bg-white px-2">
                            Or
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <input
                                id="name"
                                type="text"
                                name="name"
                                className="form-input"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                className="form-input"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <button type="submit" className="btn btn-primary btn-large w-full">
                                <span className="mx-auto">Create account</span>
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-5">
                        <p className="max-w-51 mx-auto">
                            Signing up for a Lemon Squeezy account means you agree to the
                            <a href="#" target="_blank" className="text-wtf-majorelle text-wedges-gray-900"> Privacy Policy</a>,
                            <a href="#" target="_blank" className="text-wtf-majorelle text-wedges-gray-900"> Terms of Service </a>
                            and
                            <a href="#" target="_blank" className="text-wtf-majorelle text-wedges-gray-900"> Affiliate Terms</a>.
                        </p>
                        <p className="mt-3">
                            Already signed up? <Link to='/login' className="text-wtf-majorelle text-wedges-gray-900">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative hidden md:block md:w-1/2 bg-wedges-purple-600 relative overflow-hidden section-2">
                <svg className="absolute top-0 left-0" width="720" height="787" viewBox="0 0 720 787" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-392.905 -502.476L-391.004 -501.739C-391.004 -501.739 326.491 -197.031 501.442 -56.8491C676.392 83.3324 662.208 352.981 508.59 506.599C354.972 660.217 85.3233 674.401 -54.8582 499.451C-195.04 324.5 -499.748 -392.994 -499.748 -392.994L-500.485 -394.895C-516.584 -436.403 -527.156 -463.658 -494.411 -496.402C-461.667 -529.146 -434.412 -518.575 -392.905 -502.476Z" fill="#7047EB"></path>
                </svg>
                <svg className="absolute top-0 left-0" width="392" height="487" viewBox="0 0 392 487" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-336.818 -308.216L-335.645 -307.762C-335.645 -307.762 106.836 -120.048 214.706 -33.6373C322.576 52.7737 313.735 219.111 218.923 313.922C124.112 408.734 -42.2253 417.575 -128.636 309.705C-215.047 201.835 -402.761 -240.646 -402.761 -240.646L-403.215 -241.819C-413.132 -267.417 -419.644 -284.226 -399.434 -304.435C-379.225 -324.644 -362.416 -318.133 -336.818 -308.216Z" fill="#FCC5F3"></path>
                </svg>
                <svg className="absolute bottom-0 left-0" width="632" height="316" viewBox="0 0 632 316" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-351.418 900.397L-350.856 898.948C-350.856 898.948 -118.665 351.944 -11.8154 218.578C95.0341 85.2126 300.633 96.0786 417.79 213.235C534.947 330.392 545.813 535.991 412.447 642.841C279.081 749.69 -267.923 981.882 -267.923 981.882L-269.372 982.444C-301.016 994.711 -321.795 1002.77 -346.768 977.793C-371.74 952.821 -363.685 932.042 -351.418 900.397Z" fill="#2DCA72"></path>
                </svg>
                <svg className="absolute bottom-0 right-0" width="477" height="768" viewBox="0 0 477 768" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M334.917 239.653L336.582 240.299C336.582 240.299 965.06 507.074 1118.29 629.839C1271.52 752.603 1259.04 988.825 1124.43 1123.43C989.823 1258.04 753.6 1270.52 630.836 1117.29C508.071 964.063 241.296 335.585 241.296 335.585L240.65 333.92C226.556 297.562 217.301 273.688 245.993 244.996C274.685 216.304 298.559 225.559 334.917 239.653Z" fill="#00ACFF"></path>
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-45 px-5 py-4 bg-white shadow-menu border-b-4 border-wedges-pink-500">
                        <p className="text-16 min-h-32">
                            “It’s so good to have a system focused on digital products, and it took me no time at all to allow customers to buy fonts straight from my website. There’s so much potential. I can’t wait to see what’s&nbsp;next!”
                        </p>

                        <div className="relative flex items-center mt-3">
                            <img className="block w-6 h-6 rounded-full" src="https://d29lra7z8g0m3a.cloudfront.net/3cb61997-593e-47e4-9632-698c5f3396b1/img/testimonials/avatar-typeheist.jpg" alt="" />
                            <div className="ml-2">
                                <h4 className="text-16 font-medium">TypeHeist</h4>
                                <span className="text-wedges-gray-500">typeheist.co</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Register;
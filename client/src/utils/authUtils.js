import Cookies from 'js-cookie';

const isAuthenticated = () => {
    const token = Cookies.get('jwt-token');
    return !!token;
};

export { isAuthenticated };
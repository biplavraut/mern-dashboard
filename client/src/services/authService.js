import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;

// Register User
const register = async (userDate) => {
    const response = await axios.post(API_URL + '/management/admin/', userDate);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

// Login User
const login = async (userDate) => {
    const response = await axios.post(API_URL + '/auth/login', userDate);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}


// Logout
const logout = () => {
    localStorage.removeItem('user');
}
const authService = {
    register,
    login,
    logout
}

export default authService;
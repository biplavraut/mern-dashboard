import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;

// Register Admin
const addAdmin = async (data) => {
    const response = await axios.post(API_URL + '/management/admin/', data);   

    return response.data;
}

const postService = {
    addAdmin
}

export default postService;

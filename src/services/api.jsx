import axios from "axios";

// const baseURL = process.env.API_BASE_URL;

const instance = axios.create({
    baseURL: 'https://86x07hia9j.execute-api.us-east-1.amazonaws.com/Dev'
});

export default instance;

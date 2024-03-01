import axios from "axios";


// const baseURL = process.env.API_BASE_URL;

const instance = axios.create({
    baseURL: 'https://86x07hia9j.execute-api.us-east-1.amazonaws.com/Dev'
});

const instanceAuth = axios.create({
    baseURL: 'http://localhost:8000/api/v2/customer'
})

const instanceEvent = axios.create({
    baseURL: 'http://localhost:8000/api/v2/family/calendar'
})

instanceEvent.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export { instance, instanceAuth, instanceEvent };

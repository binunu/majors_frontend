import axios from 'axios';

const axiosURL = axios.create({
  baseURL: 'http://localhost:8080'
});

export default axiosURL;
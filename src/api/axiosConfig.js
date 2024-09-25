import axios from 'axios';

export default axios.create({
    baseURL: 'https://backend12345.netlify.app', // Change this to your deployed URL
    timeout: 50000,
    headers: { "Content-Type": "application/json" }
});

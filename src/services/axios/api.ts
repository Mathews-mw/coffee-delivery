import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3838"
});

export { api };

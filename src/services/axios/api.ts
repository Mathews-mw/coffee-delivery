import axios from 'axios';

const api = axios.create({
	// baseURL: 'http://localhost:3838',
	baseURL: `${import.meta.env.VITE_APP_BASE_API_URL}`,
});

api.interceptors.request.use((config) => {
	const TOKEN = localStorage.getItem(`${import.meta.env.VITE_APP_TOKEN_KEY}`);
	if (config.headers && TOKEN) {
		config.headers.Authorization = `Bearer ${TOKEN}`;
	}

	return config;
});

export { api };

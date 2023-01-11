import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../../contexts/AuthContext';

interface AxiosErrorResponse {
	error?: string;
}

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsQueue = [];

export function setupAPIClient() {
	const api = axios.create({
		baseURL: 'http://localhost:3838',
		headers: {
			Authorization: `Bearer ${cookies[import.meta.env.VITE_APP_TOKEN_KEY]}`,
		},
	});

	api.interceptors.response.use(
		(response) => {
			return response;
		},
		(error: AxiosError<AxiosErrorResponse>) => {
			if (error.response.status === 401) {
				if (error.response.data.error === 'Token Expired') {
					cookies = parseCookies();
					const storegedRefreshToken = cookies[import.meta.env.VITE_APP_REFRESH_TOKEN_KEY];

					const originalConfig = error.config;

					if (!isRefreshing) {
						isRefreshing = true;

						api
							.post('authenticate/refresh-token', {
								token: storegedRefreshToken,
							})
							.then((response) => {
								const { token, refresh_token } = response.data;

								setCookie(undefined, import.meta.env.VITE_APP_TOKEN_KEY, token, {
									maxAge: 60 * 60 * 24 * 30, // 30 days
									path: '/',
								});
								setCookie(undefined, import.meta.env.VITE_APP_REFRESH_TOKEN_KEY, refresh_token, {
									maxAge: 60 * 60 * 24 * 30, // 30 days
									path: '/',
								});

								api.defaults.headers['Authorization'] = `Bearer ${token}`;

								failedRequestsQueue.forEach((request) => request.onSucess(token));
								failedRequestsQueue = [];
							})
							.catch((err) => {
								failedRequestsQueue.forEach((request) => request.onFailure(err));
								failedRequestsQueue = [];
							})
							.finally(() => {
								isRefreshing = false;
							});
					}
					return new Promise((resolve, reject) => {
						failedRequestsQueue.push({
							onSucess: (token: string) => {
								originalConfig.headers['Authorization'] = `Bearer ${token}`;

								resolve(api(originalConfig));
							},
							onFailure: (err: AxiosError) => {
								reject(err);
							},
						});
					});
				}
			} else {
				signOut();
			}
			return Promise.reject(error);
		}
	);

	return api;
}

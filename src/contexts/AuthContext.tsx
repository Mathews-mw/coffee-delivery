import CryptoJS from 'crypto-js';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import React, { createContext, useEffect, useState } from 'react';

import { api } from '../services/apiClient';
import { ShowErrorRequest } from '../utils/ShowErrorRequest';

interface AuthContextData {
	user?: User;
	isSigned: boolean;
	isAdmin: boolean;
	loading: boolean;
	signIn: (email: string, password: string) => void;
	signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut(broadcast: boolean = true) {
	destroyCookie(undefined, import.meta.env.VITE_APP_USER_KEY);
	destroyCookie(undefined, import.meta.env.VITE_APP_TOKEN_KEY);
	destroyCookie(undefined, import.meta.env.VITE_APP_REFRESH_TOKEN_KEY);

	sessionStorage.clear();

	if (broadcast) {
		authChannel.postMessage('signOut');
	}
}

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User>();
	const [loading, setLoading] = useState(false);
	console.log('AuthContext: ', user);

	const isSigned = !!user;
	const isAdmin = user?.isAdmin;

	useEffect(() => {
		authChannel = new BroadcastChannel('auth');

		authChannel.onmessage = (message) => {
			switch (message.data) {
				case 'signOut':
					signOut(false);
					break;
				default:
					break;
			}
		};
	});

	useEffect(() => {
		const cookies = parseCookies();
		const storegedToken = cookies[import.meta.env.VITE_APP_TOKEN_KEY];
		const storegedUser = cookies[import.meta.env.VITE_APP_USER_KEY];

		if (storegedToken && storegedUser) {
			let decrypted = CryptoJS.AES.decrypt(storegedUser, import.meta.env.VITE_APP_SECRET_KEY);
			let plainText = decrypted.toString(CryptoJS.enc.Utf8);
			var parseUserObjct = JSON.parse(plainText);

			api
				.get(`/users/${parseUserObjct.cpf}`)
				.then((response) => {
					setUser(response.data);
				})
				.catch((error) => {
					signOut();
				});
		}
	}, []);

	async function signIn(email: string, password: string) {
		try {
			setLoading(true);
			const response = await api.post('/authenticate/login', {
				email,
				password,
			});

			const { user, token, refresh_token } = await response.data;

			setCookie(undefined, import.meta.env.VITE_APP_TOKEN_KEY, token, {
				maxAge: 60 * 60 * 24 * 30, // 30 days
				path: '/',
			});
			setCookie(undefined, import.meta.env.VITE_APP_REFRESH_TOKEN_KEY, refresh_token, {
				maxAge: 60 * 60 * 24 * 30, // 30 days
				path: '/',
			});

			const userObjToString = JSON.stringify(user);
			const encryptedUser = CryptoJS.AES.encrypt(userObjToString, import.meta.env.VITE_APP_SECRET_KEY);
			setCookie(undefined, import.meta.env.VITE_APP_USER_KEY, encryptedUser.toString(), {
				maxAge: 60 * 60 * 24 * 30, // 30 days
				path: '/',
			});

			setUser(user);

			api.defaults.headers['Authorization'] = `Bearer ${token}`;

			setLoading(false);
		} catch (error) {
			setLoading(false);
			ShowErrorRequest(error);
		}
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				isSigned,
				isAdmin,
				signIn,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

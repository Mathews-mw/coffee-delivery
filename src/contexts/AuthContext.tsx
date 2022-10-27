import React, { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { api } from '../services/axios/api';

interface User {
	id: number;
	name: string;
	email: string;
	phone_number: string;
	cpf: string;
	password: string;
	avatar: string;
	isAdmin: boolean;
}

interface AuthContextType {
	user?: User;
	isSigned: boolean;
	isAdmin: boolean;
	loading: boolean;
	signIn: (email: string, password: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
	signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User>();
	const [loading, setLoading] = useState(true);

	console.log(!!user?.isAdmin);

	useEffect(() => {
		async function initialLoading() {
			setLoading(true);
			const userStringfy = await localStorage.getItem(`${import.meta.env.VITE_APP_USER_KEY}`);
			if (userStringfy) {
				setUser(JSON.parse(userStringfy));
			}
			setLoading(false);
		}
		initialLoading();
	}, []);

	async function signIn(email: string, password: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
		setLoading(true);
		const { data } = await api.post('/authenticate/login', { email, password });
		setLoading(false);

		setUser(data.user);

		localStorage.setItem(`${import.meta.env.VITE_APP_USER_KEY}`, JSON.stringify(data.user));
		localStorage.setItem(`${import.meta.env.VITE_APP_TOKEN_KEY}`, data.token);
	}

	async function signOut() {
		setUser(undefined);
		localStorage.clear();
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				isSigned: !!user,
				isAdmin: !!user?.isAdmin,
				signIn,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

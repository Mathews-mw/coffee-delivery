import React, { createContext, useEffect, useState } from 'react';
import { api } from '../services/axios/api';

interface User {
	email: string;
	password: string;
}

interface AuthContextType {
	user?: User;
	isSigned: boolean;
	loading: boolean;
	signIn: (email: string, password: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
	signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User>();
	const [loading, setLoading] = useState(true);
	console.log(!!user);
	useEffect(() => {
		async function initialLoading() {
			setLoading(true);
			const userStringfy = await localStorage.getItem('Coffee-Delivery:USER');
			if (userStringfy) {
				setUser(JSON.parse(userStringfy));
			}
			setLoading(false);
		}
		initialLoading();
	}, []);

	async function signIn(email: string, password: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
		console.log(email, password);
		setLoading(true);
		const { data } = await api.post('/authenticate/login', { email, password });
		setLoading(false);
		setUser(data.user);
		localStorage.setItem('Coffee-Delivery:USER', JSON.stringify(data.user));
		localStorage.setItem('Coffee-Delivery:TOKEN', data.token);
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
				signIn,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

import { Navigate, Route, Routes, redirect, useNavigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/UserRegister';
import { AuthLayout } from '../layouts/AuthLayout';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Home } from '../pages/Home';
import { Checkout } from '../pages/Checkout';
import { Sucess } from '../pages/Sucess';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AuthRoute } from './Auth.routes';
import { UserRoute } from './User.routes';

export function Router() {
	const { isSigned, loading } = useContext(AuthContext);

	if (loading) {
		return (
			<div>
				<h2>Carregando, por favor aguarde...</h2>
			</div>
		);
	}

	return (
		<Routes>
			{isSigned && <Route path='*' element={<UserRoute />} />}
			{!isSigned && <Route path='*' element={<AuthRoute />} />}
		</Routes>
	);
}

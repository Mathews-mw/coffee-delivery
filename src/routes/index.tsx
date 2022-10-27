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
import { AuthRoutes } from './Auth.routes';
import { UserRoutes } from './User.routes';
import { AdminRoutes } from './Admin.routes';

export function Router() {
	const { isSigned, isAdmin, loading } = useContext(AuthContext);

	if (loading) {
		return (
			<div>
				<h2>Carregando, por favor aguarde...</h2>
			</div>
		);
	}

	return (
		<Routes>
			{isSigned && isAdmin && <Route path='*' element={<AdminRoutes />} />}
			{isSigned && <Route path='*' element={<UserRoutes />} />}
			{!isSigned && <Route path='*' element={<AuthRoutes />} />}
		</Routes>
	);
}
